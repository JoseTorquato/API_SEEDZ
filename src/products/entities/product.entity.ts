import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    stock: number;

    @Column()
    price: number;

    constructor(product: Partial<Product>){
        this.id = product?.id;
        this.name = product?.name;
        this.stock = product?.stock;
        this.price = product?.price;
    }
}
