import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getMainMenu } from '/@/api/demo/Navigation';

export const columns: BasicColumn[] = [
  {
    title: '模块',
    dataIndex: 'module_id',
    width: 120,
  },
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
    field: 'sub_menu_id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'module_id',
    label: '模块',
    component: 'Select',
    componentProps: {
      options: [
        { label: '模块 2', value: '2' },
        { label: '模块 3', value: '3' },
        { label: '模块 4', value: '4' },
        { label: '模块 5', value: '5' },
        { label: '模块 6', value: '6' },
        { label: '模块 7', value: '7' },
        { label: '模块 8', value: '8' },
      ],
    },
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
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
  },
];
