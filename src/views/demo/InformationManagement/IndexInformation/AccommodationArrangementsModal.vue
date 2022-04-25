<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Form
      class="p-4 accommodation_arrangements_modal"
      :model="formData"
      ref="formRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <FormItem name="hotel" label="酒店名">
        <Input size="middle" v-model:value="formData.hotel" placeholder="请输入酒店名" />
      </FormItem>

      <Space
        v-for="(floor, index) in formData.floors"
        :key="index"
        style="display: flex"
        align="baseline"
      >
        <FormItem
          :class="floor.class"
          :name="['floors', index, 'first_number']"
          :label="floor.label"
        >
          <Input size="middle" v-model:value="floor.first_number" placeholder="首位数字" />
        </FormItem>
        <FormItem :class="floor.class" :name="['floors', index, 'floor_number']">
          <Input size="middle" v-model:value="floor.floor_number" placeholder="对应楼层" />
        </FormItem>
        <MinusCircleOutlined @click="removeFloor(floor)" />
      </Space>
      <FormItem>
        <Button type="dashed" block @click="addFloor">
          <PlusOutlined />
          新增
        </Button>
      </FormItem>
      <FormItem name="contacts" label="联系人">
        <Input size="middle" v-model:value="formData.contacts" placeholder="请输入联系人" />
      </FormItem>
      <FormItem name="contact_telephone" label="联系人电话">
        <Input
          size="middle"
          v-model:value="formData.contact_telephone"
          placeholder="请输入联系人电话"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Input, Button, Space } from 'ant-design-vue';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

  import {
    postAccommodationArrangements,
    putAccommodationArrangements,
  } from '/@/api/demo/AccommodationArrangements';

  interface Floor {
    label: string;
    first_number: string;
    floor_number: string;
    class: string;
  }
  const FormItem = Form.Item;

  export default defineComponent({
    name: 'DiningArrangementsModal',
    components: {
      BasicModal,
      Form,
      Space,
      FormItem,
      Input,
      Button,
      MinusCircleOutlined,
      PlusOutlined,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const formRef = ref();
      const formData = reactive({
        hotel: '',
        floors: [
          {
            label: '楼层信息',
            first_number: '',
            floor_number: '',
            class: '',
          },
        ],
        contacts: '',
        contact_telephone: '',
      });

      const removeFloor = (item: Floor) => {
        let index = formData.floors.indexOf(item);
        if (index > 0) {
          formData.floors.splice(index, 1);
        }
      };

      const addFloor = () => {
        formData.floors.push({
          label: '　',
          first_number: '',
          floor_number: '',
          class: 'enter-x',
        });
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        const form = unref(formRef);
        form.resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        const record = data.record;

        if (unref(isUpdate)) {
          form.setFieldsValue({
            ...record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const form = unref(formRef);
          const values = await form.validate();
          console.log(values);
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await putAccommodationArrangements(values);
          } else {
            //delete values.id;
            await postAccommodationArrangements(values);
          }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        labelCol: { style: { width: '100px' } },
        wrapperCol: { span: 24 },
        formRef,
        formData,
        registerModal,
        addFloor,
        removeFloor,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
<style local>
  .accommodation_arrangements_modal
    > .ant-space:nth-child(n + 3)
    .ant-form-item-label
    > label::after {
    content: '';
  }
</style>
