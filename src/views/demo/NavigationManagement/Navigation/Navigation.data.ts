import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getMainMenu, getSubMenuByMainMenuId } from '/@/api/demo/Navigation';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putMainMenuStatus, putSubMenuStatus, putThirdMenuStatus } from '/@/api/demo/Navigation';
import { useMessage } from '/@/hooks/web/useMessage';
export const columns: BasicColumn[] = [
  {
    title: '导航栏',
    dataIndex: 'nav',
    width: 120,
  },
  {
    title: '顺序',
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
  },
];

export const formSchema3: FormSchema[] = [
  {
    field: 'third_menu_id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: '一级导航栏',
    field: 'main_menu_id',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: getMainMenu,
        labelField: 'name',
        valueField: 'id',
        placeholder: '请选择',
        onChange: (e: any) => {
          if (e !== undefined) {
            formModel.sub_menu_id = undefined;
            formModel.main_menu_id = e;
          }
        },
      };
    },
    colProps: { span: 16 },
    required: true,
  },
  {
    field: 'sub_menu_id',
    label: '二级导航栏',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: getSubMenuByMainMenuId,
        params: { main_menu_id: formModel.main_menu_id },
        labelField: 'name',
        valueField: 'id',
        placeholder: '请选择',
      };
    },
    colProps: { span: 16 },
    required: true,
  },
  {
    field: 'nav',
    label: '三级导航栏',
    required: true,
    component: 'Input',
  },
  {
    field: 'order',
    label: '顺序',
    required: true,
    component: 'InputNumber',
  },
];
