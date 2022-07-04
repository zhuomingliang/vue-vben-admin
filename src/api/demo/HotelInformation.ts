import { defHttp } from '/@/utils/http/axios';

export const getHotelInformation = (params: any) =>
  defHttp.get({ url: '/HotelInformation', params });
export const postHotelInformation = (params: any) =>
  defHttp.post({ url: '/HotelInformation', params });
export const putHotelInformation = (params: any) =>
  defHttp.put({ url: '/HotelInformation', params });
export const deleteHotelInformation = (id: any) =>
  defHttp.delete({ url: '/HotelInformation', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/HotelInformation/Status', params: { id, status } });

export const getAllHotels = (params: any) =>
  defHttp.get({ url: '/HotelInformation/AllHotels', params });
