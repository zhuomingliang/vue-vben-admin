import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Row, Col } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '酒店名',
    dataIndex: 'hotel',
    width: 120,
  },
  {
    title: '楼层信息',
    dataIndex: 'storey_info',
    width: 120,
    customRender: ({ value }) => {
      const storey = JSON.parse(value);
      const result: any[] = [];

      if (Array.isArray(storey)) {
        if (storey.length > 1) {
          result.push(
            h(
              Row,
              {
                prefixCls: 'ant-row accommodation_arrangements_storey_info',
              },
              () => [
                h(Col, { span: 12 }, () => '房号首位数'),
                h(Col, { span: 12 }, () => '对应楼层'),
              ],
            ),
          );
          storey.forEach((row) => {
            result.push(
              h(
                Row,
                {
                  prefixCls: 'ant-row accommodation_arrangements_storey_info',
                },
                () => [
                  h(Col, { span: 12 }, () => row.first_number),
                  h(Col, { span: 12 }, () => row.storey_number),
                ],
              ),
            );
          });
        }
      }
      return result;
    },
  },
  {
    title: '联系人',
    dataIndex: 'contacts',
    width: 120,
  },
  {
    title: '联系人电话',
    dataIndex: 'contact_telephone',
    width: 120,
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
