<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :minHeight="350"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { postIssue, putIssue } from '/@/api/demo/Issue';
  import { FormSchema } from '/@/components/Table';
  import { events } from '/@/views/demo/InformationManagement/HomeDecorationExpo/HomeDecorationExpo.data';
  import mitt from '/@/utils/mitt';
  const emitter = mitt(events);

  const formSchema: FormSchema[] = [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      field: 'end_time',
      label: '评分截止时间',
      required: true,
      component: 'DatePicker',
      componentProps: {
        showTime: true,
      },
    },
  ];
  export default defineComponent({
    name: 'IssueModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        const record = data.record;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '设置评分截止时间'));

      async function handleSubmit() {
        try {
          const values = await validate();
          values.end_time = values.end_time.format('YYYY-MM-DD HH:mm:ss');

          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await putIssue(values);
            emitter.emit('reloadEndTime', 1);
          } else {
            delete values.id;
            values.from = '管理后台';
            await postIssue(values);
          }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
