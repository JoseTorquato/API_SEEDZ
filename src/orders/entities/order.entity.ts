import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subTotal: number;

    @Column('simple-json')
    cartProduct: JSON;

    @Column()
    userId: number;
}
