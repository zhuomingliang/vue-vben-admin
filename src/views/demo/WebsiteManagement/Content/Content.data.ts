import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/HomeDecorationExpo';
import { useMessage } from '/@/hooks/web/useMessage';
import { getMainMenu, getSubMenuByMainMenuId } from '/@/api/demo/Navigation';

export const columns: BasicColumn[] = [
  {
    title: '一级导航栏',
    dataIndex: 'main_menu',
    width: 120,
  },
  {
    title: '二级导航栏',
    dataIndex: 'sub_menu',
    width: 120,
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 120,
  },
  // {
  //   title: '内容',
  //   dataIndex: 'content3',
  //   width: 240,
  //   customRender: ({ value }) => {
  //     return h('div', {
  //       innerHTML: value,
  //     });
  //   },
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
              //record.status = newStatus;
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
    label: '一级导航栏',
    field: 'main_menu_id',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getMainMenu,
        labelField: 'name',
        valueField: 'id',
        placeholder: '请选择',
        onChange: (e: any) => {
          if (e !== undefined) {
            formModel.sub_menu_id = undefined;
            formModel.main_menu_id = e;
          }
        },
      };
    },
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'sub_menu_id',
    label: '二级导航栏',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: getSubMenuByMainMenuId,
        params: { main_menu_id: formModel.main_menu_id },
        labelField: 'name',
        valueField: 'id',
        placeholder: '请选择',
      };
    },
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'content',
    label: '内容',
    required: false,
    component: 'Tinymce',
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
