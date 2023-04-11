import { defHttp } from '/@/utils/http/axios';

export const getClassification = (params: any) => defHttp.get({ url: '/LinksCate', params });
export const postClassification = (params: any) => defHttp.post({ url: '/LinksCate', params });
export const putClassification = (params: any) => defHttp.put({ url: '/LinksCate', params });
export const deleteClassification = (id: any) =>
  defHttp.delete({ url: '/LinksCate', params: { id } });

export const putOrder = (params: any) => defHttp.put({ url: '/LinksCate/Order', params });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/LinksCate/Status', params: { id, status } });
