import tokenStorage from '@/frame/utils/token'
import { createRequest } from '@juzhenfe/request'
import { ElMessage } from 'element-plus'
import nProgress from 'nprogress';
import { baseURL } from '@/config';

nProgress.configure({
  easing: 'ease',
  speed: 500,
})

export const pageModelRequest = createRequest({
  baseURL: baseURL,
  auth: 'NORMAL',
  arrayFormat: 'repeat',
  getToken() {
    return tokenStorage.get() ?? ''
  },
  resolveJudge(response) {
    if (response.status === 200) {
      return true
    } else {
      return false
    }
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

pageModelRequest.axiosInstance.interceptors.request.use(config => {
  const token = tokenStorage.get() || ''
  config.headers.Authorization = `Bearer ${token}`
  startProgress()
  return config
})

pageModelRequest.axiosInstance.interceptors.response.use(function (res) {
  doneProgress()
  return res
}, function (error) {
  const response = error.response
  ElMessage.warning(response.data.error_description || response.data.errMsg)
  doneProgress()
  return Promise.reject(error);
})
