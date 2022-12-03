<template>
  <BasicTable @register="registerTable" :pagination="false">
    <template #toolbar>
      <a-button @click="Download"> 导出 </a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAreaScoreRank } from '/@/api/demo/project';

  import { columns, searchFormSchema } from './project.data';
  import { downloadByUrl } from '/@/utils/file/download';
  export default defineComponent({
    name: 'Project',
    components: { BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '县（市、区）得分情况',
        api: getAreaScoreRank,
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
          url: 'https://codeload.github.com/anncwb/vue-vben-admin-doc/zip/master',
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
