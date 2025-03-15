import { MainEntityAbstract } from '../../../common/abstract/main-entity.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'role', schema: 'user' })
export class RoleEntity extends MainEntityAbstract {
  @Column({ unique: true })
  role_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: true })
  description: string;
}
