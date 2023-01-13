import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const userEntityList: User[] = [
  new User({id: 9000, name: 'Test', email: 'test@test.com', password: 'test@123'}),
  new User({id: 9001, name: 'Test1', email: 'test1@test.com', password: 'test@123'}),
  new User({id: 9002, name: 'Test2', email: 'test2@test.com', password: 'test@123'}),
]


const newUserEntity = new User({
  id: 9003,
  name: 'Test',
  email: 'test@test.com',
  password: 'test@123',
})

const updateUser = new User({id: 9001, name: 'Test1', email: 'test12@test.com', password: 'test@123'})

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(newUserEntity),
            find: jest.fn().mockResolvedValue(userEntityList),
            findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(updateUser),
            delete: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a user list entity successfully', async () => {
      const result = await service.findAll();

      expect(result).toEqual(userEntityList);
      expect(repository.find).toBeCalledTimes(1);
    })
  })

  describe('findOne', () => {
    it('should return a user list entity successfully', async () => {
      const result = await service.findOne(9000);

      expect(result).toEqual(userEntityList[0]);
      expect(repository.findOneBy).toBeCalledTimes(1);
      expect(repository.findOneBy).toBeCalledWith({"id": 9000});
    })
  })

  describe('findOne', () => {
    it('should return one user entity successfully', async () => {
      const result = await service.findOne(9000);

      expect(result).toEqual(userEntityList[0]);
      expect(repository.findOneBy).toBeCalledTimes(1);
      expect(repository.findOneBy).toBeCalledWith({"id": 9000});
    })
  })

  describe('create', () => {
    it('should return a user entity successfully', async () => {
      const body: CreateUserDto = {
        name: 'Test',
        email: 'test@test.com',
        password: 'test@123',
      }
      const result = await service.create(body);

      expect(result).toEqual(newUserEntity);
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.save).toBeCalledWith(body);
    })
  })

  describe('update', () => {
    it('should return a user entity successfully', async () => {

      const body: CreateUserDto = {
        name: 'Test',
        email: 'test12@test.com',
        password: 'test@123',
      }

      const result = await service.update(9001, body);

      expect(result).toEqual(updateUser);
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(9001, body);
    })
  })

  describe('delete', () => {
    it('should return undefined', async () => {
      const result = await service.remove(9002);

      expect(result).toBeUndefined();
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(9002);
    })
  })
});
