<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
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
    <HomepageModal @register="registerCreateHomepageModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getHomepage, deleteHomepage } from '/@/api/demo/Homepage';

  import { useModal } from '/@/components/Modal';
  import HomepageModal from './HomepageModal.vue';

  import { columns, searchFormSchema } from './Homepage.data';

  export default defineComponent({
    name: 'Homepage',
    components: { BasicTable, HomepageModal, TableAction },
    setup() {
      const [registerCreateHomepageModal, { openModal: openModalCreateHomepageModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '导航栏列表',
        api: getHomepage,
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

      function handleCreateSubMenu() {
        openModalCreateHomepageModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModalCreateHomepageModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteHomepage(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function handleEditEnd() {
        handleSuccess();
      }

      return {
        registerTable,
        registerCreateHomepageModal,
        registerCreateHomepageModal,
        handleCreateMainMenu,
        handleCreateSubMenu,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleEditEnd,
        beforeEditSubmit,
      };
    },
  });
</script>
