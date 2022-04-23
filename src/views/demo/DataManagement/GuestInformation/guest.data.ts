import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'full_name',
    width: 200,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 180,
  },
  {
    title: '添加渠道',
    dataIndex: 'from',
    width: 180,
  },
  {
    title: '新增时间',
    dataIndex: 'created_at',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'full_name',
    label: '姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    colProps: { span: 8 },
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
