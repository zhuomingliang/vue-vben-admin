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
      <FormItem name="file" label="Excel 文件" :wrapperCol="wrapperCol">
        <Upload
          :maxCount="1"
          size="middle"
          :file-list="formData.fileList"
          :before-upload="beforeUpload"
          accept=".xlsx,.xls"
        >
          <Button>
            <UploadOutlined />
            选择文件
          </Button>
          <a
            href="/muban/GuestInformation.xlsx"
            style="margin-top: 10rem; color: red"
            download="用户模板.xlsx"
          >
            模板下载
          </a>
        </Upload>
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { postImportGuest } from '/@/api/demo/guest';
  import { Form, Button, Upload } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  const FormItem = Form.Item;

  export default defineComponent({
    name: 'GuestModal',
    components: { Form, Button, Upload, FormItem, UploadOutlined, BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const formRef = ref();

      const formData = reactive<{ fileList: UploadProps['fileList'] }>({ fileList: [] });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        const form = unref(formRef);
        form.resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        const record = data.record;

        if (unref(isUpdate)) {
          form.setFieldsValue({
            ...record,
          });
        }
      });

      const getTitle = '导入';

      const beforeUpload: UploadProps['beforeUpload'] = (file: any) => {
        formData.fileList = [file];
        return false;
      };

      async function handleSubmit() {
        try {
          console.log(formData.fileList);
          setModalProps({ confirmLoading: true });
          let res = await postImportGuest({ file: formData.fileList[0] });
          closeModal();
          emit('success', { isUpdate: false, message: res.data.message });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        labelCol: { style: { width: '100px' } },
        wrapperCol: { span: 12 },
        registerModal,
        formRef,
        formData,
        beforeUpload,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
