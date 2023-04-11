import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const DataManagement: AppRouteModule = {
  path: '/ContentManagement',
  name: 'ContentManagement',
  component: LAYOUT,
  redirect: '/ContentManagement/Content',
  meta: {
    icon: 'ion:md-book',
    title: '内容管理',
    orderNo: 5000,
  },
  children: [
    {
      path: 'Content',
      name: 'Content',
      meta: {
        title: '内容列表',
        ignoreKeepAlive: false,
        permission: 'Content',
      },
      component: () => import('/@/views/demo/Content/index.vue'),
    },
  ],
};

export default DataManagement;
