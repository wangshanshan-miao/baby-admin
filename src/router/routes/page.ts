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
      //品牌商管理
      {
        path: '/brand',
        component: () => import('@/pages/brand/index.vue')
      },
      //品牌商产品管理
      {
        path: '/brandstore',
        component: () => import('@/pages/brand-store/index.vue')
      },
      //品牌商门店管理
      {
        path: '/brandproduct',
        component: () => import('@/pages/brand-product/index.vue')
      },
      //幻灯片管理
      {
        path: '/slide',
        component: () => import('@/pages/slide/index.vue')
      },
      //订单管理
      {
        path: '/order',
        component: () => import('@/pages/order/index.vue')
      }
    ]
  }
]

export default routes
