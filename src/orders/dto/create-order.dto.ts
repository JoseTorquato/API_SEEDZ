import {IsNotEmpty} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
    @IsNotEmpty()
    items: JSON;
    
    @IsNotEmpty()
    subTotal: number;

    @IsNotEmpty()
    userId: number;
}
