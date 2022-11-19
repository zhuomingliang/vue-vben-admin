import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

export const getProject = (params: any) => defHttp.get({ url: '/Project', params });
export const postProject = (params: any) => defHttp.post({ url: '/Project', params });
export const putProject = (params: any) => defHttp.put({ url: '/Project', params });
export const deleteProject = (id: any) => defHttp.delete({ url: '/Project', params: { id } });

export const postImportProject = (params: UploadFileParams) =>
  defHttp.uploadFile({ url: '/Project/Import' }, params);
