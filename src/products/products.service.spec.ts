import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
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
describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn().mockResolvedValue(newProductEntity),
            find: jest.fn().mockResolvedValue(productEntityList),
            findOneBy: jest.fn().mockResolvedValue(productEntityList[0]),
            update: jest.fn().mockResolvedValue(updateProduct),
            delete: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a product list successfuly', async () => {
      const result = await service.findAll();

      expect(result).toEqual(productEntityList);
      expect(repository.find).toBeCalledTimes(1);
    })
  })

  describe('findOne', () => {
    it('should return a product successfuly', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(productEntityList[0]);
      expect(result.id).toEqual(1);
      expect(result.name).toEqual('P1');
      expect(repository.findOneBy).toBeCalledTimes(1);
      expect(repository.findOneBy).toBeCalledWith({id: 1});
    })
  })

  describe('create', () => {
    it('should return a product entity successfuly', async () => {
      const body: CreateProductDto = {
        name: 'P4',
        stock: 41,
        price: 14
      }

      const result = await service.create(body);

      expect(result).toEqual(newProductEntity);
      expect(result.id).toEqual(4);
      expect(result.name).toEqual('P4');
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(body);
    })
  })

  describe('update', () => {
    it('should return a product entity successfuly', async () => {
      const body: CreateProductDto = {
        name: 'P2',
        stock: 18,
        price: 14
      }

      const result = await service.update(2, body);

      expect(result).toEqual(updateProduct);
      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(2, body);
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
