import { defHttp } from '/@/utils/http/axios';

export const getAccommodationArrangements = (params: any) =>
  defHttp.get({ url: '/AccommodationArrangements', params });
export const postAccommodationArrangements = (params: any) =>
  defHttp.post({ url: '/AccommodationArrangements', params });
export const putAccommodationArrangements = (params: any) =>
  defHttp.put({ url: '/AccommodationArrangements', params });
export const deleteAccommodationArrangements = (id: any) =>
  defHttp.delete({ url: '/AccommodationArrangements', params: { id } });
