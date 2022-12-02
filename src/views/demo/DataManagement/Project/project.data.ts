import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getAllAreaList } from '/@/api/demo/area';
import { Row, Col } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '县（市、区）',
    dataIndex: 'area_name',
    width: 80,
  },
  {
    title: '排序',
    dataIndex: 'area_order',
    width: 40,
  },
  {
    title: '项目名称',
    dataIndex: 'projects',
    width: 240,
    customRender: ({ value }) => {
      if (value === undefined || value === null) return null;
      const projects = JSON.parse(value);
      const result: any[] = [];
      if (Array.isArray(projects)) {
        if (projects.length > 0) {
          projects.forEach((row) => {
            result.push(
              h(Row, { align: 'middle' }, () => [h(Col, { span: 24 }, () => row.project)]),
            );
          });
        }
      }

      if (result.length > 0) {
        return h('div', { class: 'project_info' }, result);
      }

      return null;
    },
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

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: '县（市、区）',
    field: 'area_id',
    component: 'ApiSelect',
    componentProps: {
      api: getAllAreaList,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'project_name',
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
