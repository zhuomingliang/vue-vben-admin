<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTree
      title="区域列表"
      toolbar
      search
      :expandedKeys="['0']"
      :clickRowToExpand="false"
      :treeData="treeData"
      @select="handleSelect"
      :selectedKeys="[1]"
      :fieldNames="{ key: 'id', title: 'name' }"
      class="m-4 mr-0 overflow-hidden bg-white w-1/5 xl:w-1/6"
    />
    <BasicTable
      @register="registerTable"
      @edit-end="handleSuccess"
      :searchInfo="searchInfo"
      class="w-4/5 xl:w-5/6"
      style="padding: 16px"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAllAreaList } from '/@/api/demo/area';
  import { getProjectScoreByGuest } from '/@/api/demo/project';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { columns, searchFormSchema } from './GuestScore.data';

  export default defineComponent({
    name: 'Content',
    components: { PageWrapper, BasicTree, BasicTable },
    setup() {
      const treeData = ref<TreeItem[]>([]);
      const searchInfo = reactive<Recordable>({});
      searchInfo.area_id = 1;
      const [registerTable, { reload }] = useTable({
        title: '评分列表（按用户）',
        api: getProjectScoreByGuest,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
      });

      function handleSelect(keys) {
        if (typeof keys[0] === 'undefined') {
          return;
        }

        searchInfo.area_id = keys[0];

        reload();
      }

      async function fetch() {
        treeData.value = (await getAllAreaList()) as unknown as TreeItem[];
      }

      function handleSuccess() {
        reload();
      }

      onMounted(() => {
        fetch();
      });

      return {
        registerTable,
        treeData,
        searchInfo,
        handleSelect,
        handleSuccess,
      };
    },
  });
</script>
<style>
  .project_info > div {
    height: 40px;
  }

  .project_info > div:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
</style>
