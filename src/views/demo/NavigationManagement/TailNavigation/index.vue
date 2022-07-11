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
    <TailNavigationModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getTailNavigation, deleteTailNavigation, putOrder } from '/@/api/demo/TailNavigation';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useModal } from '/@/components/Modal';
  import TailNavigationModal from './TailNavigationModal.vue';

  import { columns, searchFormSchema } from './TailNavigation.data';

  export default defineComponent({
    name: 'TailNavigation',
    components: { BasicTable, TailNavigationModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '尾部导航栏',
        api: getTailNavigation,
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
        await deleteTailNavigation(record.id);
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
        registerModal,
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
