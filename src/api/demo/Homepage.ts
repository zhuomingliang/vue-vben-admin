import { defHttp } from '/@/utils/http/axios';

export const getHomepage = (params: any) => defHttp.get({ url: '/Homepage', params });
export const postHomepage = (params: any) => defHttp.post({ url: '/Homepage', params });
export const putHomepage = (params: any) => defHttp.put({ url: '/Homepage', params });
export const deleteHomepage = (id: any) => defHttp.delete({ url: '/Homepage', params: { id } });
export const putOrder = (params: any) => defHttp.put({ url: '/Homepage/Order', params });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Homepage/Status', params: { id, status } });
