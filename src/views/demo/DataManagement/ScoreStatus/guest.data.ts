import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'full_name',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '是否完成评分',
    dataIndex: 'score_status',
    width: 120,
    customRender: ({ value }) => {
      //if (value === 0) return h('span', {}, () => '否');
      console.log(111);
      const color = value ? 'green' : 'red';
      const text = value ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
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
  {
    field: 'score_status',
    label: '是否完成评分',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
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
    field: 'full_name',
    label: '姓名',
    required: true,
    component: 'Input',
  },
  {
    field: 'phone',
    label: '手机号',
    required: false,
    component: 'Input',
  },
];
