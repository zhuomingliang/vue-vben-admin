<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Form
      class="p-4 accommodation_arrangements_modal"
      :model="formData"
      ref="formRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <FormItem name="id" label="Id" style="display: none">
        <Input size="middle" v-model:value="formData.id" />
      </FormItem>
      <FormItem name="hotel" label="酒店名" :rules="[{ required: true, message: '请输入酒店名' }]">
        <Input size="middle" v-model:value="formData.hotel" placeholder="请输入酒店名" />
      </FormItem>

      <Space
        v-for="(storey, index) in formData.storey_info"
        :key="index"
        style="display: flex"
        align="baseline"
      >
        <FormItem
          :class="storey.class"
          :name="['storey_info', index, 'first_number']"
          :label="storey.label"
        >
          <Input size="middle" v-model:value="storey.first_number" placeholder="首位数字" />
        </FormItem>
        <FormItem :class="storey.class" :name="['storey_info', index, 'storey_number']">
          <Input size="middle" v-model:value="storey.storey_number" placeholder="对应楼层" />
        </FormItem>
        <MinusCircleOutlined @click="removeStorey(storey)" />
      </Space>
      <FormItem>
        <Button type="dashed" block @click="addStorey">
          <PlusOutlined />
          新增
        </Button>
      </FormItem>
      <FormItem
        name="contacts"
        label="联系人"
        :rules="[{ required: true, message: '请输入联系人' }]"
      >
        <Input size="middle" v-model:value="formData.contacts" placeholder="请输入联系人" />
      </FormItem>
      <FormItem
        name="contact_telephone"
        label="联系人电话"
        :rules="[{ required: true, message: '请输入联系人电话' }]"
      >
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

  interface Storey {
    label: string;
    first_number: string;
    storey_number: string;
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
      const formInit = {
        id: 0,
        hotel: '',
        storey_info: [
          {
            label: '楼层信息',
            first_number: '',
            storey_number: '',
            class: '',
          },
        ],
        contacts: '',
        contact_telephone: '',
      };
      const formData = reactive({ ...formInit });

      const removeStorey = (item: Storey) => {
        let index = formData.storey_info.indexOf(item);
        if (index > 0) {
          formData.storey_info.splice(index, 1);
        }
      };

      const addStorey = () => {
        formData.storey_info.push({
          label: '　',
          first_number: '',
          storey_number: '',
          class: 'enter-x',
        });
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        const form = unref(formRef);
        form.resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        const record = data.record;
        formData.storey_info = [...formInit.storey_info];

        if (unref(isUpdate)) {
          const storey_info = JSON.parse(record.storey_info);
          formData.storey_info = storey_info.map(function (storey: any, index: any) {
            if (index == 0) {
              storey.label = '楼层信息';
            } else {
              storey.label = '　';
            }
            return storey;
          });

          formData.id = record.id;
          formData.hotel = record.hotel;
          formData.contacts = record.contacts;
          formData.contact_telephone = record.contact_telephone;
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
        addStorey,
        removeStorey,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
<style>
  .accommodation_arrangements_modal
    > .ant-space:nth-of-type(n + 3)
    .ant-form-item-label
    > label::after {
    content: '';
  }
</style>
