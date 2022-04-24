import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/DiningArrangements';
import { useMessage } from '/@/hooks/web/useMessage';
import { uploadImage } from '/@/api/demo/Upload';

export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 120,
  },
  {
    title: '早餐地点',
    dataIndex: 'breakfast_place',
    width: 120,
  },
  {
    title: '早餐桌次安排图',
    dataIndex: 'breakfast_picture',
    width: 120,
  },
  {
    title: '午餐地点',
    dataIndex: 'lunch_place',
    width: 120,
  },
  {
    title: '午餐桌次安排图',
    dataIndex: 'lunch_picture',
    width: 120,
  },
  {
    title: '晚餐地点',
    dataIndex: 'dinner_place',
    width: 120,
  },
  {
    title: '晚餐桌次安排图',
    dataIndex: 'dinner_picture',
    width: 120,
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
  },
  {
    field: 'breakfast_place',
    label: '早餐地点',
    required: true,
    component: 'Input',
  },
  {
    field: 'breakfast_picture',
    label: '早餐桌次安排图',
    required: true,
    component: 'Upload',
    componentProps: {
      api: uploadImage,
      multiple: false,
      accept: ['.jpg', '.png', '.jpeg'],
      maxNumber: 1,
    },
  },
  {
    field: 'lunch_place',
    label: '午餐地点',
    required: true,
    component: 'Input',
  },
  {
    field: 'lunch_picture',
    label: '午餐桌次安排图',
    required: true,
    component: 'Upload',
    componentProps: {
      api: uploadImage,
      multiple: false,
      accept: ['.jpg', '.png', '.jpeg'],
      maxNumber: 1,
    },
  },
  {
    field: 'dinner_place',
    label: '晚餐地点',
    required: true,
    component: 'Input',
  },
  {
    field: 'dinner_picture',
    label: '晚餐桌次安排图',
    required: true,
    component: 'Upload',
    componentProps: {
      api: uploadImage,
      multiple: false,
      accept: ['.jpg', '.png', '.jpeg'],
      maxNumber: 1,
    },
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
