import { defHttp } from '/@/utils/http/axios';

export const getMedicalSecurity = (params: any) => defHttp.get({ url: '/MedicalSecurity', params });
export const postMedicalSecurity = (params: any) =>
  defHttp.post({ url: '/MedicalSecurity', params });
export const putMedicalSecurity = (params: any) => defHttp.put({ url: '/MedicalSecurity', params });
export const deleteMedicalSecurity = (id: any) =>
  defHttp.delete({ url: '/MedicalSecurity', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/MedicalSecurity/Status', params: { id, status } });
