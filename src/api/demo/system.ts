import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/user',
  AccountList = '/system/getAccountList',
  IsUserExist = '/user/exists',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/role/Status',
  MenuList = '/menu',
  RolePageList = '/role',
  GetAllRoleList = '/system/getAllRoleList',
  getRolePermissions = '/role/permissions',
}

export const getUserList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.UserList, params });

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: boolean) =>
  defHttp.put({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (username: string) =>
  defHttp.get({ url: Api.IsUserExist, params: { username } }, { errorMessageMode: 'none' });

export function createRole(role: Object) {
  return defHttp.post({ url: Api.RolePageList, params: { ...role, guard_name: 'admin' } });
}

export function updateRole(role: Object) {
  return defHttp.put({ url: Api.RolePageList, params: { ...role, guard_name: 'admin' } });
}

export function getRolePermissions(id: number) {
  return defHttp.get({ url: Api.getRolePermissions, params: { id } });
}

export function deleteRole(id: number) {
  return defHttp.delete({ url: Api.RolePageList, params: { id, guard_name: 'admin' } });
}
