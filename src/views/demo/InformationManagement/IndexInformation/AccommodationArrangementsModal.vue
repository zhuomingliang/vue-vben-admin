<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Form
      class="p-4 enter-x accommodation_arrangements_modal"
      :model="formData"
      ref="formRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <FormItem name="account" class="enter-x" label="酒店名">
        <Input size="middle" v-model:value="formData.hotel" placeholder="请输入酒店名" />
      </FormItem>

      <Space
        v-for="(floor, index) in dynamicFloor.floors"
        :key="index"
        style="display: flex"
        align="baseline"
      >
        <FormItem :name="`${index}-floor.first_number`" class="enter-x" :label="floor.label">
          <Input size="middle" v-model:value="formData.floors" placeholder="首位数字" />
        </FormItem>
        <FormItem :name="`${index}-floor.floor_number`" class="enter-x">
          <Input size="middle" v-model:value="formData.floors" placeholder="对应楼层" />
        </FormItem>
        <MinusCircleOutlined @click="removeFloor(floor)" />
      </Space>
      <FormItem>
        <Button type="dashed" block @click="addFloor">
          <PlusOutlined />
          新增
        </Button>
      </FormItem>
      <FormItem name="mobile" class="enter-x" label="联系人">
        <Input size="middle" v-model:value="formData.contacts" placeholder="请输入联系人方式" />
      </FormItem>

      <!-- <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem> -->
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
    disabled: boolean;
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
        floors: '',
        contacts: '',
        contacts_telephone: '',
      });

      const dynamicFloor = reactive<{ floors: Floor[] }>({
        floors: [
          {
            label: '楼层信息',
            first_number: '',
            floor_number: '',
            disabled: true,
          },
        ],
      });

      const removeFloor = (item: Floor) => {
        let index = dynamicFloor.floors.indexOf(item);
        if (index > 0) {
          dynamicFloor.floors.splice(index, 1);
        }
      };
      const addFloor = () => {
        dynamicFloor.floors.push({
          label: '　',
          first_number: '',
          floor_number: '',
          disabled: false,
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
          // const values = await validate();
          const values = [];

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
        dynamicFloor,
        registerModal,
        addFloor,
        removeFloor,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
<style>
  .accommodation_arrangements_modal
    > .ant-space:nth-child(n + 3)
    .ant-form-item-label
    > label::after {
    content: '';
  }
</style>
