<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="550px"
  >
    <BasicForm @register="registerForm">
      <template #remoteSearch="{ model, field }">
        <ApiSelect
          :api="getSearch"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          labelField="title"
          valueField="id"
          :params="searchParams"
          @search="onSearch"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './Carsoul.data';
  import { postCarsoul, putCarsoul } from '/@/api/demo/Carsoul';
  import { getSearch } from '/@/api/demo/Content';
  import { useDebounceFn } from '@vueuse/core';

  export default defineComponent({
    name: 'CarsoulModal',
    components: { BasicModal, BasicForm, ApiSelect },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const keyword = ref('');
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

        if (unref(isUpdate)) {
          const record = data.record;
          keyword.value = record.link;
          if (typeof record.image === 'string') {
            const image = record.image;
            if (image !== '') {
              record.image = image.split(',');
            } else {
              record.image = [];
            }
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
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await putCarsoul(values);
          } else {
            delete values.id;
            await postCarsoul(values);
          }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }
      return {
        registerModal,
        registerForm,
        getTitle,
        getSearch,
        searchParams,
        onSearch: useDebounceFn(onSearch, 300),
        handleSubmit,
      };
    },
  });
</script>
