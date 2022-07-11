<template>
  <div>
    <BasicTable
      @register="registerTable"
      @edit-end="handleEditEnd"
      :beforeEditSubmit="beforeEditSubmit"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleCreateMainMenu"> 新增一级导航栏 </a-button>
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
    <NavigationModal @register="registerCreateNavigationModal" @success="handleSuccess" />
    <NavigationModal2 @register="registerCreateNavigationModal2" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getNavigation,
    deleteNavigation,
    putMainMenu2,
    putMainOrder,
    putSubOrder,
  } from '/@/api/demo/Navigation';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useModal } from '/@/components/Modal';
  import NavigationModal from './NavigationModal.vue';
  import NavigationModal2 from './NavigationModal2.vue';

  import { columns, searchFormSchema } from './Navigation.data';

  export default defineComponent({
    name: 'Navigation',
    components: { BasicTable, NavigationModal, NavigationModal2, TableAction },
    setup() {
      const [registerCreateNavigationModal, { openModal: openModalCreateNavigationModal }] =
        useModal();

      const [registerCreateNavigationModal2, { openModal: openModalCreateNavigationModal2 }] =
        useModal();

      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        title: '导航栏列表',
        api: getNavigation,
        columns,
        pagination: false,
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

      function handleCreateMainMenu() {
        openModalCreateNavigationModal(true, {
          isUpdate: false,
        });
      }

      function handleCreateSubMenu() {
        openModalCreateNavigationModal2(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        if (record.sub_menu_id)
          openModalCreateNavigationModal2(true, {
            record,
            isUpdate: true,
          });
        else
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
        } else if (key === 'main_nav') {
          putMainMenu2({ main_nav: record['main_nav'], new_main_nav: value }).then(() =>
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
        registerCreateNavigationModal2,
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
