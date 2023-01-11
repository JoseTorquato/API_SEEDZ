import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column('simple-json')
    items: JSON;

    @Column()
    subTotal: number;

    // @OneToMany(type => User, user => user.id, {eager: true})
    // user: User[];

    @Column()
    userId: number;
}
