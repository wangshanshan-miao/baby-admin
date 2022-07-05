/**
 * 添加路由守卫
 */

import { RouteLocationNormalized } from 'vue-router'
import { Next } from '@/router'
import importMetaGlobEagerDefaultContentTransferer from '@/frame/utils/import-glob-transfer'

type Middleware = {
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Next): Promise<any>;
}

const importMiddlewares = importMetaGlobEagerDefaultContentTransferer(import.meta.globEager('./*.ts'))

const middlewares: Middleware[] = Object.values(importMiddlewares)

function wrappMiddleware(middleware: Middleware) {
  return async function(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Next) {
    const result = middleware(to, from, next)
    if (result instanceof Promise) {
      try {
        await result
      } catch (error: any) {
        console.log('err', error)
        return false
      }
    }
    return true
  }
}

export default middlewares.map(middleware => {
  return wrappMiddleware(middleware)
})
