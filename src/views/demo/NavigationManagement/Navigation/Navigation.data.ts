import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getMainMenu } from '/@/api/demo/Navigation';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putMainMenuStatus, putSubMenuStatus } from '/@/api/demo/Navigation';
import { useMessage } from '/@/hooks/web/useMessage';
export const columns: BasicColumn[] = [
  {
    title: '一级导航栏',
    dataIndex: 'main_nav',
    width: 120,
    edit: true,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '顺序',
    dataIndex: 'main_order',
    width: 120,
    edit: true,
  },
  {
    title: '状态',
    dataIndex: 'main_status',
    width: 60,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.main_status === true,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          putMainMenuStatus(record.main_menu_id, newStatus)
            .then(() => {
              record.main_status = newStatus;
              createMessage.success(`修改状态成功`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '二级导航栏',
    dataIndex: 'sub_nav',
    width: 120,
  },
  {
    title: '顺序',
    dataIndex: 'sub_order',
    width: 120,
    edit: true,
  },
  {
    title: '状态',
    dataIndex: 'sub_status',
    width: 60,
    customRender: ({ record }) => {
      if (record.sub_menu_id === null) return null;
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.sub_status === true,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          putSubMenuStatus(record.sub_menu_id, newStatus)
            .then(() => {
              record.sub_status = newStatus;
              createMessage.success(`修改状态成功`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
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

export const searchFormSchema: FormSchema[] = [
  // {
  //   field: 'full_name',
  //   label: '姓名',
  //   component: 'Input',
  //   colProps: { span: 4 },
  // },
  // {
  //   field: 'phone',
  //   label: '手机号',
  //   component: 'Input',
  //   colProps: { span: 6 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'main_menu_id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'main_nav',
    label: '一级导航栏',
    required: true,
    component: 'Input',
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
    field: 'sub_nav',
    label: '二级导航栏',
    required: true,
    component: 'Input',
  },
];
