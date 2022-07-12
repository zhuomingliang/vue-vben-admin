import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getMainMenu, getSubMenuByMainMenuId } from '/@/api/demo/Navigation';

export const columns: BasicColumn[] = [
  {
    title: '模块',
    dataIndex: 'module_id',
    width: 120,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '一级导航栏',
    dataIndex: 'main_menu',
    width: 120,
  },
  {
    title: '二级导航栏',
    dataIndex: 'sub_menu',
    width: 120,
  },
  {
    title: '顺序',
    dataIndex: 'order',
    width: 60,
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
    field: 'id',
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
        { label: '模块 6', value: '6' },
        { label: '模块 7', value: '7' },
        { label: '模块 8', value: '8' },
      ],
    },
    colProps: { span: 12 },
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
];
