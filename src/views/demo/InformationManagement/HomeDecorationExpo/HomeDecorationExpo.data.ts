import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/HomeDecorationExpo';
import { useMessage } from '/@/hooks/web/useMessage';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '时间',
    dataIndex: 'daterange',
    width: 100,
    customRender: ({ value }) => {
      let result = value;
      if (typeof value === 'string') result = value.replace(/^\[(.*)\)$/, '$1').split(',');
      return h(
        'span',
        {},
        `${dayjs(result[0]).format('YYYY-MM-DD')} ~ ${dayjs(result[1])
          .subtract(1, 'day')
          .format('YYYY-MM-DD')}`,
      );
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '简介',
    dataIndex: 'description',
    width: 240,
  },
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
    width: 100,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: { span: 4 },
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
    field: 'daterange',
    label: '时间',
    required: true,
    component: 'RangePicker',
  },
  {
    field: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'description',
    label: '简介',
    required: false,
    component: 'InputTextArea',
    colProps: { span: 20 },
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
