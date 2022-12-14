<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <div>{{ msg || '--' }}</div>
  </BasicModal>
</template>

<script>
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    name: 'MessageModal',
    components: { BasicModal },
    props: {
      msg: String,
    },
    emits: ['success', 'register'],
    setup() {
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });
      const getTitle = '提示';

      function handleSubmit() {
        closeModal();
      }

      return {
        registerModal,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
