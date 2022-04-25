import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '酒店名',
    dataIndex: 'hotel',
    width: 120,
  },
  {
    title: '楼层信息',
    dataIndex: 'storey_info',
    width: 120,
  },
  {
    title: '联系人',
    dataIndex: 'contacts',
    width: 120,
  },
  {
    title: '联系人电话',
    dataIndex: 'contact_telephone',
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
    field: 'hotel',
    label: '酒店名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
    colProps: { span: 4 },
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
    field: 'hotel',
    label: '酒店名',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'first_number[]',
    label: '楼层分布',
    component: 'Input',
    required: true,
    colProps: {
      span: 10,
    },
    componentProps: {
      placeholder: '首位数字',
    },
  },
  {
    field: 'floor_number[]',
    label: '',
    component: 'Input',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '对应楼层',
    },
  },
  {
    field: 'first_number[]',
    label: '楼层分布',
    component: 'Input',
    required: true,
    colProps: {
      span: 10,
    },
    componentProps: {
      placeholder: '首位数字',
    },
  },
  {
    field: 'floor_number[]',
    label: '',
    component: 'Input',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '对应楼层',
    },
  },
  {
    field: '0',
    component: 'Input',
    label: ' ',
    colProps: {
      span: 8,
    },
    slot: 'floor',
  },
  {
    field: 'contacts',
    label: '联系人',
    component: 'Input',
    required: true,
  },
  {
    field: 'contact_telephone',
    label: '联系人电话',
    required: true,
    component: 'Input',
  },
];
