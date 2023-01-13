import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([Product]), TypeOrmModule.forFeature([User])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
