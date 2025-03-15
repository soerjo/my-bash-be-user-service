import { RoleEnum } from "src/common/constant/role.constant";

export class CreateUserDto {
    name: string;
    username: string;
    email: string;
    phone?: string;
    role_id: RoleEnum;
    password: string;
}
