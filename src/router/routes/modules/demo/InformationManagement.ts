import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const InformationManagement: AppRouteModule = {
  path: '/InformationManagement',
  name: 'InformationManagement',
  component: LAYOUT,
  redirect: '/InformationManagement/IndexInformation',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: '信息管理',
  },
  children: [
    {
      path: 'IndexInformation',
      name: 'IndexInformation',
      meta: {
        title: '首页信息',
        ignoreKeepAlive: false,
        permission: 'IndexInformation/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/IndexInformation/index.vue'),
    },
    {
      path: 'LocalInformation',
      name: 'LocalInformation',
      meta: {
        title: '本地信息',
        ignoreKeepAlive: false,
        permission: 'LocalInformation/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/LocalInformation/index.vue'),
    },
    {
      path: 'HomeDecorationExpo',
      name: 'HomeDecorationExpo',
      meta: {
        title: '展会信息',
        ignoreKeepAlive: false,
        permission: 'HomeDecorationExpo/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/HomeDecorationExpo/index.vue'),
    },
    {
      path: 'FileInformation',
      name: 'FileInformation',
      meta: {
        title: '文件信息',
        ignoreKeepAlive: false,
        permission: 'FileInformation/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/FileInformation/index.vue'),
    },
    {
      path: 'ServiceInformation',
      name: 'ServiceInformation',
      meta: {
        title: '服务指南',
        ignoreKeepAlive: false,
        permission: 'ServiceInformation/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/ServiceInformation/index.vue'),
    },
  ],
};

export default InformationManagement;
