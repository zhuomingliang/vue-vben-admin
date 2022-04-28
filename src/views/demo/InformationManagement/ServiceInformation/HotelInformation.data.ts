import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/HotelInformation';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '酒店名',
    dataIndex: 'hotel',
    width: 120,
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 120,
  },
  {
    title: '前台电话',
    dataIndex: 'telephone',
    width: 120,
  },
  {
    title: 'WIFI 密码',
    dataIndex: 'wifi_password',
    width: 120,
  },
  {
    title: '早餐时间地点',
    dataIndex: 'breakfast_information',
    width: 120,
  },
  {
    title: '宣传视频',
    dataIndex: 'video',
    width: 120,
  },
  {
    title: '总联络人',
    dataIndex: '',
    width: 120,
  },
  {
    title: '酒店负责人',
    dataIndex: '',
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
    field: 'hotel',
    label: '酒店名',
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
    field: 'hotel',
    label: '酒店名',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'telephone',
    label: '前台电话',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'wifi_password',
    label: 'WIFI 密码',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'breakfast_information',
    label: '早餐时间地点',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'video',
    label: '宣传视频',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'liaison',
    label: '总联络人',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
    componentProps: { placeholder: '姓名' },
  },
  {
    field: 'liaison_phone',
    label: '',
    required: true,
    component: 'Input',
    colProps: { span: 8 },
    componentProps: { placeholder: '联系电话' },
  },
  {
    field: 'director',
    label: '酒店负责人',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
    componentProps: { placeholder: '姓名' },
  },
  {
    field: 'director_phone',
    label: '',
    required: true,
    component: 'Input',
    colProps: { span: 8 },
    componentProps: { placeholder: '联系电话' },
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
