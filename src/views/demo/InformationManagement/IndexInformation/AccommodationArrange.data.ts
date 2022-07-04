import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '所属单位',
    dataIndex: 'unit',
    width: 120,
  },
  {
    title: '住宿酒店',
    dataIndex: 'hotel',
    width: 120,
  },
  {
    title: '住宿房号',
    dataIndex: 'room_number',
    width: 120,
  },
  {
    title: '乘车号',
    dataIndex: 'car_number',
    width: 120,
  },
  {
    title: '用餐地点',
    dataIndex: 'address',
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
    field: 'name',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
    colProps: { span: 6 },
  },
];
