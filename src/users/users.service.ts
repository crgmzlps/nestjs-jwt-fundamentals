import { Injectable, NotFoundException } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'John Doe', username: 'john', password: 'password' },
    { id: 2, name: 'Jane Doe', username: 'jane', password: 'password' },
  ];
  async findOne(username: string): Promise<User | undefined> {
    const user = this.users.find((u: User) => u.username === username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
