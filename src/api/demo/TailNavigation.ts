import { defHttp } from '/@/utils/http/axios';

export const getTailNavigation = (params: any) => defHttp.get({ url: '/TailNavigation', params });
export const postTailNavigation = (params: any) => defHttp.post({ url: '/TailNavigation', params });
export const putTailNavigation = (params: any) => defHttp.put({ url: '/TailNavigation', params });
export const deleteTailNavigation = (id: any) =>
  defHttp.delete({ url: '/TailNavigation', params: { id } });

export const putOrder = (params: any) => defHttp.put({ url: '/TailNavigation/Order', params });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/TailNavigation/Status', params: { id, status } });
