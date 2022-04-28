import { defHttp } from '/@/utils/http/axios';

export const getEpidemicPreventionInstructions = (params: any) =>
  defHttp.get({ url: '/EpidemicPreventionInstructions', params });
export const postEpidemicPreventionInstructions = (params: any) =>
  defHttp.post({ url: '/EpidemicPreventionInstructions', params });
export const putEpidemicPreventionInstructions = (params: any) =>
  defHttp.put({ url: '/EpidemicPreventionInstructions', params });
export const deleteEpidemicPreventionInstructions = (id: any) =>
  defHttp.delete({ url: '/EpidemicPreventionInstructions', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/EpidemicPreventionInstructions/Status', params: { id, status } });
