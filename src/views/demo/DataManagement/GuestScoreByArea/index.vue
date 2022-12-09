<template>
  <PageWrapper dense contentClass="flex">
    <BasicTree
      title="区域列表"
      toolbar
      search
      :expandedKeys="['0']"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
      @select="handleSelect"
      :selectedKeys="defaultArea"
      class="m-4 mr-0 overflow-hidden bg-white w-1/5 xl:w-1/6"
    />
    <BasicTable
      @register="registerTable"
      @edit-end="handleSuccess"
      :searchInfo="searchInfo"
      :afterFetch="handleSummary"
      class="w-4/5 xl:w-5/6 AreaGuestScore"
      style="padding: 16px"
    >
      <template #toolbar>
        <a-button @click="Download" preIcon="ant-design:export-outlined"> 导出 </a-button>
      </template>
      <template #summary>
        <TableSummaryRow>
          <TableSummaryCell :col-span="3" />
          <TableSummaryCell style="text-align: center">平均分</TableSummaryCell>
          <TableSummaryCell style="text-align: center">{{ avg_score1 }} </TableSummaryCell>
        </TableSummaryRow>
        <TableSummaryRow>
          <TableSummaryCell :col-span="3" />
          <TableSummaryCell style="text-align: center">综合得分</TableSummaryCell>
          <TableSummaryCell style="text-align: center"> {{ avg_score2 }} </TableSummaryCell>
        </TableSummaryRow>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAllAreaList } from '/@/api/demo/area';
  import { getProjectScoreByArea } from '/@/api/demo/project';
  import { Table } from 'ant-design-vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { columns, searchFormSchema } from './GuestScore.data';
  import { downloadByUrl } from '/@/utils/file/download';
  const TableSummaryRow = Table.Summary.Row;
  const TableSummaryCell = Table.Summary.Cell;
  export default defineComponent({
    name: 'Content',
    components: { PageWrapper, BasicTree, BasicTable, TableSummaryRow, TableSummaryCell },
    setup() {
      const treeData = ref<TreeItem[]>([]);
      const defaultArea = ref<any>([]);
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: '评分列表（按区划）',
        api: getProjectScoreByArea,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        pagination: false,
        immediate: false,
      });

      const avg_score1 = ref('');
      const avg_score2 = ref('');
      function handleSummary(tableData: Recordable[]) {
        let avg_score: any[] = [];
        let i = 0;
        const totalNo = tableData.reduce((prev, next) => {
          if (next.rowspan) {
            i++;
            const score = parseFloat(next.avg_score);
            prev += score;
            avg_score.push(score);
          }
          return prev;
        }, 0);

        avg_score = avg_score.sort();
        avg_score = avg_score.slice(2, -2);

        const totalNo2 = avg_score.reduce((prev, next) => {
          prev += next;
          return prev;
        }, 0);

        const length = avg_score.length;
        avg_score1.value = (totalNo / i).toFixed(2);
        avg_score2.value = length ? (totalNo2 / length).toFixed(2) : '';
      }

      function Download() {
        downloadByUrl({
          url: '/ProjectScore/ByAreaExport?area_id=' + searchInfo.area_id,
          target: '_self',
        });
      }

      function handleSelect(keys) {
        if (typeof keys[0] === 'undefined') {
          return;
        }

        searchInfo.area_id = keys[0];

        reload();
      }
      async function fetch() {
        const area = (await getAllAreaList()) as unknown as TreeItem[];
        treeData.value = area;
        const selectArea = area[0] ? area[0].id : [];
        searchInfo.area_id = selectArea;
        defaultArea.value = [selectArea];
        reload();
      }

      function handleSuccess() {
        reload();
      }

      onMounted(() => {
        fetch();
      });

      return {
        registerTable,
        defaultArea,
        treeData,
        searchInfo,
        handleSelect,
        handleSuccess,
        handleSummary,
        avg_score1,
        avg_score2,
        Download,
      };
    },
  });
</script>
<style>
  .AreaGuestScore .ant-table-footer {
    padding: 0;
  }
</style>
