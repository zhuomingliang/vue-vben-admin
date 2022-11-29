import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Row, Col } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 80,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '评分人',
    dataIndex: 'full_name',
    width: 80,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
  },
  {
    title: '项目得分',
    dataIndex: 'project_score',
    width: 320,
    customRender: ({ value }) => {
      if (value === undefined || value === null) return null;
      const project_score = JSON.parse(value);
      const result: any[] = [];
      if (Array.isArray(project_score)) {
        if (project_score.length > 0) {
          // result.push(
          //   h(Row, {}, () => [
          //     h(Col, { span: 12 }, () => '项目'),
          //     h(Col, { span: 12 }, () => '得分'),
          //   ]),
          // );
          project_score.forEach((row) => {
            result.push(
              h(Row, { align: 'middle' }, () => [
                h(Col, { span: 12 }, () => row.project),
                h(Col, { span: 12 }, () => row.score),
              ]),
            );
          });
        }
      }

      if (result.length > 0) {
        return h('div', { class: 'project_info' }, result);
      }

      return null;
    },
  },
  {
    title: '平均得分',
    dataIndex: 'avg_score',
    width: 80,
    customCell: (data) => {
      return { rowSpan: data['rowspan'] };
    },
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
