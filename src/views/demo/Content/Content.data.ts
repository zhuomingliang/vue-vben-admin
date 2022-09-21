import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { putStatus } from '/@/api/demo/Content';
import { uploadFile } from '/@/api/demo/Upload';
import { putHot } from '/@/api/demo/Content';

import { useMessage } from '/@/hooks/web/useMessage';
import {
  getMainMenu,
  getSubMenuByMainMenuId,
  getThirdMenuBySubMenuId,
} from '/@/api/demo/Navigation';

export const columns: BasicColumn[] = [
  // {
  //   title: '一级导航栏',
  //   dataIndex: 'main_menu',
  //   width: 80,
  // },
  // {
  //   title: '二级导航栏',
  //   dataIndex: 'sub_menu',
  //   width: 80,
  // },
  {
    title: '来源',
    dataIndex: 'from',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: '顺序',
    dataIndex: 'order',
    width: 80,
    edit: true,
  },
  {
    title: '点击量',
    dataIndex: 'views',
    width: 80,
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
    width: 40,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === true,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
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
    title: '热门',
    dataIndex: 'hot',
    width: 40,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.hot === true,
        checkedChildren: '是',
        unCheckedChildren: '否',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          putHot(record.id, newStatus)
            .then(() => {
              record.hot = newStatus;
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
    width: 80,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 80,
  },
];

export const searchFormSchema: FormSchema[] = [
  // {
  //   label: '一级导航栏',
  //   field: 'main_menu_id',
  //   component: 'ApiSelect',
  //   componentProps: ({ formModel }) => {
  //     return {
  //       api: getMainMenu,
  //       labelField: 'name',
  //       valueField: 'id',
  //       placeholder: '请选择',
  //       onChange: (e: any) => {
  //         if (e !== undefined) {
  //           formModel.sub_menu_id = undefined;
  //           formModel.main_menu_id = e;
  //         }
  //       },
  //     };
  //   },
  //   colProps: { span: 5 },
  // },
  // {
  //   field: 'sub_menu_id',
  //   label: '二级导航栏',
  //   component: 'ApiSelect',
  //   componentProps: ({ formModel }) => {
  //     return {
  //       api: getSubMenuByMainMenuId,
  //       params: { main_menu_id: formModel.main_menu_id },
  //       labelField: 'name',
  //       valueField: 'id',
  //       placeholder: '请选择',
  //     };
  //   },
  //   colProps: { span: 5 },
  // },
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: { span: 10 },
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
    componentProps: ({ formModel }) => {
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
    componentProps: ({ formActionType, formModel }) => {
      return {
        api: getSubMenuByMainMenuId,
        params: { main_menu_id: formModel.main_menu_id },
        labelField: 'name',
        valueField: 'id',
        placeholder: '请选择',
        onChange: (e: any) => {
          if (e !== undefined) {
            formModel.third_menu_id = undefined;
            formModel.sub_menu_id = e;
          }
          const { updateSchema } = formActionType;
          updateSchema({ field: 'third_menu_id', ifShow: true, show: false });
        },
      };
    },
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'third_menu_id',
    label: '三级导航栏',
    component: 'ApiSelect',
    componentProps: ({ schema, formModel }) => {
      return {
        api: getThirdMenuBySubMenuId,
        params: { sub_menu_id: formModel.sub_menu_id },
        labelField: 'name',
        valueField: 'id',
        placeholder: '请选择',
        onOptionsChange: (e: any) => {
          schema.ifShow = () => !!formModel.third_menu_id || !!e.length;
          schema.show = true;
        },
      };
    },
    colProps: { span: 12 },
    required: true,
  },
  {
    field: 'from',
    label: '来源',
    required: false,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'attachments',
    label: '附件',
    required: false,
    component: 'Upload',
    componentProps: {
      api: uploadFile,
      multiple: false,
      maxNumber: 6,
    },
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
