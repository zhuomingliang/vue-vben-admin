<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { ChangePassword } from '/@/api/demo/system';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { PageEnum } from '/@/enums/pageEnum';

  import { formSchema } from './pwd.data';
  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;

          ChangePassword(passwordOld, passwordNew)
            .then(() => {
              const { createMessage } = useMessage();
              createMessage.success('修改成功');
              router.push(PageEnum.BASE_LOGIN);
            })
            .catch(() => {});
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
