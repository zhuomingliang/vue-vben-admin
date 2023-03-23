import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getMainMenu, getSubMenuByMainMenuId } from '/@/api/demo/Navigation';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putMainMenuStatus, putSubMenuStatus, putThirdMenuStatus } from '/@/api/demo/Navigation';
import { useMessage } from '/@/hooks/web/useMessage';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '排序',
    dataIndex: 'order',
    width: 60,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === true,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          console.log(record);
          if (typeof record.third_menu_id !== 'undefined') {
            putThirdMenuStatus(record.third_menu_id, newStatus)
              .then(() => {
                record.status = newStatus;
                createMessage.success(`修改状态成功`);
              })
              .catch(() => {
                createMessage.error('修改状态失败');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          } else if (typeof record.sub_menu_id !== 'undefined') {
            putSubMenuStatus(record.sub_menu_id, newStatus)
              .then(() => {
                record.status = newStatus;
                createMessage.success(`修改状态成功`);
              })
              .catch(() => {
                createMessage.error('修改状态失败');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          } else if (typeof record.main_menu_id !== 'undefined') {
            putMainMenuStatus(record.main_menu_id, newStatus)
              .then(() => {
                record.status = newStatus;
                createMessage.success(`修改状态成功`);
              })
              .catch(() => {
                createMessage.error('修改状态失败');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          }
        },
      });
    },
  },
  {
    title: '新增时间',
    dataIndex: 'created_at',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 120,
  },
];
export const searchFormSchema: FormSchema[] = [];
export const formSchema: FormSchema[] = [
  {
    field: 'main_menu_id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'nav',
    label: '一级导航栏',
    required: true,
    component: 'Input',
  },
  {
    field: 'order',
    label: '顺序',
    required: true,
    component: 'InputNumber',
    defaultValue: 1,
  },
];

export const formSchema2: FormSchema[] = [
  {
    field: 'sub_menu_id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: '一级导航栏',
    field: 'main_menu_id',
    component: 'ApiSelect',
    componentProps: {
      api: getMainMenu,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'nav',
    label: '二级导航栏',
    required: true,
    component: 'Input',
  },
  {
    field: 'order',
    label: '顺序',
    required: true,
    component: 'InputNumber',
    defaultValue: 1,
  },
];
