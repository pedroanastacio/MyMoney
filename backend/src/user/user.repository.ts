/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async updatePassword(id: string, password: string): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id: id }, 
      { password },
      { new: true }
    )
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true
    })
  }
}
