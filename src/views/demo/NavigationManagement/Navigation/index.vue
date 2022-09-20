<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTree
      title="导航栏列表"
      toolbar
      search
      :expandedKeys="['0']"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'nav' }"
      @select="handleSelect"
      class="m-4 mr-0 overflow-hidden bg-white w-1/5 xl:w-1/6"
    />
    <BasicTable
      @register="registerTable"
      class="w-4/5 xl:w-5/6"
      style="padding: 16px"
      :searchInfo="searchInfo"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleCreateMainMenu"> 新增一级导航栏 </a-button>
        <a-button type="primary" @click="handleCreateSubMenu"> 新增二级导航栏 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <NavigationModal @register="registerCreateNavigationModal" @success="handleSuccess" />
    <NavigationModal2 @register="registerCreateNavigationModal2" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getNavigation, deleteNavigation } from '/@/api/demo/Navigation';

  import { getNavList } from '/@/api/demo/Content';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import NavigationModal from './NavigationModal.vue';
  import NavigationModal2 from './NavigationModal2.vue';

  import { columns, searchFormSchema } from './Navigation.data';

  export default defineComponent({
    name: 'Navigation',
    components: {
      PageWrapper,
      BasicTree,
      BasicTable,
      NavigationModal,
      NavigationModal2,
      TableAction,
    },
    setup() {
      const [registerCreateNavigationModal, { openModal: openModalCreateNavigationModal }] =
        useModal();

      const [registerCreateNavigationModal2, { openModal: openModalCreateNavigationModal2 }] =
        useModal();

      const treeData = ref<TreeItem[]>([]);
      const searchInfo = reactive<Recordable>({});

      const [registerTable, { reload }] = useTable({
        title: '导航栏列表',
        api: getNavigation,
        columns,
        pagination: false,
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

      function handleCreateMainMenu() {
        openModalCreateNavigationModal(true, {
          isUpdate: false,
        });
      }

      function handleCreateSubMenu() {
        openModalCreateNavigationModal2(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        if (record.sub_menu_id)
          openModalCreateNavigationModal2(true, {
            record,
            isUpdate: true,
          });
        else
          openModalCreateNavigationModal(true, {
            record,
            isUpdate: true,
          });
      }

      async function handleDelete(record: Recordable) {
        await deleteNavigation(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function handleSelect(keys) {
        if (typeof keys[0] === 'undefined') {
          return;
        }

        let ids = keys[0].split('-');

        searchInfo.main_menu_id = ids[0];
        searchInfo.sub_menu_id = ids[1];
        searchInfo.third_menu_id = ids[2];

        reload();
      }

      async function fetch() {
        treeData.value = (await getNavList()) as unknown as TreeItem[];
      }

      onMounted(() => {
        fetch();
      });

      return {
        registerTable,
        registerCreateNavigationModal,
        registerCreateNavigationModal2,
        handleCreateMainMenu,
        handleCreateSubMenu,
        handleEdit,
        handleDelete,
        handleSuccess,
        treeData,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
