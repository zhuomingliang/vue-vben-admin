import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

export const getGuest = (params: any) => defHttp.get({ url: '/GuestInformation', params });
export const postGuest = (params: any) => defHttp.post({ url: '/GuestInformation', params });
export const postSms = (params: any) => defHttp.post({ url: '/Sms', params });

export const putGuest = (params: any) => defHttp.put({ url: '/GuestInformation', params });
export const deleteGuest = (id: any) =>
  defHttp.delete({ url: '/GuestInformation', params: { id } });
export const getAllGuest = (params?: any) => defHttp.get({ url: '/GuestInformation/all', params });

export const postImportGuest = (params: UploadFileParams) =>
  defHttp.uploadFile({ url: '/GuestInformation/Import' }, params);
