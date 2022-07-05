import { App } from 'vue'

import 'element-plus/dist/index.css'

import VueGridLayout from 'vue-grid-layout'

export default {
  install(app: App) {
    app.use(VueGridLayout)
  }
}
