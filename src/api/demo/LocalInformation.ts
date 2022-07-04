import { defHttp } from '/@/utils/http/axios';

export const getLocalInformation = (params: any) =>
  defHttp.get({ url: '/LocalInformation', params });
export const postLocalInformation = (params: any) =>
  defHttp.post({ url: '/LocalInformation', params });
export const putLocalInformation = (params: any) =>
  defHttp.put({ url: '/LocalInformation', params });
export const deleteLocalInformation = (id: any) =>
  defHttp.delete({ url: '/LocalInformation', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/LocalInformation/Status', params: { id, status } });
