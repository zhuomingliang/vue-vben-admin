import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '县（市、区）',
    dataIndex: 'area_name',
    width: 80,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '综合得分',
    dataIndex: 'avg_score',
    width: 60,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '项目名称',
    dataIndex: 'project',
    width: 240,
  },
  {
    title: '项目得分',
    dataIndex: 'project_score',
    width: 60,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'project_name',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 4 },
  },
];
