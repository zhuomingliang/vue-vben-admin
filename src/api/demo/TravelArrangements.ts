import { defHttp } from '/@/utils/http/axios';

export const getTravelArrangements = (params: any) =>
  defHttp.get({ url: '/TravelArrangements', params });
export const postTravelArrangements = (params: any) =>
  defHttp.post({ url: '/TravelArrangements', params });
export const putTravelArrangements = (params: any) =>
  defHttp.put({ url: '/TravelArrangements', params });
export const deleteTravelArrangements = (id: any) =>
  defHttp.delete({ url: '/TravelArrangements', params: { id } });
