import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

const orderEntityList: Order[] = [
  new Order({ orderId: 1, items:JSON.parse(JSON.stringify([{ id: 1, name: "P1", quantity: 1, price: 4 }, { id: 2, name: "P2", quantity: 1, price: 14 }])), subTotal: 28, userId: 1, name: "U1"}),
  new Order({ orderId: 2, items: JSON.parse(JSON.stringify([{ id: 1, name: "P1", quantity: 1, price: 4 }])), subTotal: 4, userId: 2, name: "U2"})
]

const newOrderEntity =  new Order({ orderId: 3, items: JSON.parse(JSON.stringify([{ id: 3, name: "P3", quantity: 8, price: 2 }])), subTotal: 16, userId: 2, name: "U2"})
const updateOrder =  new Order({ orderId: 3, items: JSON.parse(JSON.stringify([{ id: 3, name: "P3", quantity: 5, price: 2 }])), subTotal: 10, userId: 2, name: "U2"})

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newOrderEntity),
            findAll: jest.fn().mockResolvedValue(orderEntityList),
            findOne: jest.fn().mockResolvedValue(orderEntityList[0]),
            findUser: jest.fn().mockResolvedValue([orderEntityList[1], newOrderEntity]),
            update: jest.fn().mockResolvedValue(updateOrder),
            remove: jest.fn().mockResolvedValue(undefined),
          }

        }
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a order list successfuly', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(orderEntityList);
      expect(service.findAll).toBeCalledTimes(1);
    })
  })

  describe('findOne', () => {
    it('should return a order successfuly', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(orderEntityList[0]);
      expect(result.orderId).toEqual(1);
      expect(result.name).toEqual('U1');
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith(1);
    })
  })

  describe('create', () => {
    it('should return a new order entity successfuly', async () => {
      const body: CreateOrderDto = {
        items: JSON.parse(JSON.stringify([{ id: 3, name: "P3", quantity: 8, price: 2 }])), 
        subTotal: 16, 
        userId: 2, 
        name: "U2"
      }
      const result = await controller.createOrder(body);

      expect(result).toEqual(newOrderEntity);
      expect(service.create).toBeCalledTimes(1);
      expect(service.create).toBeCalledWith(body);
    })
  })

  describe('findOneByUser', () => {
    it('should return a list order successfuly', async () => {
      const result = await controller.findOrderUser('2');

      expect(result).toEqual([orderEntityList[1], newOrderEntity]);
      expect(typeof result).toEqual('object');
      expect(result[0].orderId).toEqual(2);
      expect(result[1].name).toEqual('U2');
      expect(service.findUser).toBeCalledTimes(1);
      expect(service.findUser).toBeCalledWith(2);
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

      const result = await controller.update('3', body);

      expect(result).toEqual(updateOrder);
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(3, body);
    })
  })

  describe('delete', () => {
    it('should return a undefined successfuly', async () => {
      const result = await controller.remove('2');

      expect(result).toBeUndefined();
      expect(service.remove).toBeCalledTimes(1);
      expect(service.remove).toBeCalledWith(2);
    })
  })
});
