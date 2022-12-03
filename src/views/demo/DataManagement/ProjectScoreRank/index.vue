<template>
  <BasicTable @register="registerTable" :pagination="false">
    <template #toolbar>
      <a-button @click="Download" preIcon="ant-design:export-outlined"> 导出 </a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getProjectScoreRank } from '/@/api/demo/project';

  import { columns, searchFormSchema } from './project.data';
  import { downloadByUrl } from '/@/utils/file/download';

  export default defineComponent({
    name: 'Project',
    components: { BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '项目得分情况',
        api: getProjectScoreRank,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
      });

      function Download() {
        downloadByUrl({
          url: '/ProjectScore/RankExport',
          target: '_self',
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
        Download,
      };
    },
  });
</script>
