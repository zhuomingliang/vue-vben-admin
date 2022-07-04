import { defHttp } from '/@/utils/http/axios';

export const getTrafficInformation = (params: any) =>
  defHttp.get({ url: '/TrafficInformation', params });
export const postTrafficInformation = (params: any) =>
  defHttp.post({ url: '/TrafficInformation', params });
export const putTrafficInformation = (params: any) =>
  defHttp.put({ url: '/TrafficInformation', params });
export const deleteTrafficInformation = (id: any) =>
  defHttp.delete({ url: '/TrafficInformation', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/TrafficInformation/Status', params: { id, status } });
