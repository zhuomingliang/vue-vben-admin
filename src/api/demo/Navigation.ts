import { defHttp } from '/@/utils/http/axios';

export const getNavigation = (params: any) => defHttp.get({ url: '/Navigation', params });
export const postNavigation = (params: any) => defHttp.post({ url: '/Navigation', params });
export const putNavigation = (params: any) => defHttp.put({ url: '/Navigation', params });
export const putMainOrder = (params: any) => defHttp.put({ url: '/Navigation/MainOrder', params });
export const putSubOrder = (params: any) => defHttp.put({ url: '/Navigation/SubOrder', params });
export const deleteNavigation = (id: any) => defHttp.delete({ url: '/Navigation', params: { id } });
