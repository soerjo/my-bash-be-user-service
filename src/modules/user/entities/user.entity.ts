import { Exclude } from 'class-transformer';
import { MainEntityAbstract } from '../../../common/abstract/main-entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { decrypt, encrypt } from '../../../utils/encrypt.util';
import { RoleEntity } from './role.entity';

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

  @Column({ nullable: false })
  role_id: number;

  @Column({ nullable: false, default: 0 })
  bank_id: number;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Exclude()
  @Column({ nullable: true })
  temp_password?: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  role: RoleEntity
}
