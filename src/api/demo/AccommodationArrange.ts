import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

export const getAccommodationArrange = (params: any) =>
  defHttp.get({ url: '/AccommodationArrange', params });
export const postAccommodationArrange = (params: any) =>
  defHttp.post({ url: '/AccommodationArrange', params });
export const putAccommodationArrange = (params: any) =>
  defHttp.put({ url: '/AccommodationArrange', params });
export const deleteAccommodationArrange = (id: any) =>
  defHttp.delete({ url: '/AccommodationArrange', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/AccommodationArrange/Status', params: { id, status } });

export const postImportAccommodationArrange = (params: UploadFileParams) =>
  defHttp.uploadFile({ url: '/AccommodationArrange/Import', timeout: 0 }, params);
