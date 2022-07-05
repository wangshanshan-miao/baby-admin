import { RouteRecordRaw } from "vue-router"
import LayoutSystem from '@/frame/layout/layout-business/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'LayoutSystem',
    component: LayoutSystem,
    path: '/system',
    redirect: '/system/menus',
    children: [
      {
        name: 'systemMenus',
        path: 'menus',
        component: () => import('@/frame/pages/menus/index.vue'),
        meta: {
          title: '菜单管理',
          noView: true,
        }
      },
      {
        name: 'systemRoles',
        path: 'roles',
        component: () => import('@/frame/pages/users/index.vue'),
        meta: {
          title: '角色管理',
          noView: true
        }
      }
    ]
  }
]

export default routes
