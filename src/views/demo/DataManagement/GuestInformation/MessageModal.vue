<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <div>{{msg || '--'}}</div>
  </BasicModal>
</template>

<script>
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    name: 'MessageModal',
    props: {
      msg: String
    },
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      console.log(props)
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
      });
      const getTitle = '提示';

      function handleSubmit() {
        closeModal();
      }

      return {
        registerModal,
        getTitle,
        handleSubmit
      };
    }
  })
</script>

<style scoped>

</style>
