import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto';

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

const updateUser = new User({id: 9002, name: 'Test22', email: 'test2@test.com', password: 'test@123'})


describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUserEntity),
            findAll: jest.fn().mockResolvedValue(userEntityList),
            findOne: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(updateUser),
            remove: jest.fn().mockResolvedValue(undefined),
          }

        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list user entity successfully', async () => {
      const result = await controller.findAll()

      expect(result).toEqual(userEntityList)
      expect(typeof result).toEqual('object')
      expect(result[0].id).toEqual(9000)
      expect(result[0].name).toEqual('Test')
      expect(result[0].email).toEqual('test@test.com')
      expect(result[0].password).toEqual('test@123')
      expect(service.findAll).toHaveBeenCalledTimes(1)
    })
    it('should trow an exception', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
    
      expect(controller.findAll()).rejects.toThrowError();
    })
  });
  describe('create', () => {
    it('should return a new user entity successfully', async () => {
      const body: CreateUserDto = {
        name: 'Test',
        email: 'test@test.com',
        password: 'test@123',
      }

      const result = await controller.create(body);

      expect(result).toEqual(newUserEntity);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(body);
    })
    
    it('should trow an exception', () => {
      const body: CreateUserDto = {
        name: 'Test',
        email: 'test@test.com',
        password: 'test@123',
      }

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
    
      expect(controller.create(body)).rejects.toThrowError();
    })
  });
  describe('findOne', () => {
    it('should return a user entity successfully', async () => {
      const result = await controller.findOne('9000');

      expect(result).toEqual(userEntityList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(9000);
    })
    
    it('should trow an exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
    
      expect(controller.findOne('9000')).rejects.toThrowError();
    })
  });
  describe('update', () => {
    it('should return a user entity successfully', async () => {

      const body: CreateUserDto = {
        name: 'Test',
        email: 'test22@test.com',
        password: 'test@123',
      }

      const result = await controller.update('9002', body);

      expect(result).toEqual(updateUser);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(9002, body);
    })
    
    it('should trow an exception', () => {
      const body: CreateUserDto = {
        name: 'Test',
        email: 'test22@test.com',
        password: 'test@123',
      }

      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(controller.update('9002', body)).rejects.toThrowError();
    })
  });
  describe('delete', () => {
    it('should return a undefined', async () => {
      const result = await controller.remove('9002');

      expect(result).toBeUndefined();
    })
    
    it('should trow an exception', () => {

      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      expect(controller.remove('9002')).rejects.toThrowError();
    })
  });
});
