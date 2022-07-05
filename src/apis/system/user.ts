/**
 * 登录相关的接口
 */

import { EXIST_ACCOUNT_URL, UPDATE_USER_PASSWORD, USER_URL } from './../constant';

import { processdRequest } from "@/utils/request"

// 获取用户数据
export const getUserAsync = async (data?: AnyObject) => {
  return await processdRequest.post<UserModel[]>('/System/GetUserListInAdmin', data)
}

// 新增用户数据
export const addUserAsync = async (data: UserModel) => {
  return await processdRequest.post('/System/AddUserInAdmin', data)
}

// 更新用户数据
export const updUserAsync = async (data: UserModel) => {
  return await processdRequest.post('/System/UpdateUserInAdmin', data)
}

// 删除用户数据
export const delUserAsync = async (data: AnyObject) => {
  return await processdRequest.post('/System/DelUserInAdmin', data)
}

// 账号是否存在
export const existUserAsync = async (data: { account: string }) => {
  return await processdRequest.get(EXIST_ACCOUNT_URL, data)
}

// 修改账号密码
export const updateUserPasswordAsync = async (data: { account: string }) => {
  return await processdRequest.post('/System/UpdatePasswordInAdmin', data)
}
