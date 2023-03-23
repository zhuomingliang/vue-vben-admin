<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTree
      title="友情链接导航"
      toolbar
      search
      :expandedKeys="['0']"
      :selectedKeys="['0']"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
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
        <a-button type="primary" @click="handleCreateLink">新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ListlinkModal @register="registerCreateNavigationModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { columns, searchFormSchema } from './Listlink.data';
  import { getClassification, getListlink, deleteListlink } from '/@/api/demo/Listlink';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useModal } from '/@/components/Modal';
  import ListlinkModal from './ListlinkModal.vue';
  export default defineComponent({
    name: 'Listlink',
    components: {
      PageWrapper,
      BasicTree,
      BasicTable,
      TableAction,
      ListlinkModal,
    },
    setup() {
      const [registerCreateNavigationModal, { openModal: openModalCreateNavigationModal }] =
        useModal();
      const treeData = ref<TreeItem[]>([]);
      const searchInfo = reactive<Recordable>({ main_menu_id: 0 });
      const [registerTable, { reload }] = useTable({
        title: '友情链接列表',
        api: getListlink,
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
      function handleCreateLink() {
        if (searchInfo.main_menu_id == 0) {
          let record = { main_menu_id: parseInt(searchInfo.main_menu_id) };
          openModalCreateNavigationModal(true, {
            record,
            isUpdate: false,
          });
        }
      }
      function handleEdit() {}

      async function handleDelete(record: Recordable) {
        await deleteListlink(record.id);
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
        reload();
      }
      async function fetch() {
        treeData.value = (await getClassification(0)) as unknown as TreeItem[];
      }
      onMounted(() => {
        fetch();
      });
      return {
        registerTable,
        registerCreateNavigationModal,
        treeData,
        handleSelect,
        handleSuccess,
        searchInfo,
        handleCreateLink,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>
