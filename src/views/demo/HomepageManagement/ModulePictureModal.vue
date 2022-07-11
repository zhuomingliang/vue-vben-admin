<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Image src="/image/module.png" width="100%" height="100%" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    name: 'ModulePictureModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup() {
      const isUpdate = ref(true);

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
