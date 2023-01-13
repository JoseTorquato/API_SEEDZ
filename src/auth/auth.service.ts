import {
    Injectable,
    NotAcceptableException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { User } from '../users/entities/user.entity';
  import { UsersService } from '../users/users.service';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private jwtService: JwtService,
    ) {}
    async userValidate(username: string, password: string): Promise<any> {
      const user = await this.usersService.findOneByEmail(username);
      if (!user) {
        throw new UnauthorizedException('Usuário ou Senha Inválidos');
      }
      if (user.password === password) {
        return await this.tokenGenerator(user);
      }
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
  
    async tokenGenerator(payload: User) {
      return {
        access_token: this.jwtService.sign(
          { email: payload.email },
          {
            secret: 'topSecret512',
            expiresIn: '600s',
          },
        ),
      };
    }
  }
  