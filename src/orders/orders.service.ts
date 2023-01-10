import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
      private orderRepository: Repository<Order>
    ){}

  create(createOrderDto: CreateOrderDto) {
    let subTotal = 0

    for (let index in createOrderDto.cartProduct) {
      subTotal += createOrderDto.cartProduct[index].quantity * createOrderDto.cartProduct[index].price 
    }
    
    createOrderDto["subTotal"] = subTotal

    return this.orderRepository.save(createOrderDto);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
