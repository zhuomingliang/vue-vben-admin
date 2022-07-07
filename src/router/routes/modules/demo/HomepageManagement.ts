import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const DataManagement: AppRouteModule = {
  path: '/HomepageManagement',
  name: 'HomepageManagement',
  component: LAYOUT,
  redirect: '/HomepageManagement/Homepage',
  meta: {
    orderNo: 2000,
    icon: 'ion:md-book',
    title: '首页管理',
  },
  children: [
    {
      path: 'Homepage',
      name: 'Homepage',
      meta: {
        title: '内容列表',
        ignoreKeepAlive: false,
        permission: '',
      },
      component: () => import('/@/views/demo/HomepageManagement/Homepage/index.vue'),
    },
  ],
};

export default DataManagement;
