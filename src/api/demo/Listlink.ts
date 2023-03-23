import { defHttp } from '/@/utils/http/axios';
export const getClassification = (show_third: number) =>
  defHttp.get({ url: '/LinksCate/LinksCateList', params: { show_third } });

export const getListlink = (params: any) => defHttp.get({ url: '/Links', params });
export const postListlink = (params: any) => defHttp.post({ url: '/Links', params });
export const putListlink = (params: any) => defHttp.put({ url: '/Links', params });
export const deleteListlink = (id: any) => defHttp.delete({ url: '/Links', params: { id } });

export const putOrder = (params: any) => defHttp.put({ url: '/Links/Order', params });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Links/Status', params: { id, status } });
