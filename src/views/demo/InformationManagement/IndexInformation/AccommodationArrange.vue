<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleCreate"> 新增 </a-button> -->
        <a-button type="primary" @click="handleImport"> 导入 </a-button>
        <a-button type="primary" @click="handleExport"> 导出 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <ImportAccommodationArrangeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getAccommodationArrange,
    deleteAccommodationArrange,
  } from '/@/api/demo/AccommodationArrange';

  import { useModal } from '/@/components/Modal';
  import ImportAccommodationArrangeModal from './ImportAccommodationArrangeModal.vue';

  import { columns, searchFormSchema } from './AccommodationArrange.data';
  import { openWindow } from '/@/utils';

  export default defineComponent({
    name: 'AccommodationArrangements',
    components: { BasicTable, ImportAccommodationArrangeModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        api: getAccommodationArrange,
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

      function handleImport() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleExport() {
        openWindow('/AccommodationArrange/export', { target: '_self' });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteAccommodationArrange(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleImport,
        handleExport,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
<style>
  .accommodation_arrangements_storey_info > div {
    border-bottom: 1px solid #eee;
  }
</style>
