import { LOGIN, GET_USERINFO } from './../constant';

import { processdRequest } from "@/utils/request"

// 登录接口
interface LoginModel {
  account: string;
  password: string;
}

declare global {
  interface LoginResultModel {
    access_token: string;
    expires_in: number;
    scope: string;
  }
}

export const doLoginAsync = async (req: LoginModel) => {
  const data = {
    account: req.account,
    password: req.password,
    // client_id: 'client',
    // client_secret: 'secret',
    // grant_type: 'password'
    // grant_type: 'test'
  }

  return await processdRequest.post<LoginResultModel>(LOGIN, data)
}

// token获取用户信息接口
export const getUserInfoAsync = async () => {
  return await processdRequest.post<UserModel>(GET_USERINFO, {})
}
