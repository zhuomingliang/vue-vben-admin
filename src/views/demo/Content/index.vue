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
      @edit-end="handleSuccess"
      :beforeEditSubmit="beforeEditSubmit"
      class="w-4/5 xl:w-5/6"
      :searchInfo="searchInfo"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
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
    <ContentModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getNavList, getContent, deleteContent } from '/@/api/demo/Content';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useModal } from '/@/components/Modal';
  import ContentModal from './ContentModal.vue';

  import { columns, searchFormSchema } from './Content.data';
  import { putOrder } from '/@/api/demo/Content';

  export default defineComponent({
    name: 'Content',
    components: { PageWrapper, BasicTree, BasicTable, ContentModal, TableAction },
    setup() {
      const treeData = ref<TreeItem[]>([]);
      const searchInfo = reactive<Recordable>({});
      const { createMessage } = useMessage();

      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '内容列表',
        api: getContent,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
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
        treeData.value = (await getNavList()) as unknown as TreeItem[];
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

      function handleCreate() {
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
        await deleteContent(record.id);
        reload();
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

      async function beforeEditSubmit({ record, key, value }) {
        return Save(key, record, value);
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
        searchInfo,
        handleSelect,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        beforeEditSubmit,
      };
    },
  });
</script>
