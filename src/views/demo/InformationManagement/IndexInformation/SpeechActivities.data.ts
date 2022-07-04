import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/SpeechActivities';
import { useMessage } from '/@/hooks/web/useMessage';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 120,
  },
  {
    title: '时间',
    dataIndex: 'time',
    width: 120,
    customRender: ({ record }) => {
      return h(
        'span',
        {},
        `${dayjs(record.start_time, 'HH:mm').format('HH:mm')} ~ ${dayjs(
          record.end_time,
          'HH:mm',
        ).format('HH:mm')}`,
      );
    },
  },
  {
    title: '主题',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '地点',
    dataIndex: 'place',
    width: 120,
  },
  // {
  //   title: '主持人',
  //   dataIndex: 'host',
  //   width: 120,
  // },
  // {
  //   title: '嘉宾',
  //   dataIndex: 'guest',
  //   width: 120,
  // },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === true,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          putStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改状态`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
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
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'date',
    label: '日期',
    component: 'DatePicker',
    colProps: { span: 4 },
  },
  {
    field: 'title',
    label: '主题',
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
    field: 'date',
    label: '日期',
    component: 'DatePicker',
    required: true,
  },
  {
    field: 'time',
    label: '时间',
    required: true,
    component: 'TimeRangePicker',
    componentProps: { format: 'HH:mm', placeholder: ['开始时间', '结束时间'] },
  },
  {
    field: 'title',
    label: '主题',
    required: true,
    component: 'Input',
  },
  {
    field: 'place',
    label: '地点',
    required: false,
    component: 'Input',
  },
  {
    field: 'host',
    label: '主持人',
    required: false,
    component: 'Input',
  },
  {
    field: 'guest',
    label: '嘉宾',
    required: false,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
  },
];
