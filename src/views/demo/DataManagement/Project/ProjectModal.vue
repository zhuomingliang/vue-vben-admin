<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Form class="p-4" :model="formData" ref="formRef" :colon="false">
      <FormItem name="id" label="Id" style="display: none">
        <Input size="middle" v-model:value="formData.id" />
      </FormItem>
      <FormItem
        name="area_id"
        v-bind="formItemLayout"
        label="县（市、区）"
        :rules="[{ required: true, message: '县（市、区）' }]"
      >
        <Select
          size="middle"
          v-model:value="formData.area_id"
          placeholder="请选择县（市、区）"
          :options="areas"
        />
      </FormItem>
      <FormItem
        name="order"
        v-bind="formItemLayout"
        label="排序"
        :rules="[{ required: true, message: '请输入排序' }]"
      >
        <InputNumber size="middle" v-model:value="formData.order" placeholder="请输入排序" />
      </FormItem>
      <FormItem
        v-for="(project, index) in formData.projects"
        :key="index"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? '项目' : ''"
        :name="['projects', index, 'project']"
        :rules="[{ required: true, message: '请输入项目名称' }]"
      >
        <Input
          size="middle"
          v-model:value="project.project"
          placeholder="请输入项目名称"
          style="width: 88%; margin-right: 8px"
        />
        <MinusCircleOutlined @click="removeProject(index)" v-if="formData.projects.length > 1" />
      </FormItem>
      <FormItem v-bind="formItemLayoutWithOutLabel" v-if="!isUpdate">
        <Button type="dashed" block @click="addProject" style="width: 88%; margin-right: 8px">
          <PlusOutlined />
          新增
        </Button>
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Select, Input, InputNumber, Button } from 'ant-design-vue';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

  import { postProject, putProject } from '/@/api/demo/project';
  import { getAllAreaList } from '/@/api/demo/area';

  const FormItem = Form.Item;

  export default defineComponent({
    name: 'DiningArrangementsModal',
    components: {
      BasicModal,
      Form,
      FormItem,
      Select,
      Input,
      InputNumber,
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
        area_id: null,
        order: 1,
        projects: [
          {
            project: '',
          },
        ],
      };
      const formData = reactive({ ...formInit });

      const addProject = () => {
        if (formData.projects.length < 3)
          formData.projects.push({
            project: '',
          });
      };

      const removeProject = (index: number) => {
        if (formData.projects.length > 0) {
          formData.projects.splice(index, 1);
        }
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        const form = unref(formRef);
        form.resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        const record = data.record;
        formData.projects = [...formInit.projects];
        if (unref(isUpdate)) {
          formData.id = record.id;
          formData.area_id = record.area_id;
          formData.order = record.area_order;
          formData.projects = [{ project: record.project }];
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const form = unref(formRef);
          const values = await form.validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await putProject(values);
          } else {
            //delete values.id;
            await postProject(values);
          }

          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 18, offset: 6 },
        },
      };

      const areas = ref([]);

      async function fetch() {
        const data = await getAllAreaList();
        const r = [] as any;
        data.map((area: any) => {
          r.push({ label: area.name, value: area.id });
        });
        areas.value = r;
      }

      onMounted(() => {
        fetch();
      });

      return {
        formRef,
        formData,
        formItemLayout,
        formItemLayoutWithOutLabel,
        areas,
        registerModal,
        addProject,
        removeProject,
        getTitle,
        handleSubmit,
        isUpdate,
      };
    },
  });
</script>
