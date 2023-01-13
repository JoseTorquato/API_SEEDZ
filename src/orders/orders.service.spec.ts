import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';


const userEntityList: User[] = [
  new User({id: 1, name: 'U1', email: 'test@test.com', password: 'test@123'}),
  new User({id: 9001, name: 'Test1', email: 'test1@test.com', password: 'test@123'}),
  new User({id: 9002, name: 'Test2', email: 'test2@test.com', password: 'test@123'}),
]


const productEntityList: Product[] = [
  new Product({ id: 1, name: 'P1', stock: 10, price: 4}),
  new Product({ id: 2, name: 'P2', stock: 20, price: 14})
]

const orderEntityList: Order[] = [
  new Order({ orderId: 1, items:JSON.parse(JSON.stringify([{ id: 1, name: "P1", quantity: 1, price: 4 }, { id: 2, name: "P2", quantity: 1, price: 14 }])), subTotal: 28, userId: 1, name: "U1"}),
  new Order({ orderId: 2, items: JSON.parse(JSON.stringify([{ id: 1, name: "P1", quantity: 1, price: 4 }])), subTotal: 4, userId: 2, name: "U2"})
]

const newOrderEntity =  new Order({ orderId: 3, items: JSON.parse(JSON.stringify([{ id: 3, name: "P3", quantity: 8, price: 2 }])), subTotal: 16, userId: 2, name: "U2"})

const updateProduct = new Product({
  id: 1,
  name: 'P2',
  stock: 9,
  price: 4
})
const updateOrder =  new Order({ orderId: 3, items: JSON.parse(JSON.stringify([{ id: 3, name: "P3", quantity: 5, price: 2 }])), subTotal: 10, userId: 2, name: "U2"})

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: jest.fn().mockResolvedValue(newOrderEntity),
            find: jest.fn().mockResolvedValue(orderEntityList),
            findOneBy: jest.fn().mockResolvedValue(orderEntityList[0]),
            findBy: jest.fn().mockResolvedValue([orderEntityList[0], newOrderEntity]),
            update: jest.fn().mockResolvedValue(updateOrder),
            delete: jest.fn().mockResolvedValue(undefined),
          }
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(productEntityList[0]),
            update: jest.fn().mockResolvedValue(updateProduct),
          }
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
          }
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a order list successfuly', async () => {
      const result = await service.findAll();

      expect(result).toEqual(orderEntityList);
      expect(repository.find).toBeCalledTimes(1);
    })
  })

  describe('findOne', () => {
    it('should return a order successfuly', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(orderEntityList[0]);
      expect(result.orderId).toEqual(1);
      expect(result.name).toEqual('U1');
      expect(repository.findOneBy).toBeCalledTimes(1);
      expect(repository.findOneBy).toBeCalledWith({"orderId": 1});
    })
  })

  describe('findUser', () => {
    it('should return a list orders to user successfuly', async () => {
      const result = await service.findUser(2);

      expect(result).toEqual([orderEntityList[0], newOrderEntity]);
      expect(result[0].orderId).toEqual(1);
      expect(result[1].userId).toEqual(2);
      expect(repository.findBy).toBeCalledTimes(1);
      expect(repository.findBy).toBeCalledWith({"userId": 2});
    })
  })

  describe('create', () => {
    it('should return a new order entity successfuly', async () => {
      const body: CreateOrderDto = {
        items: JSON.parse(JSON.stringify([{ id: 1, name: "P1", quantity: 1, price: 4 }])), 
        subTotal: 4, 
        userId: 1, 
        name: "U1"
      }
      const result = await service.create(body);

      expect(result).toEqual(newOrderEntity);
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(body);
    })
  })

  describe('update', () => {
    it('should return a order entity successfuly', async () => {
      const body: CreateOrderDto = {
        items: JSON.parse(JSON.stringify([{ id: 3, name: "P3", quantity: 5, price: 2 }])), 
        subTotal: 10, 
        userId: 2, 
        name: "U2"
      }

      const result = await service.update(3, body);

      expect(result).toEqual(updateOrder);
      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(3, body);
    })
  })

  describe('delete', () => {
    it('should return a undefined successfuly', async () => {
      const result = await service.remove(2);

      expect(result).toBeUndefined();
      expect(repository.delete).toBeCalledTimes(1);
      expect(repository.delete).toBeCalledWith(2);
    })
  })
});
