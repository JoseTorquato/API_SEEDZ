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

    @Column()
    userId: number;

    @Column()
    name: string;

    constructor(order?: Partial<Order>) {
        this.orderId = order?.orderId;
        this.items = order?.items;
        this.subTotal = order?.subTotal;
        this.userId = order?.userId;
        this.name = order?.name;
    }
}

