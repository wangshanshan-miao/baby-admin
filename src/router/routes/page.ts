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
        component: () => import('@/pages/user/index.vue')
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
      },
      // 活动管理
      {
        path: '/activity',
        component: () => import('@/pages/activity/index.vue')
      },
      // 推荐码管理
      {
        path: '/recommend',
        component: () => import('@/pages/recommend/index.vue')
      },
       // 妈妈社区
       {
        path: '/mom',
        component: () => import('@/pages/mom/index.vue')
      },
      //品牌商
      {
        path: '/brandDealer',
        component: () => import('@/pages/brand-dealer/index.vue')
      },
      //子活动管理
      {
        path: '/childActivity',
        component: () => import('@/pages/child-activity/index.vue')
      },
      //选手
      {
        path: '/player',
        component: () => import('@/pages/player/index.vue')
      },
      //礼品奖励
      {
        path:'/test',
        // path: '/gift',
        component: () => import('@/pages/gifts/index.vue')
      },
      //配置管理
      {
        // path:'/test',
        path: '/sets',
        component: () => import('@/pages/sets/index.vue')
      },
      //年龄配置管理
      {
        // path:'/test',
        path: '/age',
        component: () => import('@/pages/age-set/index.vue')
      },
      //用户配置管理
      {
        // path:'/test',
        path: '/user',
        component: () => import('@/pages/user/index.vue')
      }
    ]
  }
]

export default routes
