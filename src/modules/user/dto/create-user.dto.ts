import { RoleEnum } from "../../../common/constant/role.constant";

export class CreateUserDto {
    name: string;
    username: string;
    email: string;
    phone?: string;
    role_id: RoleEnum;
    password?: string;
    is_email_verified?: boolean;
    created_by?: number;
    bank_id?: number;
    temp_password?: string;
}
