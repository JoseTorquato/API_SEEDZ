import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateOrderDto {
    @ApiProperty({
        example: [
            {
                "id": 1,
                "quantity": 2
            }
        ]
    })
    @IsNotEmpty()
    items: JSON;
    
    @ApiProperty()
    @IsNotEmpty()
    subTotal: number;

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
