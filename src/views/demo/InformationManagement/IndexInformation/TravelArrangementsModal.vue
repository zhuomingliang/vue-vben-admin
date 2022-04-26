<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Form
      class="p-4"
      :model="formData"
      ref="formRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :colon="false"
    >
      <FormItem name="id" label="Id" style="display: none">
        <Input size="middle" v-model:value="formData.id" />
      </FormItem>
      <FormItem name="date" label="日期" :rules="[{ required: true }]">
        <Input size="middle" v-model:value="formData.date" placeholder="请选择日期" />
      </FormItem>

      <Space
        v-for="(storey, index) in formData.scheduling"
        :key="index"
        style="display: flex"
        align="baseline"
      >
        <FormItem :class="storey.class" :name="['scheduling', index, 'time']" :label="storey.label">
          <Input size="middle" v-model:value="storey.time" placeholder="时间" />
        </FormItem>
        <FormItem :class="storey.class" :name="['scheduling', index, 'arrangements']">
          <Input size="middle" v-model:value="storey.arrangements" placeholder="安排" />
        </FormItem>
        <MinusCircleOutlined @click="removeSchedule(index)" />
      </Space>
      <FormItem>
        <Button type="dashed" block @click="addSchedule">
          <PlusOutlined />
          新增
        </Button>
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

  const FormItem = Form.Item;

  export default defineComponent({
    name: 'TravelArrangementsModal',
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
        date: '',
        scheduling: [
          {
            label: '行程',
            time: '',
            arrangements: '',
            class: '',
          },
        ],
      };
      const formData = reactive({ ...formInit });

      const addSchedule = () => {
        formData.scheduling.push({
          label: '　',
          time: '',
          arrangements: '',
          class: 'enter-x',
        });
      };

      const removeSchedule = (index: number) => {
        if (index > 0) {
          formData.scheduling.splice(index, 1);
        }
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        const form = unref(formRef);
        form.resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        const record = data.record;
        formData.scheduling = [...formInit.scheduling];

        if (unref(isUpdate)) {
          const scheduling = JSON.parse(record.scheduling);
          if (Array.isArray(scheduling)) {
            formData.scheduling = scheduling.map(function (storey: any, index: any) {
              if (index == 0) {
                storey.label = '行程';
              } else {
                storey.label = '　';
              }
              return storey;
            });
          }

          formData.id = record.id;
          formData.date = record.date;
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
        addSchedule,
        removeSchedule,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
