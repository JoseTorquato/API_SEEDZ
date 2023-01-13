import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const productEntityList: Product[] = [
  new Product({ id: 1, name: 'P1', stock: 10, price: 7}),
  new Product({ id: 2, name: 'P2', stock: 20, price: 14}),
  new Product({ id: 3, name: 'P3', stock: 23, price: 88}),
]

const newProductEntity = new Product({
  id: 4,
  name: 'P4',
  stock: 41,
  price: 14,
})

const updateProduct = new Product({
  id: 2,
  name: 'P2',
  stock: 18,
  price: 14
})
describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newProductEntity),
            findAll: jest.fn().mockResolvedValue(productEntityList),
            findOne: jest.fn().mockResolvedValue(productEntityList[0]),
            update: jest.fn().mockResolvedValue(updateProduct),
            remove: jest.fn().mockResolvedValue(undefined),
          }

        }
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a product list successfuly', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(productEntityList);
      expect(service.findAll).toBeCalledTimes(1);
    })
  })

  describe('findOne', () => {
    it('should return a product successfuly', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(productEntityList[0]);
      expect(result.id).toEqual(1);
      expect(result.name).toEqual('P1');
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith(1);
    })
  })

  describe('create', () => {
    it('should return a product entity successfuly', async () => {
      const body: CreateProductDto = {
        name: 'P4',
        stock: 41,
        price: 14
      }

      const result = await controller.create(body);

      expect(result).toEqual(newProductEntity);
      expect(result.id).toEqual(4);
      expect(result.name).toEqual('P4');
      expect(service.create).toBeCalledTimes(1);
      expect(service.create).toBeCalledWith(body);
    })
  })

  describe('update', () => {
    it('should return a product entity successfuly', async () => {
      const body: CreateProductDto = {
        name: 'P2',
        stock: 18,
        price: 14
      }

      const result = await controller.update('2', body);

      expect(result).toEqual(updateProduct);
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(2, body);
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
