import { Exclude } from 'class-transformer';
import { MainEntityAbstract } from '../../../common/abstract/main-entity.abstract';
import { Column, Entity } from 'typeorm';
import { RoleEnum } from 'src/common/constant/role.constant';
import { decrypt, encrypt } from 'src/utils/encrypt.util';

@Entity({ name: 'user', schema: 'user' })
export class UserEntity extends MainEntityAbstract {
  @Column({ nullable: false })
  name: string;

  @Column({ 
    unique: true, 
    nullable: false,
   })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({
    nullable: true,
    default: "",
    transformer: {
      to: (value: string) => encrypt(value), // Encrypt before saving
      from: (value: string) => decrypt(value), // Decrypt when retrieving
    },
  })
  phone?: string;

  @Column({ nullable: false, enum: RoleEnum })
  role_id: RoleEnum;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Exclude()
  @Column({ nullable: true })
  temp_password?: string;
}
