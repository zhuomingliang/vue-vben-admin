import { defHttp } from '/@/utils/http/axios';

export const getGuest = (params: any) => defHttp.get({ url: '/GuestInformation', params });
export const postGuest = (params: any) => defHttp.post({ url: '/GuestInformation', params });
export const putGuest = (params: any) => defHttp.put({ url: '/GuestInformation', params });
export const deleteGuest = (id: any) =>
  defHttp.delete({ url: '/GuestInformation', params: { id } });
