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
  import { formSchema } from './Content.data';
  import { postContent, putContent } from '/@/api/demo/Content';
  import { useComponentRegister } from '/@/components/Form';
  import { Tinymce } from '/@/components/Tinymce';

  useComponentRegister('Tinymce', Tinymce);
  export default defineComponent({
    name: 'ContentModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setFieldsValue({
          content: '',
        });
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        const record = { ...data.record };
        if (unref(isUpdate)) {
          if (typeof record.attachments === 'string') {
            const attachments = record.attachments.replace(/^\{(.*)\}$/, '$1');
            if (attachments !== '') {
              record.attachments = attachments.split(',');
            } else {
              record.attachments = [];
            }
          }
          setFieldsValue({
            ...record,
          });
        } else {
          updateSchema({
            field: 'third_menu_id',
            show: false,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();

          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await putContent(values);
          } else {
            delete values.id;
            await postContent(values);
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
