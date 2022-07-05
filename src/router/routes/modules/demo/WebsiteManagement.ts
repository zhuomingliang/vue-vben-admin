import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const DataManagement: AppRouteModule = {
  path: '/WebsiteManagement',
  name: 'WebsiteManagement',
  component: LAYOUT,
  redirect: '/WebsiteManagement/Navigation',
  meta: {
    orderNo: 2000,
    icon: 'ion:md-book',
    title: '网站管理',
  },
  children: [
    {
      path: 'Navigation',
      name: 'Navigation',
      meta: {
        title: '嘉宾信息',
        ignoreKeepAlive: false,
        permission: 'Navigation',
      },
      component: () => import('/@/views/demo/WebsiteManagement/Navigation/index.vue'),
    },
  ],
};

export default DataManagement;
