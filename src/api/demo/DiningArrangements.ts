import { defHttp } from '/@/utils/http/axios';

export const getGuest = (params: any) => defHttp.get({ url: '/DiningArrangements', params });
export const postGuest = (params: any) => defHttp.post({ url: '/DiningArrangements', params });
export const putGuest = (params: any) => defHttp.put({ url: '/DiningArrangements', params });
export const deleteGuest = (id: any) =>
  defHttp.delete({ url: '/DiningArrangements', params: { id } });
