import { defHttp } from '/@/utils/http/axios';

export const getNavigation = (params: any) => defHttp.get({ url: '/Navigation', params });
export const getMainMenu = (params: any) => defHttp.get({ url: '/Navigation/MainMenu', params });
export const getSubMenuByMainMenuId = (params: any) =>
  defHttp.get({ url: '/Navigation/SubMenuByMainMenuId', params });
export const postMainMenu = (params: any) => defHttp.post({ url: '/Navigation/MainMenu', params });
export const putMainMenu = (params: any) => defHttp.put({ url: '/Navigation/MainMenu', params });
export const putMainMenu2 = (params: any) => defHttp.put({ url: '/Navigation/MainMenu2', params });
export const postSubMenu = (params: any) => defHttp.post({ url: '/Navigation/SubMenu', params });
export const putSubMenu = (params: any) => defHttp.put({ url: '/Navigation/SubMenu', params });
export const putMainOrder = (params: any) => defHttp.put({ url: '/Navigation/MainOrder', params });
export const putSubOrder = (params: any) => defHttp.put({ url: '/Navigation/SubOrder', params });
export const deleteNavigation = (id: any) => defHttp.delete({ url: '/Navigation', params: { id } });
export const putMainMenuStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Navigation/MainMenuStatus', params: { id, status } });
export const putSubMenuStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Navigation/SubMenuStatus', params: { id, status } });
export const putThirdMenuStatus = (id: number, status: boolean) =>
  defHttp.put({ url: '/Navigation/ThirdMenuStatus', params: { id, status } });
