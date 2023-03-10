import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Seja bem vindo ao meu teste de Node + Typescript para a SEEDZ <3"', () => {
      expect(appController.getHello()).toBe('Seja bem vindo ao meu teste de Node + Typescript para a SEEDZ <3');
    });
  });
});
