import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const DataManagement: AppRouteModule = {
  path: '/FriendshiplinkManagement',
  name: 'FriendshiplinkManagement',
  component: LAYOUT,
  redirect: '/FriendshiplinkManagement/Classification',
  meta: {
    orderNo: 2000,
    icon: 'ion:link',
    title: '友情链接管理',
  },
  children: [
    {
      path: 'Classification ',
      name: 'Classification',
      meta: {
        title: '分类管理',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/FriendshiplinkManagement/Classification/index.vue'),
    },
    {
      path: 'Listlink',
      name: 'Listlink',
      meta: {
        title: '友情链接列表',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/FriendshiplinkManagement/Listlink/index.vue'),
    },
  ],
};

export default DataManagement;
