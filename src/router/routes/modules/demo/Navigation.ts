import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const DataManagement: AppRouteModule = {
  path: '/NavigationManagement',
  name: 'NavigationManagement',
  component: LAYOUT,
  redirect: '/NavigationManagement/Navigation',
  meta: {
    orderNo: 2000,
    icon: 'ion:md-book',
    title: '导航栏管理',
  },
  children: [
    {
      path: 'Navigation',
      name: 'Navigation',
      meta: {
        title: '头部导航栏',
        ignoreKeepAlive: false,
        permission: 'Navigation',
      },
      component: () => import('/@/views/demo/NavigationManagement/Navigation/index.vue'),
    },
    {
      path: 'TailNavigation',
      name: 'TailNavigation',
      meta: {
        title: '尾部导航栏',
        ignoreKeepAlive: false,
        permission: 'TailNavigation',
      },
      component: () => import('/@/views/demo/NavigationManagement/TailNavigation/index.vue'),
    },
  ],
};

export default DataManagement;
