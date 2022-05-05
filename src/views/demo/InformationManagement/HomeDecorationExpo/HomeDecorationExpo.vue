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
    <HomeDecorationExpoModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import mitt from '/@/utils/mitt';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getHomeDecorationExpo, deleteHomeDecorationExpo } from '/@/api/demo/HomeDecorationExpo';

  import { useModal } from '/@/components/Modal';
  import HomeDecorationExpoModal from './HomeDecorationExpoModal.vue';

  import { events, columns, searchFormSchema } from './HomeDecorationExpo.data';

  export default defineComponent({
    name: 'HomeDecorationExpo',
    components: { BasicTable, HomeDecorationExpoModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '家博会',
        api: getHomeDecorationExpo,
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
      const emitter = mitt(events);

      emitter.on('reload', reload);

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
        await deleteHomeDecorationExpo(record.id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
    onUnmounted() {
      emitter.clear();
    },
  });
</script>
