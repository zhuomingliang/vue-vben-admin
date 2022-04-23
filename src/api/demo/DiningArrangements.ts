import { defHttp } from '/@/utils/http/axios';

export const getDiningArrangements = (params: any) =>
  defHttp.get({ url: '/DiningArrangements', params });
export const postDiningArrangements = (params: any) =>
  defHttp.post({ url: '/DiningArrangements', params });
export const putDiningArrangements = (params: any) =>
  defHttp.put({ url: '/DiningArrangements', params });
export const deleteDiningArrangements = (id: any) =>
  defHttp.delete({ url: '/DiningArrangements', params: { id } });
