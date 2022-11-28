import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
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
];
