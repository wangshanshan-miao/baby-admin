/**
 * 登录相关的接口
 */

import { USER_ROLE_POWER, ROLE_URL, USER_ROLE_MENU } from './../constant';

import { processdRequest } from "@/utils/request"

// 获取登录用户菜单数据
export const getUserRoleMenuAsync = async () => {
  return await processdRequest.get<RoleModel[]>(USER_ROLE_MENU, {})
}

// 获取用户菜单数据（根据角色id）
export const getRoleMenuAsync = async (data: { roleId: string }) => {
  return await processdRequest.get<RoleMenuModel[]>(USER_ROLE_POWER, data)
}

// 更新用户菜单数据（根据角色id）
export const updRoleMenuAsync = async (data:  {claims: { claimType: string;claimValue: string;roleId: string }[] }) => {
  return await processdRequest.post(USER_ROLE_POWER, data)
}

// 删除用户菜单数据（根据角色id）
export const removeRoleMenuAsync = async (data: { claimIds: string[] }) => {
  return await processdRequest.delete(USER_ROLE_POWER, data)
}

// 获取角色数据
export const getRoleAsync = async (data: AnyObject) => {
  return await processdRequest.post<RoleModel[]>('/System/GetRolesListInAdmin', {
    ...data
  })
}

// 新增角色数据
export const addRoleAsync = async (data: RoleModel) => {
  return await processdRequest.post('/System/AddRolesInAdmin', data)
}

// 更新角色数据
export const updRoleAsync = async (data: RoleModel) => {
  return await processdRequest.post('/System/UpdateRolesInAdmin', data)
}

// 删除角色数据
export const delRoleAsync = async (data: AnyObject) => {
  return await processdRequest.post('/System/DelRolesInAdmin', data)
}

// 更新角色权限
export const updateRolePowerAsync = async (data: AnyObject) => {
  return await processdRequest.post('/System/UpdatePowerInAdmin', data)
}