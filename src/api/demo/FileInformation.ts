import { defHttp } from '/@/utils/http/axios';

export const getFileInformation = (params: any) => defHttp.get({ url: '/FileInformation', params });
export const postFileInformation = (params: any) =>
  defHttp.post({ url: '/FileInformation', params });
export const putFileInformation = (params: any) => defHttp.put({ url: '/FileInformation', params });
export const deleteFileInformation = (id: any) =>
  defHttp.delete({ url: '/FileInformation', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/FileInformation/Status', params: { id, status } });
