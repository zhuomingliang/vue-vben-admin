import { defHttp } from '/@/utils/http/axios';

export const getAllAreaList = (params?: any) => defHttp.get({ url: '/area', params });
