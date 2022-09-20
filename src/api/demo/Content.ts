import { defHttp } from '/@/utils/http/axios';

export const getNavList = (show_third: number) =>
  defHttp.get({ url: '/Navigation/NavList', params: { show_third } });
export const getContent = (params: any) => defHttp.get({ url: '/Content', params });
export const getSearch = (params: any) => defHttp.get({ url: '/Content/Search', params });
export const postContent = (params: any) => defHttp.post({ url: '/Content', params });
export const putContent = (params: any) => defHttp.put({ url: '/Content', params });
export const deleteContent = (id: any) => defHttp.delete({ url: '/Content', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Content/Status', params: { id, status } });

export const putHot = (id: number, hot: boolean) =>
  defHttp.put({ url: '/Content/Hot', params: { id, hot } });

export const putOrder = (params: any) => defHttp.put({ url: '/Content/Order', params });
