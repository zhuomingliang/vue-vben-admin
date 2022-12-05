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
    <GuestModal @register="registerCreateGuestModal" @success="handleSuccess" />
    <ImportGuestModal @register="registerImportGuestModal" @success="handleSuccess" />
    <MessageModal :msg="msg" @register="registerMessageModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getGuest, deleteGuest } from '/@/api/demo/guest';

  import { useModal } from '/@/components/Modal';
  import GuestModal from './GuestModal.vue';
  import ImportGuestModal from './ImportGuestModal.vue';
  import MessageModal from './MessageModal.vue';

  import { columns, searchFormSchema } from './guest.data';

  export default defineComponent({
    name: 'Guest',
    components: { BasicTable, GuestModal, ImportGuestModal, MessageModal, TableAction },
    setup() {
      const msg = ref('')

      const [registerCreateGuestModal, { openModal: openModalCreateGuestModal }] = useModal();
      const [registerImportGuestModal, { openModal: openModalImportGuestModal }] = useModal();
      const [registerMessageModal, { openModal: openMessageModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '用户列表',
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


      function handleSuccess(res) {
        reload();
        if (res.message) {
          msg.value = res.message
          handleOpenMsg()
        }
      }

      function handleOpenMsg() {
        openMessageModal(true);
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
        msg,
        registerMessageModal
      };
    },
  });
</script>
