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
    <NavigationModal @register="registerCreateNavigationModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getNavigation,
    deleteNavigation,
    putMainOrder,
    putSubOrder,
  } from '/@/api/demo/Navigation';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useModal } from '/@/components/Modal';
  import NavigationModal from './NavigationModal.vue';

  import { columns, searchFormSchema } from './Navigation.data';

  export default defineComponent({
    name: 'Navigation',
    components: { BasicTable, NavigationModal, TableAction },
    setup() {
      const [registerCreateNavigationModal, { openModal: openModalCreateNavigationModal }] =
        useModal();

      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        title: '导航栏列表',
        api: getNavigation,
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
        openModalCreateNavigationModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModalCreateNavigationModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteNavigation(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function handleEditEnd() {
        handleSuccess();
      }

      // 模拟将指定数据保存
      function Save(key: string, record: object, value: any) {
        if (key === 'main_order') {
          putMainOrder({ main_nav: record['main_nav'], main_order: value }).then(() =>
            createMessage.success({
              content: `更新成功`,
            }),
          );
        } else if (key === 'sub_order') {
          putSubOrder({ sub_nav: record['sub_nav'], sub_order: value }).then(() =>
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
        registerCreateNavigationModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleEditEnd,
        beforeEditSubmit,
      };
    },
  });
</script>
