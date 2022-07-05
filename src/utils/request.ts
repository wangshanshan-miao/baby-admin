import { STATUS_403 } from './../store/app/index';
import EventChain from '@/frame/utils/event-chain'
import tokenStorage from '@/frame/utils/token'
import { AxiosResponse, createRequest } from '@juzhenfe/request'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useAppStore } from '@/store/app'
import nProgress from 'nprogress';
import { baseURL } from '@/config';

nProgress.configure({
  easing: 'ease',
  speed: 500,
})

// 请求成功处理链
const successChain = new EventChain()
const status200 = (res: AxiosResponse) => {
  if (res.Result === false) {
    ElMessage.warning(res.Message || res.message)
    throw new Error(res)
  }
  return true
}

const resultSuccessChain = (res: AxiosResponse) => {
  return true
}
successChain
  .setChain(status200)
  .setChain(resultSuccessChain)

  // 请求失败处理链
const errorChain = new EventChain()
const status401 = (res: AxiosResponse) => {
  if (res.status === 401) {
    ElMessage.warning(`抱歉，您的授权已失效，请重新登录。`)
    tokenStorage.remove()
    router.push('/login')
    return true
  }
  return false
}
const status403 = (res: AxiosResponse) => {
  if (res.status === 403) {
    ElMessage.warning(`抱歉，您暂无权限访问。`)

    if (router.currentRoute.value.name) {
      const store = useAppStore()
      store.updateStatus({
        status: STATUS_403,
        name: router.currentRoute.value.name as string
      })
    }

    return true
  }
  return false
}

const status404 = (res: AxiosResponse) => {
  if (res.status === 404) {
    ElMessage.warning(`抱歉，您要访问的API不存在。`)
    return true
  }
  return false
}

const status500 = (res: AxiosResponse) => {
  if (res.status === 500) {
    const message = res.data.errMsg
    ElMessage.warning(`${message}。`)
    return true
  }
  return false
}

const status400 = (res: AxiosResponse) => {
  if (res.status === 400) {
    const message = res.data.error_description || res.data.errMsg
    ElMessage.warning(`${message}。`)
    return true
  }
  return false
}

const resultErrorChain = (res: AxiosResponse) => {
  ElMessage.warning(`抱歉，系统出现了错误，请联系管理员。`)
  return true
}

errorChain
  .setChain(status401)
  .setChain(status403)
  .setChain(status404)
  .setChain(status400)
  .setChain(status500)
  .setChain(resultErrorChain)

export const processdRequest = createRequest({
  baseURL: baseURL,
  auth: 'NORMAL',
  arrayFormat: 'repeat',
  getToken() {
    return tokenStorage.get() ?? ''
  },
  resolveJudge(response) {
    return successChain.passRequest(response)
  }
}, {
  process: true
})

const startProgress = () => {
  nProgress.start()
}

const doneProgress = () => {
  nProgress.done()
}

processdRequest.axiosInstance.interceptors.request.use(config => {

  const token = tokenStorage.get() || ''
  config.headers.Authorization = `Bearer ${token}`

  startProgress()
  return config
})

processdRequest.axiosInstance.interceptors.response.use(function (res) {
  doneProgress()
  if (res.status === 200) {
    return res.data
  } else {
    return res
  }
}, function (error) {
  errorChain.passRequest(error.response)
  doneProgress()
  return Promise.reject(error);
})
