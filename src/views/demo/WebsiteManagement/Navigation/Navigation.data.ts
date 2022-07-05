import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '一级导航栏',
    dataIndex: 'main_nav',
    width: 120,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '顺序',
    dataIndex: 'main_order',
    width: 120,
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
  {
    field: 'full_name',
    label: '姓名',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'full_name',
    label: '姓名',
    required: true,
    component: 'Input',
  },
  {
    field: 'phone',
    label: '手机号',
    required: true,
    component: 'Input',
  },
];
