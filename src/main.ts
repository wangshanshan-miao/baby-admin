import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import extend from '@/frame/extend'
import { createPinia } from 'pinia'
// import moment from 'moment'

const pinia = createPinia()

const app = createApp(App)
// app.config.globalProperties.$moment = moment

app.use(pinia).use(router).use(extend).mount('#app')

export {
  app,
}
