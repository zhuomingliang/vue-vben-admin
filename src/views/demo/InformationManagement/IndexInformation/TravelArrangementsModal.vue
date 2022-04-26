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
        <DatePicker size="middle" v-model:value="formData.date" placeholder="请选择日期" />
      </FormItem>

      <Space
        v-for="(schedule, index) in formData.scheduling"
        :key="index"
        style="display: flex"
        align="baseline"
      >
        <FormItem
          :class="schedule.class"
          :name="['scheduling', index, 'time']"
          :label="schedule.label"
        >
          <TimePicker
            size="middle"
            v-model:value="schedule.time"
            placeholder="时间"
            format="HH:mm"
          />
        </FormItem>
        <FormItem :class="schedule.class" :name="['scheduling', index, 'arrangements']">
          <Input size="middle" v-model:value="schedule.arrangements" placeholder="安排" />
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
  import dayjs from 'dayjs';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Input, DatePicker, TimePicker, Button, Space } from 'ant-design-vue';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

  import { postTravelArrangements, putTravelArrangements } from '/@/api/demo/TravelArrangements';

  const FormItem = Form.Item;

  export default defineComponent({
    name: 'TravelArrangementsModal',
    components: {
      BasicModal,
      Form,
      Input,
      Space,
      FormItem,
      DatePicker,
      TimePicker,
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
        date: dayjs(),
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
            formData.scheduling = scheduling.map(function (scheduling: any, index: any) {
              if (index == 0) {
                scheduling.label = '行程';
              } else {
                scheduling.label = '　';
              }
              scheduling.time = dayjs(scheduling.time, 'HH:mm');

              return scheduling;
            });
          }

          formData.id = record.id;
          formData.date = dayjs(record.date, 'YYYY-MM-DD');
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const form = unref(formRef);
          const values = await form.validate();

          values.scheduling.forEach((row: any) => {
            if (typeof row.time == 'object') row.time = row.time.format('HH:mm');
          });

          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await putTravelArrangements(values);
          } else {
            //delete values.id;
            await postTravelArrangements(values);
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
