import { defHttp } from '/@/utils/http/axios';

export const getRideArrangements = (params: any) =>
  defHttp.get({ url: '/RideArrangements', params });
export const postRideArrangements = (params: any) =>
  defHttp.post({ url: '/RideArrangements', params });
export const putRideArrangements = (params: any) =>
  defHttp.put({ url: '/RideArrangements', params });
export const deleteRideArrangements = (id: any) =>
  defHttp.delete({ url: '/RideArrangements', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/RideArrangements/Status', params: { id, status } });
