import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getClassification } from '/@/api/demo/Listlink';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/Listlink';
import { useMessage } from '/@/hooks/web/useMessage';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '排序',
    dataIndex: 'order',
    width: 60,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
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
              createMessage.success(`修改状态成功`);
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
export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: '分类',
    field: 'cate_id',
    component: 'ApiSelect',
    componentProps: {
      api: getClassification,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'link',
    label: '链接',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },

  {
    field: 'order',
    label: '排序',
    required: true,
    component: 'InputNumber',
    defaultValue: 1,
    colProps: { span: 15 },
  },

  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
  },
];
