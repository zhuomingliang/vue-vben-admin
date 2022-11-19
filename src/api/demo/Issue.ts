import { defHttp } from '/@/utils/http/axios';

export const getIssue = (params: any) => defHttp.get({ url: '/Issue', params });
export const postIssue = (params: any) => defHttp.post({ url: '/Issue', params });
export const putIssue = (params: any) => defHttp.put({ url: '/Issue', params });
export const deleteIssue = (id: any) => defHttp.delete({ url: '/Issue', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Issue/Status', params: { id, status } });

export const getCurrentIssue = () => defHttp.get({ url: '/Issue/current' });
