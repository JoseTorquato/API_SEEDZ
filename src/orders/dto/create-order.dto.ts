import {IsNotEmpty} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateOrderDto {
    @IsNotEmpty()
    items: JSON;
    
    @IsNotEmpty()
    subTotal: number;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    name: string;
}
