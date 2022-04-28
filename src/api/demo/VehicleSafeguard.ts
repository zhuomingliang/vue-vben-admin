import { defHttp } from '/@/utils/http/axios';

export const getVehicleSafeguard = (params: any) =>
  defHttp.get({ url: '/VehicleSafeguard', params });
export const postVehicleSafeguard = (params: any) =>
  defHttp.post({ url: '/VehicleSafeguard', params });
export const putVehicleSafeguard = (params: any) =>
  defHttp.put({ url: '/VehicleSafeguard', params });
export const deleteVehicleSafeguard = (id: any) =>
  defHttp.delete({ url: '/VehicleSafeguard', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/VehicleSafeguard/Status', params: { id, status } });
