import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  removePassword(user: any): Partial<User> {
    const partialUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return partialUser;
  }

  async create(user: User): Promise<Partial<User>> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const createdUser = await this.userRepository.create(user);
    return this.removePassword(createdUser);
  }

  async update(id: string, user: Partial<User>): Promise<Partial<User>> {
    const updatedUser = await this.userRepository.update(id, user);
    return this.removePassword(updatedUser);
  }

  async findById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findById(id);
    if (user) return this.removePassword(user);
    return user;
  }

  async resetPassword(id: string, password: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userRepository.resetPassword(id, hashedPassword);
  }
}
