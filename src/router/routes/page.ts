import { RouteRecordRaw } from "vue-router"
import LayoutBusiness from '@/frame/layout/layout-business/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'LayoutBusiness',
    component: LayoutBusiness,
    path: '/',
    children: [
      {
        path: '/test',
        component: () => import('@/pages/test-role/index.vue')
      },
      {
        path: '/brandstore',
        component: () => import('@/pages/brand-store/index.vue')
      }
    ]
  }
]

export default routes
