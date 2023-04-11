<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTree
      title="友情链接导航"
      toolbar
      search
      :expandedKeys="['0']"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
      @select="handleSelect"
      class="m-4 mr-0 overflow-hidden bg-white w-1/5 xl:w-1/6"
    />
    <BasicTable
      @register="registerTable"
      @edit-end="handleSuccess"
      :beforeEditSubmit="beforeEditSubmit"
      class="w-4/5 xl:w-5/6"
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
    <ListlinkModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { columns, searchFormSchema } from './Listlink.data';
  import { getClassification, getListlink, deleteListlink, putOrder } from '/@/api/demo/Listlink';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
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
      const treeData = ref<TreeItem[]>([]);
      const searchInfo = reactive<Recordable>({});
      const { createMessage } = useMessage();

      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '友情链接列表',
        api: getListlink,
        columns,

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

      async function fetch() {
        treeData.value = (await getClassification(0)) as unknown as TreeItem[];
      }

      function handleSelect(keys) {
        if (typeof keys[0] === 'undefined') {
          return;
        }

        let ids = keys[0];

        searchInfo.cate_id = ids;
        console.log(searchInfo.cate_id);
        reload();
      }

      function handleCreateLink() {
        openModal(true, {
          isUpdate: false,
        });
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteListlink(record.id);
      }

      async function beforeEditSubmit({ record, key, value }) {
        return Save(key, record, value);
      }

      function Save(key: string, record: object, value: any) {
        if (key === 'order') {
          putOrder({ title: record['title'], created_at: record['created_at'], order: value }).then(
            () =>
              createMessage.success({
                content: `更新成功`,
              }),
          );
        }
      }

      function handleSuccess() {
        reload();
      }

      onMounted(() => {
        fetch();
      });
      return {
        registerTable,
        registerModal,
        treeData,
        handleSelect,
        handleSuccess,
        searchInfo,
        handleCreateLink,
        handleEdit,
        handleDelete,
        beforeEditSubmit,
      };
    },
  });
</script>
