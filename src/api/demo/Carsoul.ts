import { defHttp } from '/@/utils/http/axios';

export const getCarsoul = (params: any) => defHttp.get({ url: '/Carsoul', params });
export const postCarsoul = (params: any) => defHttp.post({ url: '/Carsoul', params });
export const putCarsoul = (params: any) => defHttp.put({ url: '/Carsoul', params });
export const deleteCarsoul = (id: any) => defHttp.delete({ url: '/Carsoul', params: { id } });
export const putStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Carsoul/Status', params: { id, status } });
