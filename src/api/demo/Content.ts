import { defHttp } from '/@/utils/http/axios';

export const getContent = (params: any) => defHttp.get({ url: '/Content', params });
export const postContent = (params: any) => defHttp.post({ url: '/Content', params });
export const putContent = (params: any) => defHttp.put({ url: '/Content', params });
export const deleteContent = (id: any) => defHttp.delete({ url: '/Content', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Content/Status', params: { id, status } });
