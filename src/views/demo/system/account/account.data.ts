import { h, VNode } from 'vue';
import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 180,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 180,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 180,
    customRender: ({ record }) => {
      const tags: VNode[] = [];
      if (record.role !== null) {
        record.role.split(',').forEach((role: string) => {
          tags.push(h(Tag, { color: 'blue' }, () => role));
        });
      }
      return tags;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    colProps: { span: 20 },
    dynamicRules: ({ model }) => {
      return [
        {
          required: true,
          message: '请输入用户名',
        },
        {
          validator() {
            return new Promise((resolve, reject) => {
              isAccountExist(model.id, model.username)
                .then(() => resolve())
                .catch((err) => {
                  reject(err.message || '验证失败');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
    colProps: { span: 20 },
  },
  {
    label: '角色',
    field: 'role_id',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'name',
      valueField: 'id',
      mode: 'multiple',
    },
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: false,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: false,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
