import { defHttp } from '/@/utils/http/axios';

export const getAdvertisingVideo = (params: any) =>
  defHttp.get({ url: '/AdvertisingVideo', params });
export const postAdvertisingVideo = (params: any) =>
  defHttp.post({ url: '/AdvertisingVideo', params });
export const putAdvertisingVideo = (params: any) =>
  defHttp.put({ url: '/AdvertisingVideo', params });
export const deleteAdvertisingVideo = (id: any) =>
  defHttp.delete({ url: '/AdvertisingVideo', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/AdvertisingVideo/Status', params: { id, status } });
