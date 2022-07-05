/**
 * 上传文件相关配置
 */


// 七牛上传配置
export const qiniuUploadConfig = {
  open: true,
  region: 'juzhenshop',
  tokenUrl: 'api/Qiniu/CreateUploadToken',
  uploadUrl: 'https://upload.qiniup.com/',
  fileUrl: 'https://juzhenshopimg.juzhentech.com/'
}

// 本地上传配置
export const normalUploadConfig = {
  fileUrl: '',
  uploadUrl: '',
}
