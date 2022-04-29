import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/MedicalSecurity';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 120,
  },
  {
    title: '保障医师',
    dataIndex: 'doctor',
    width: 120,
    customRender: ({ record }) => {
      return h('', {}, `${record.doctor} / ${record.doctor_phone}`);
    },
  },
  {
    title: '保障医师地址',
    dataIndex: 'doctor_address',
    width: 120,
  },
  {
    title: '保障护士',
    dataIndex: 'nurse',
    width: 120,
    customRender: ({ record }) => {
      return h('', {}, `${record.nurse} / ${record.nurse_phone}`);
    },
  },
  {
    title: '保障护士地址',
    dataIndex: 'nurse_address',
    width: 120,
  },
  {
    title: '核酸检测地址',
    dataIndex: 'nucleic_acid_testing_address',
    width: 120,
  },
  {
    title: '留观隔离地址',
    dataIndex: 'isolation_address',
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
    required: true,
  },
  {
    field: 'doctor',
    label: '保障医生',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
    componentProps: { placeholder: '姓名' },
  },
  {
    field: 'doctor_phone',
    label: '',
    required: false,
    component: 'Input',
    colProps: { span: 8 },
    componentProps: { placeholder: '联系电话' },
  },
  {
    field: 'doctor_address',
    label: '保障医生地址',
    required: false,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'nurse',
    label: '保障护士',
    required: false,
    component: 'Input',
    colProps: { span: 12 },
    componentProps: { placeholder: '姓名' },
  },
  {
    field: 'nurse_phone',
    label: '',
    required: false,
    component: 'Input',
    colProps: { span: 8 },
    componentProps: { placeholder: '联系电话' },
  },
  {
    field: 'nurse_address',
    label: '保障护士地址',
    required: false,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'nucleic_acid_testing_address',
    label: '核酸检测地址',
    required: false,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'isolation_address',
    label: '留观隔离地址',
    required: false,
    component: 'Input',
    colProps: { span: 20 },
  },
];
