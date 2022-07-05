import { App } from 'vue'

import '@juzhenfe/page-model/dist/index.min.css'

import PageModel from '@juzhenfe/page-model'

import { pageModelRequest } from '../page-model-request'

export default {
  install(app: App) {
    app.use(PageModel, {
      request: pageModelRequest,
      config: {
        getMethod: 'post',
        delMethod: 'post',
        addMethod: 'post',
        updMethod: 'post',
        table: {
          pagination: {
            pageSize: 20
          },
        }
      }
    })
  }
}
