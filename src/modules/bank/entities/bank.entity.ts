import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MainEntityAbstract } from '../../../common/abstract/main-entity.abstract';
import { decrypt, encrypt } from '../../../utils/encrypt.util';
import { UserEntity } from '../../../modules/user/entities/user.entity';

@Entity({ name: 'bank', schema: 'user' })
export class BankEntity extends MainEntityAbstract {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({
    transformer: {
      to: (value: string) => encrypt(value), // Encrypt before saving
      from: (value: string) => decrypt(value), // Decrypt when retrieving
    },
  })
  province: string;

  @Column({
    transformer: {
      to: (value: string) => encrypt(value), // Encrypt before saving
      from: (value: string) => decrypt(value), // Decrypt when retrieving
    },
  })
  regency: string;

  @Column({
    transformer: {
      to: (value: string) => encrypt(value), // Encrypt before saving
      from: (value: string) => decrypt(value), // Decrypt when retrieving
    },
  })
  district: string;

  @Column({
    transformer: {
      to: (value: string) => encrypt(value), // Encrypt before saving
      from: (value: string) => decrypt(value), // Decrypt when retrieving
    },
  })
  village: string;

  @Column({ type: 'text' })
  address: string;

  @Column({
    transformer: {
      to: (value: string) => encrypt(value), // Encrypt before saving
      from: (value: string) => decrypt(value), // Decrypt when retrieving
    },
  })
  postal_code: string;

  @Column({
    transformer: {
      to: (value: string) => encrypt(value), // Encrypt before saving
      from: (value: string) => decrypt(value), // Decrypt when retrieving
    },
  })
  phone: string;

  @Column()
  owner_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  bank: UserEntity
}
