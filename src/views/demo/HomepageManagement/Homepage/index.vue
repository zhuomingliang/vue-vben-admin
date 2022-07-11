<template>
  <div>
    <BasicTable
      @register="registerTable"
      @edit-end="handleEditEnd"
      :beforeEditSubmit="beforeEditSubmit"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        <a-button type="primary" @click="handleShowHomepageModulePicture">
          查看首页模块图
        </a-button>
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
    <ModulePictureModal @register="registerModulePictureModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getHomepage, deleteHomepage, putOrder } from '/@/api/demo/Homepage';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useModal } from '/@/components/Modal';
  import HomepageModal from './HomepageModal.vue';
  import ModulePictureModal from '../ModulePictureModal.vue';

  import { columns, searchFormSchema } from './Homepage.data';

  export default defineComponent({
    name: 'Homepage',
    components: { BasicTable, HomepageModal, ModulePictureModal, TableAction },
    setup() {
      const [registerCreateHomepageModal, { openModal: openModalCreateHomepageModal }] = useModal();
      const [registerModulePictureModal, { openModal: openModalModulePictureModal }] = useModal();

      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        title: '首页模块管理',
        api: getHomepage,
        columns,
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

      function handleCreate() {
        openModalCreateHomepageModal(true, {
          isUpdate: false,
        });
      }

      function handleShowHomepageModulePicture() {
        openModalModulePictureModal(true);
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
        reload();
      }

      function Save(key: string, record: object, value: any) {
        if (key === 'order') {
          putOrder({
            module_id: record['module_id'],
            sub_menu: record['sub_menu'],
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
        registerCreateHomepageModal,
        registerModulePictureModal,
        handleShowHomepageModulePicture,
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
