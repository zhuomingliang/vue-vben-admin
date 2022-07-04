import { defHttp } from '/@/utils/http/axios';

export const getHomeDecorationExpo = (params: any) =>
  defHttp.get({ url: '/HomeDecorationExpo', params });
export const postHomeDecorationExpo = (params: any) =>
  defHttp.post({ url: '/HomeDecorationExpo', params });
export const putHomeDecorationExpo = (params: any) =>
  defHttp.put({ url: '/HomeDecorationExpo', params });
export const deleteHomeDecorationExpo = (id: any) =>
  defHttp.delete({ url: '/HomeDecorationExpo', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/HomeDecorationExpo/Status', params: { id, status } });

export const getCurrentHomeDecorationExpo = () =>
  defHttp.get({ url: '/HomeDecorationExpo/current' });
