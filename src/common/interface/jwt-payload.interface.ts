import { RoleEnum } from '../constant/role.constant';

export interface IJwtPayload {
  id: number;
  name: string;
  username: string;
  email: string;
  role_id: RoleEnum;
  bank_id: number;
  warehouse_id: number;
  is_temp_password?: boolean;
  is_phone_valid?: boolean;
  is_email_verified?: boolean;
  token?: string;
}
