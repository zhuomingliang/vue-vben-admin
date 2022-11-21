import { h } from 'vue';
import { Row, Col } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getAllAreaList } from '/@/api/demo/area';

export const columns: BasicColumn[] = [
  {
    title: '县（市、区）',
    dataIndex: 'area',
    width: 120,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '排序',
    dataIndex: 'order',
    width: 120,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '项目名称',
    dataIndex: 'projects',
    width: 120,
    customRender: ({ value }) => {
      const projects = JSON.parse(value);
      const result: any[] = [];

      if (Array.isArray(projects)) {
        if (projects.length > 0) {
          projects.forEach((row) => {
            result.push(h(Row, {}, () => [h(Col, { span: 12 }, () => row)]));
          });
        }
      }

      if (result.length > 0) {
        return h('div', { class: 'projects' }, result);
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
