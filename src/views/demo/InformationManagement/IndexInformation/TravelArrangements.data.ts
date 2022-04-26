import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Row, Col } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 80,
  },
  {
    title: '行程安排',
    dataIndex: 'scheduling',
    width: 240,
    customRender: ({ value }) => {
      const scheduling = JSON.parse(value);
      const result: any[] = [];

      if (Array.isArray(scheduling)) {
        if (scheduling.length > 1) {
          result.push(
            h(Row, {}, () => [
              h(Col, { span: 12 }, () => '时间'),
              h(Col, { span: 12 }, () => '安排'),
            ]),
          );
          scheduling.forEach((row) => {
            result.push(
              h(Row, {}, () => [
                h(Col, { span: 12 }, () => row.time),
                h(Col, { span: 12 }, () => row.arrangements),
              ]),
            );
          });
        }
      }

      if (result.length > 0) {
        return h('div', { class: 'travel_arrangements_scheduling' }, result);
      }

      return null;
    },
  },
  {
    title: '新增时间',
    dataIndex: 'created_at',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 80,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'date',
    label: '日期',
    component: 'DatePicker',
    colProps: { span: 4 },
  },
];
