import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }
  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    const jwt = await this.jwtService.signAsync(payload);
    return { access_token: jwt };
  }
}
