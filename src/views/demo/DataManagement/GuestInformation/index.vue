<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        <a-button type="primary" @click="handleImport"> 导入 </a-button>
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
    <GuestModal @register="registerCreateGuestModal" @success="handleSuccess" />
    <ImportGuestModal @register="registerImportGuestModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getGuest, deleteGuest } from '/@/api/demo/guest';

  import { useModal } from '/@/components/Modal';
  import GuestModal from './GuestModal.vue';
  import ImportGuestModal from './ImportGuestModal.vue';

  import { columns, searchFormSchema } from './guest.data';

  export default defineComponent({
    name: 'Guest',
    components: { BasicTable, GuestModal, ImportGuestModal, TableAction },
    setup() {
      const [registerCreateGuestModal, { openModal: openModalCreateGuestModal }] = useModal();
      const [registerImportGuestModal, { openModal: openModalImportGuestModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '嘉宾列表',
        api: getGuest,
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

      function handleCreate() {
        openModalCreateGuestModal(true, {
          isUpdate: false,
        });
      }

      function handleImport() {
        openModalImportGuestModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModalCreateGuestModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteGuest(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerCreateGuestModal,
        registerImportGuestModal,
        handleCreate,
        handleImport,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
