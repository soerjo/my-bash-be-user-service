import { Exclude } from "class-transformer";
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { Column, Entity } from "typeorm";

@Entity({ 
    name: 'user',
    schema: 'user',
})
export class User extends MainEntityAbstract {
    @Column({ nullable: false })
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: false })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: false })
    role_id?: string;

    @Exclude()
    @Column({ nullable: true })
    password: string;

    @Exclude()
    @Column({ nullable: true })
    temp_password: string;
}
