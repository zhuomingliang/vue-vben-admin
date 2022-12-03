<template>
  <div>
    <BasicTable @register="registerTable" :pagination="false">
      <template #toolbar>
        <a-button @click="Download" preIcon="ant-design:export-outlined"> 导出 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:view-columns-line',
              onClick: handleDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectDrawer @register="registerProjectDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getProjectScore } from '/@/api/demo/project';

  import { useDrawer } from '/@/components/Drawer';
  import ProjectDrawer from './ProjectDrawer.vue';

  import { columns, searchFormSchema } from './project.data';
  import { downloadByUrl } from '/@/utils/file/download';

  export default defineComponent({
    name: 'Project',
    components: { BasicTable, ProjectDrawer, TableAction },
    setup() {
      const [registerProjectDrawer, { openDrawer }] = useDrawer();

      const [registerTable, { reload }] = useTable({
        title: '评分数据汇总',
        api: getProjectScore,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: false,
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

      function Download() {
        downloadByUrl({
          url: '/ProjectScore/indexXlsx',
          target: '_self',
        });
      }

      function handleDetail(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerProjectDrawer,
        handleDetail,
        handleSuccess,
        Download,
      };
    },
  });
</script>
