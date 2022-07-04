import { defHttp } from '/@/utils/http/axios';

export const getSpeechActivities = (params: any) =>
  defHttp.get({ url: '/SpeechActivities', params });
export const postSpeechActivities = (params: any) =>
  defHttp.post({ url: '/SpeechActivities', params });
export const putSpeechActivities = (params: any) =>
  defHttp.put({ url: '/SpeechActivities', params });
export const deleteSpeechActivities = (id: any) =>
  defHttp.delete({ url: '/SpeechActivities', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/SpeechActivities/Status', params: { id, status } });
