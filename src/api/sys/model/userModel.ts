/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

interface Error {
  username?: string;
}
interface Data {
  message?: string;
  errors?: Error;
  userId?: number;
  username?: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  status: number;
  data: Data;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles?: RoleInfo[];
  // 用户id
  userId?: number;
  // 用户名
  username?: string;
  // 真实名字
  realName?: string;
  // 头像
  avatar?: string;
  // 介绍
  desc?: string;
}
