<template>
  <div>
    <BasicTable @register="registerTable" :pagination="false">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        <a-button type="primary" @click="handleImport"> 导入 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectModal @register="registerCreateProjectModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getProjectScore, deleteProject } from '/@/api/demo/project';

  import { useModal } from '/@/components/Modal';
  import ProjectModal from './ProjectModal.vue';

  import { columns, searchFormSchema } from './project.data';

  export default defineComponent({
    name: 'Project',
    components: { BasicTable, ProjectModal, TableAction },
    setup() {
      const [registerCreateProjectModal, { openModal: openModalCreateProjectModal }] = useModal();
      const [registerImportProjectModal, { openModal: openModalImportProjectModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '项目列表',
        api: getProjectScore,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openModalCreateProjectModal(true, {
          isUpdate: false,
        });
      }

      function handleImport() {
        openModalImportProjectModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModalCreateProjectModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteProject(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerCreateProjectModal,
        registerImportProjectModal,
        handleCreate,
        handleImport,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
