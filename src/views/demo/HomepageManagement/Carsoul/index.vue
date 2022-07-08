<template>
  <div>
    <BasicTable @register="registerTable">
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
          ]"
        />
      </template>
    </BasicTable>
    <CarsoulModal @register="registerCreateCarsoulModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getCarsoul, deleteCarsoul } from '/@/api/demo/Carsoul';

  import { useModal } from '/@/components/Modal';
  import CarsoulModal from './CarsoulModal.vue';

  import { columns, searchFormSchema } from './Carsoul.data';

  export default defineComponent({
    name: 'Carsoul',
    components: { BasicTable, CarsoulModal, TableAction },
    setup() {
      const [registerCreateCarsoulModal, { openModal: openModalCreateCarsoulModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '首页轮播图管理',
        api: getCarsoul,
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
        openModalCreateCarsoulModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModalCreateCarsoulModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteCarsoul(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerCreateCarsoulModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
