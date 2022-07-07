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
        path: '/brand',
 
        component: () => import('@/pages/brand/index.vue')
      },
      {
        path: '/brandstore',
        component: () => import('@/pages/brand-store/index.vue')
      },
      {
        path: '/test',
        component: () => import('@/pages/brand-product/index.vue')
      }
    ]
  }
]

export default routes
