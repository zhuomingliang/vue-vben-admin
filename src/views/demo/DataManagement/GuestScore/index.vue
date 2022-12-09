<template>
  <PageWrapper dense contentClass="flex">
    <BasicTree
      title="用户姓名"
      toolbar
      search
      :expandedKeys="['0']"
      :clickRowToExpand="false"
      :treeData="treeData"
      @select="handleSelect"
      :selectedKeys="defaultUser"
      :fieldNames="{ key: 'id', title: 'full_name' }"
      class="m-4 mr-0 overflow-hidden bg-white w-1/5 xl:w-1/6"
    />
    <BasicTable
      @register="registerTable"
      @edit-end="handleSuccess"
      :searchInfo="searchInfo"
      class="w-4/5 xl:w-5/6"
      style="padding: 16px"
    >
      <template #toolbar>
        <a-button @click="Download" preIcon="ant-design:export-outlined"> 导出 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAllGuest } from '/@/api/demo/guest';
  import { getProjectScoreByGuest } from '/@/api/demo/project';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { columns, searchFormSchema } from './GuestScore.data';
  import { downloadByUrl } from '/@/utils/file/download';

  export default defineComponent({
    name: 'Content',
    components: { PageWrapper, BasicTree, BasicTable },
    setup() {
      const treeData = ref<TreeItem[]>([]);
      const defaultUser = ref<any>([]);
      const searchInfo = reactive<Recordable>({});
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
        pagination: false,
        immediate: false,
      });

      function Download() {
        downloadByUrl({
          url: '/ProjectScore/ByGuestxlsx?guest_information_id=' + searchInfo.guest_information_id,
          target: '_self',
        });
      }

      function handleSelect(keys) {
        if (typeof keys[0] === 'undefined') {
          return;
        }

        searchInfo.guest_information_id = keys[0];

        reload();
      }

      async function fetch() {
        const Users = await getAllGuest();
        treeData.value = Users as unknown as TreeItem[];
        const selectUser = Users[0] ? Users[0].id : [];
        searchInfo.guest_information_id = selectUser;
        defaultUser.value = [selectUser];
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
        defaultUser,
        treeData,
        searchInfo,
        handleSelect,
        handleSuccess,
        Download,
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
