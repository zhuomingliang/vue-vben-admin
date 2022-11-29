<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTree
      title="区域列表"
      toolbar
      search
      :expandedKeys="['0']"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
      @select="handleSelect"
      :selectedKeys="[1]"
      class="m-4 mr-0 overflow-hidden bg-white w-1/5 xl:w-1/6"
    />
    <BasicTable
      @register="registerTable"
      @edit-end="handleSuccess"
      :pagination="false"
      class="w-4/5 xl:w-5/6"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAllAreaList } from '/@/api/demo/area';
  import { getGuestScoreByProject } from '/@/api/demo/project';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { columns, searchFormSchema } from './ProjectGuestScore.data';

  export default defineComponent({
    name: 'Content',
    components: { PageWrapper, BasicTree, BasicTable },
    setup() {
      const treeData = ref<TreeItem[]>([]);
      const searchInfo = reactive<Recordable>({});
      searchInfo.area_id = 1;

      const [registerTable, { setColumns, setTableData }] = useTable({
        title: '项目评分数据列表',
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
      });
      async function fetch() {
        treeData.value = (await getAllAreaList()) as unknown as TreeItem[];
      }

      async function fetchScore() {
        const data = await getGuestScoreByProject(searchInfo);
        let i = 0;
        data.projects.forEach(function (project) {
          columns[i].title = project.project;
          columns[i].dataIndex = 'score' + project.id;
          i++;
        });
        let column = columns;
        if (i == 2) {
          column = column.filter((num, index) => {
            return index !== i;
          });
        }
        setColumns(column);
        setTableData(data.data);
      }
      function handleSelect(keys) {
        if (typeof keys[0] === 'undefined') {
          return;
        }

        searchInfo.area_id = keys[0];
        fetchScore();
      }
      function handleSuccess() {
        fetchScore();
      }

      onMounted(() => {
        fetch();
        fetchScore();
      });

      return {
        registerTable,
        treeData,
        handleSelect,
        handleSuccess,
      };
    },
  });
</script>
<style>
  .guest_info > div {
    height: 40px;
  }

  .guest_info > div:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
</style>
