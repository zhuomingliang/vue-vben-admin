<template>
  <BasicDrawer v-bind="$attrs" :title="title" width="50%" @register="register">
    <BasicTable @register="registerTable" :searchInfo="searchInfo" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table';
  import { getProjectScoreDetail } from '/@/api/demo/project';

  export default defineComponent({
    name: 'DiningArrangementsModal',
    components: {
      BasicDrawer,
      BasicTable,
    },
    emits: ['success', 'register'],
    setup(_) {
      const title = ref('');
      const searchInfo = reactive<Recordable>({});
      const columns: BasicColumn[] = [
        {
          title: '用户',
          dataIndex: 'full_name',
          width: 80,
        },
        {
          title: '项目得分',
          dataIndex: 'score',
          width: 60,
        },
        {
          title: '时间',
          dataIndex: 'created_at',
          width: 80,
        },
      ];

      const [registerTable, { reload }] = useTable({
        api: getProjectScoreDetail,
        columns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        immediate: false,
      });

      const [register] = useDrawerInner(async (data) => {
        const record = data.record;
        title.value = record.project + ' ' + '评分详情';
        searchInfo.project_id = record.id;
        reload();
      });

      return {
        register,
        registerTable,
        title,
        searchInfo,
      };
    },
  });
</script>
