import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/FileInformation';
import { useMessage } from '/@/hooks/web/useMessage';
import { uploadFile } from '/@/api/demo/Upload';

export const columns: BasicColumn[] = [
  {
    title: '文件名',
    dataIndex: 'file_name',
    width: 120,
  },
  {
    title: '文件路径',
    dataIndex: 'file_path',
    width: 240,
    customRender: ({ value }) => {
      return h('a', { href: value, target: '_blank' }, value);
    },
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
    field: 'file_name',
    label: '文件名',
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
    field: 'file_name',
    label: '文件名',
    required: true,
    component: 'Input',
  },
  {
    field: 'file_path',
    label: '文件路径',
    required: true,
    component: 'Upload',
    componentProps: {
      api: uploadFile,
      multiple: false,
      maxNumber: 1,
    },
    colProps: { span: 20 },
  },
];
