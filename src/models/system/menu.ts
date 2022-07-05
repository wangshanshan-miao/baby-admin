/**
 * API菜单模型
 */

export enum MenuType {
  系统菜单 = 1,
  业务菜单 = 0
}

declare global {
  interface MenuModel {
    id: string;
    muCode: string;
    muName: string;
    muDesc: string;
    muIcon: string;
    muUrl: string;
    pmuCode: string;
    sort: number;

    type: MenuType;

    childs: MenuModel[]
  }
  
}