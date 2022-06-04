import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { hash } from 'src/utils/hash';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  removePassword(user: User & { _id?: string }): Partial<User> {
    const partialUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return partialUser;
  }

  async create(user: User): Promise<Partial<User>> {
    user.password = await hash(user.password);
    const createdUser = await this.userRepository.create(user);
    return this.removePassword(createdUser);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findById(id);
    return this.removePassword(user);
  }

  async updatePassword(id: string, password: string): Promise<Partial<User>> {
    const hashedPassword = await hash(password);
    const user = await this.userRepository.updatePassword(id, hashedPassword);
    return this.removePassword(user);
  }

  async update(id: string, user: Partial<User>): Promise<Partial<User>> {
    const newUser = await this.userRepository.update(id, user);
    return this.removePassword(newUser);
  }
}
