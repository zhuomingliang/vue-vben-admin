import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/VehicleSafeguard';
import { useMessage } from '/@/hooks/web/useMessage';
import { getAllHotels } from '/@/api/demo/HotelInformation';

export const columns: BasicColumn[] = [
  {
    title: '酒店',
    dataIndex: 'hotel',
    width: 120,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
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
    label: '酒店',
    field: 'hotel_information_id',
    component: 'ApiSelect',
    componentProps: {
      api: getAllHotels,
      labelField: 'hotel',
      valueField: 'id',
    },
    colProps: { span: 5 },
  },
  {
    field: 'name',
    label: '姓名',
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
    label: '酒店',
    field: 'hotel_information_id',
    component: 'ApiSelect',
    componentProps: {
      api: getAllHotels,
      labelField: 'hotel',
      valueField: 'id',
    },
    colProps: { span: 16 },
    required: true,
  },
  {
    field: 'name',
    label: '姓名',
    required: true,
    component: 'Input',
    colProps: { span: 16 },
  },
  {
    field: 'phone',
    label: '联系方式',
    required: true,
    component: 'Input',
    colProps: { span: 16 },
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
