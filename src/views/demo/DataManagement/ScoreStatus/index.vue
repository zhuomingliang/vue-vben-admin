<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:alert-twotone',
              label: '提醒评分',
              color: 'warning',
              popConfirm: {
                title: '是否确认提醒',
                confirm: handleWarning.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getGuest, postSms } from '/@/api/demo/guest';

  import { columns, searchFormSchema } from './guest.data';

  export default defineComponent({
    name: 'Guest',
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '评分完成情况',
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

      function handleWarning(record: Recordable) {
        postSms({ phone: record.phone });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleWarning,
        handleSuccess,
      };
    },
  });
</script>
