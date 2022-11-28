import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const DataManagement: AppRouteModule = {
  path: '/DataManagement',
  name: 'DataManagement',
  component: LAYOUT,
  redirect: '/DataManagement/GuestInformation',
  meta: {
    orderNo: 2000,
    icon: 'ion:md-contact',
    title: '数据管理',
  },
  children: [
    {
      path: 'GuestInformation',
      name: 'GuestInformation',
      meta: {
        title: '用户管理',
        ignoreKeepAlive: false,
        permission: 'GuestInformation',
      },
      component: () => import('/@/views/demo/DataManagement/GuestInformation/index.vue'),
    },
    {
      path: 'Project',
      name: 'Project',
      meta: {
        title: '项目管理',
        ignoreKeepAlive: false,
        permission: 'Project',
      },
      component: () => import('/@/views/demo/DataManagement/Project/index.vue'),
    },
    {
      path: 'ProjectScore',
      name: 'ProjectScore',
      meta: {
        title: '项目评分汇总',
        ignoreKeepAlive: false,
        permission: 'ProjectScore/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/ProjectScore/index.vue'),
    },
    {
      path: 'ProjectScoreRank',
      name: 'ProjectScoreRank',
      meta: {
        title: '项目评分排行',
        ignoreKeepAlive: false,
        permission: 'ProjectScore/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/ProjectScoreRank/index.vue'),
    },
    {
      path: 'AreaScoreRank',
      name: 'AreaScoreRank',
      meta: {
        title: '区域评分排行',
        ignoreKeepAlive: false,
        permission: 'ProjectScore/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/AreaScoreRank/index.vue'),
    },
    {
      path: 'ProjectScoreCharts',
      name: 'ProjectScoreCharts',
      meta: {
        title: '项目评分图表',
        ignoreKeepAlive: false,
        permission: 'ProjectScore/getIndex',
      },
      component: () => import('/@/views/demo/DataManagement/ProjectScore/Charts.vue'),
    },
  ],
};

export default DataManagement;
