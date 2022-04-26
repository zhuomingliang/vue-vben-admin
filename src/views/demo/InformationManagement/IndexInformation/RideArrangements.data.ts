import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/RideArrangements';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '车次',
    dataIndex: 'auto_no',
    width: 120,
  },
  {
    title: '车牌号码',
    dataIndex: 'license_plate_number',
    width: 120,
  },
  {
    title: '司机',
    dataIndex: 'driver',
    width: 120,
  },
  {
    title: '司机电话号码',
    dataIndex: 'driver_phone',
    width: 120,
  },
  {
    title: '讲解员',
    dataIndex: 'commentator',
    width: 120,
  },
  {
    title: '讲解员电话号码',
    dataIndex: 'commentator_phone',
    width: 120,
  },
  {
    title: '服务员',
    dataIndex: 'attendants',
    width: 120,
  },
  {
    title: '服务员电话号码',
    dataIndex: 'attendants_phone',
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
    field: 'auto_no',
    label: '车次',
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
    field: 'auto_no',
    label: '车次',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'license_plate_number',
    label: '车牌号',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'driver',
    label: '司机',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
    componentProps: { placeholder: '姓名' },
  },
  {
    field: 'driver_phone',
    label: '',
    required: false,
    component: 'Input',
    colProps: { span: 8 },
    componentProps: { placeholder: '联系电话' },
  },
  {
    field: 'commentator',
    label: '讲解员',
    required: false,
    component: 'Input',
    colProps: { span: 12 },
    componentProps: { placeholder: '姓名' },
  },
  {
    field: 'commentator_phone',
    label: '',
    required: false,
    component: 'Input',
    colProps: { span: 8 },
    componentProps: { placeholder: '联系电话' },
  },
  {
    field: 'attendants',
    label: '服务员',
    required: false,
    component: 'Input',
    colProps: { span: 12 },
    componentProps: { placeholder: '姓名' },
  },
  {
    field: 'attendants_phone',
    label: '',
    required: false,
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
