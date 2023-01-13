import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor(user?: Partial<User>) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.password = user?.password;
    }
}
