import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
      private orderRepository: Repository<Order>,

    @InjectRepository(Product)
      private productRepository: Repository<Product>,

    @InjectRepository(User)
      private userRepository: Repository<User>
    ){}

  async create(createOrderDto: CreateOrderDto) {
    const {items, userId} = createOrderDto;
    let user = await this.userRepository.findOneBy({ id: userId })
    
    let subTotal = 0
    
    for (let index in items) {
      let productId = items[index].id
      let quantity = items[index].quantity

      let product = await this.productRepository.findOneBy({ id: productId })
      
      if (!product){
        return `Produto com ID: ${productId} não existe.`
      }
      
      if (quantity > product.stock){
        return `Produto com ID: ${productId} sem Stock.`
      } 

      items[index].name = product.name
      items[index].price = product.price
      
      subTotal += quantity * product.price 
    }

    let order = new Order()

    order.subTotal = subTotal;
    order.items = items;
    order.userId = userId;
    order.name = user.name;

    let response = await this.orderRepository.save(order);

    for (let index in items) {
      let productId = items[index].id
      let quantity = items[index].quantity

      let product = await this.productRepository.findOneBy({ id: productId })
      
      product.stock = product.stock - quantity

      await this.productRepository.update(productId, product)

    }

    return response
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
