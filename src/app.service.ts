import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Seja bem vindo ao meu teste de Node + Typescript para a SEEDZ <3';
  }
}
