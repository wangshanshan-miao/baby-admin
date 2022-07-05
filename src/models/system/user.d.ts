/**
 * API用户模型
 */

 interface UserModel {
  id: string;
  account: string;
  userName: string;
  passwordHash: string;
  phoneNumber: string;
  concurrencyStamp: string;
  creationTime: string;
  staffId: number;
  headImgUrl: string;
  isDeleted: boolean;
  password: string;
  enabled: boolean;
  rolesId: string[];
  roCode: string;
}
