import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  // {
  //   title: '序号',
  //   dataIndex: 'area_id',
  //   width: 80,
  // },
  {
    title: '县（市、区）',
    dataIndex: 'area_name',
    width: 80,
  },
  {
    title: '区域得分',
    dataIndex: 'avg_score',
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
