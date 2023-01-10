import {IsNotEmpty} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    cartProduct: JSON;

    @IsNotEmpty()
    userId: number;
}
