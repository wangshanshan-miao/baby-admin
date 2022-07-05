import { MENU_URL, USER_ROLE_MENU, Func_URL } from './../constant';

import { processdRequest } from "@/utils/request"

// 获取用户菜单数据
export const getUserMenuAsync = async () => {
  return await processdRequest.get<MenuModel[]>(USER_ROLE_MENU, {})
}

// 获取菜单数据
export const getMenuAsync = async () => {
  return await processdRequest.post<MenuModel[]>('/System/GetMenusListInAdmin', {})
}

// 获取角色权限数据
export const getRolePwerAsync = async (data: AnyObject) => {
  return await processdRequest.post<any>('/System/GetPowerInAdmin', {
    ...data
  })
}

// 新增菜单数据
export const addMenuAsync = async (data: MenuModel) => {
  return await processdRequest.post('/System/AddMenusInAdmin', data)
}

// 更新菜单数据
export const updMenuAsync = async (data: MenuModel) => {
  return await processdRequest.post('/System/UpdateMenusInAdmin', data)
}

// 删除菜单数据
export const delMenuAsync = async (data: AnyObject) => {
  return await processdRequest.post('/System/DelMenusInAdmin', data)
}

// 新增菜单数据
export const addFuncAsync = async (data: FuncModel) => {
  return await processdRequest.post(Func_URL, data)
}

// 新增菜单数据
export const delFuncAsync = async (data: FuncModel) => {
  return await processdRequest.delete(Func_URL, data)
}
