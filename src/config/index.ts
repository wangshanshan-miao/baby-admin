
/**
 * 开发环境
 */
export const isProduction = process.env.NODE_ENV === 'production'


/**
 * 请求地址
 */

const devURL = '/api/magic'

const proURL = '/api/magic'

export const baseURL = isProduction ? proURL : devURL
