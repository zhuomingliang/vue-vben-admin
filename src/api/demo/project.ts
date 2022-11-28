import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

export const getProject = (params: any) => defHttp.get({ url: '/Project', params });
export const getProjectScore = (params?: any) => defHttp.get({ url: '/ProjectScore', params });
export const getProjectScoreRank = (params?: any) =>
  defHttp.get({ url: '/ProjectScore/Rank', params });
export const getAreaScoreRank = (params?: any) =>
  defHttp.get({ url: '/ProjectScore/AreaScoreRank', params });

export const getProjectScoreByGuest = (params?: any) =>
  defHttp.get({ url: '/ProjectScore/ByGuest', params });
export const getGuestScoreByProject = (params?: any) =>
  defHttp.get({ url: '/ProjectScore/ByProject', params });
export const getAreaScore = (params?: any) =>
  defHttp.get({ url: '/ProjectScore/AreaScore', params });

export const getProjectScoreDetail = (params: any) =>
  defHttp.get({ url: '/ProjectScore/Detail', params });

export const postProject = (params: any) => defHttp.post({ url: '/Project', params });
export const putProject = (params: any) => defHttp.put({ url: '/Project', params });
export const deleteProject = (id: any) => defHttp.delete({ url: '/Project', params: { id } });

export const postImportProject = (params: UploadFileParams) =>
  defHttp.uploadFile({ url: '/Project/Import' }, params);
