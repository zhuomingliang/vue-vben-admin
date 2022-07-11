<template>
  <div>
    <BasicTable
      @register="registerTable"
      @edit-end="handleEditEnd"
      :beforeEditSubmit="beforeEditSubmit"
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
  import { getCarsoul, deleteCarsoul, putOrder } from '/@/api/demo/Carsoul';
  import { useMessage } from '/@/hooks/web/useMessage';

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

      function handleEditEnd() {
        reload();
      }
      const { createMessage } = useMessage();

      function Save(key: string, record: object, value: any) {
        if (key === 'order') {
          putOrder({
            module_id: record['module_id'],
            title: record['title'],
            order: value,
          }).then(() =>
            createMessage.success({
              content: `更新成功`,
            }),
          );
        }
      }

      async function beforeEditSubmit({ record, key, value }) {
        return Save(key, record, value);
      }
      return {
        registerTable,
        registerCreateCarsoulModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        beforeEditSubmit,
        handleEditEnd,
      };
    },
  });
</script>
