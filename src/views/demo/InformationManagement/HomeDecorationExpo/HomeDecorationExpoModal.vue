<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="55%"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './HomeDecorationExpo.data';
  import { postHomeDecorationExpo, putHomeDecorationExpo } from '/@/api/demo/HomeDecorationExpo';
  import dayjs from 'dayjs';
  import { useComponentRegister } from '/@/components/Form';
  import { Tinymce } from '/@/components/Tinymce';

  useComponentRegister('Tinymce', Tinymce);
  export default defineComponent({
    name: 'HomeDecorationExpoModal',
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

        const record = { ...data.record };
        if (unref(isUpdate)) {
          if (typeof record.daterange === 'string') {
            record.daterange = record.daterange.replace(/^\[(.*)\)$/, '$1').split(',');
            record.daterange[0] = dayjs(record.daterange[0]);
            record.daterange[1] = dayjs(record.daterange[1]).subtract(1, 'day');
          }

          setFieldsValue({
            ...record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          const data = { ...values };
          data.daterange = [];
          data.daterange[0] = values.daterange[0].format('YYYY-MM-DD');
          data.daterange[1] = values.daterange[1].format('YYYY-MM-DD');
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await putHomeDecorationExpo(data);
          } else {
            delete values.id;
            await postHomeDecorationExpo(data);
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
