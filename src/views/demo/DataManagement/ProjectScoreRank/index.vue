<template>
  <BasicTable @register="registerTable" :pagination="false" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getProjectScoreRank } from '/@/api/demo/project';

  import { columns, searchFormSchema } from './project.data';

  export default defineComponent({
    name: 'Project',
    components: { BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '项目评分排行',
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

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
      };
    },
  });
</script>
