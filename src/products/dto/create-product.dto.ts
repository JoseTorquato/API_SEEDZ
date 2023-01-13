import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    price: number;
}
