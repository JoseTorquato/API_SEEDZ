import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
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
    const {items, userId} = createOrderDto;

    let subTotal = 0
    for (let index in items) {
      subTotal += items[index].quantity * items[index].price 
    }

    // createOrderDto["subTotal"] = subTotal

    let order = new Order()

    order.subTotal = subTotal;
    order.items = items;
    order.userId = userId;

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(orderId: number) {
    return this.orderRepository.findOneBy({ orderId: orderId });
  }

  findUser(userId: number) {
    return this.orderRepository.findBy({ userId: userId });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
