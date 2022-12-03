<template>
  <div>
    <BasicTable @register="registerTable" :pagination="false" class="project">
      <template #toolbar>
        <span style="width: 60%; text-align: center; color: lightcoral">{{ end_time }}</span>
        <a-button type="primary" @click="handleEditIssue"> 设置项目评分截止时间 </a-button>
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
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <IssueModal @register="registerEditIssueModal" />
    <ProjectModal @register="registerCreateProjectModal" @success="handleSuccess" />
    <ImportProjectModal @register="registerImportProjectModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { ref, defineComponent, onMounted } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getProject, deleteArea } from '/@/api/demo/project';
  import { getCurrentIssue } from '/@/api/demo/Issue';

  import { useModal } from '/@/components/Modal';
  import ProjectModal from './ProjectModal.vue';
  import ImportProjectModal from '../Project/ImportProjectModal.vue';
  import IssueModal from './IssueModal.vue';
  import { events } from '/@/views/demo/InformationManagement/HomeDecorationExpo/HomeDecorationExpo.data';
  import mitt from '/@/utils/mitt';

  import { columns, searchFormSchema } from './project.data';

  export default defineComponent({
    name: 'Project',
    components: { BasicTable, IssueModal, ProjectModal, ImportProjectModal, TableAction },
    setup() {
      const [registerCreateProjectModal, { openModal: openModalCreateProjectModal }] = useModal();
      const [registerEditIssueModal, { openModal: openModalEditIssueModal }] = useModal();
      const [registerImportProjectModal, { openModal: openModalImportProjectModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '项目列表',
        api: getProject,
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

      const end_time = ref('');
      async function fetch() {
        const result = await getCurrentIssue();
        if (typeof result === 'object' && result.end_time !== null) {
          end_time.value = '评分截止时间：' + result.end_time;
        } else {
          end_time.value = '';
        }
      }

      const emitter = mitt(events);

      emitter.on('reloadEndTime', fetch);

      onMounted(() => fetch());
      async function handleEditIssue() {
        const issue = await getCurrentIssue();
        openModalEditIssueModal(true, {
          record: issue,
          isUpdate: true,
        });
      }
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
        await deleteArea(record.area_id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerEditIssueModal,
        registerCreateProjectModal,
        registerImportProjectModal,
        handleCreate,
        handleImport,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleEditIssue,
        end_time,
      };
    },
  });
</script>
<style>
  .project .ant-table-row > td:nth-child(3) {
    padding: 0 !important;
  }

  .project_info > div {
    height: 45px;
  }

  .project_info > div:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
</style>
