/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { ForgotPasswordToken, ForgotPasswordTokenDocument } from './forgot-password-token.schema';

@Injectable()
export class ForgotPasswordTokenRepository {
    constructor(
        @InjectModel(ForgotPasswordToken.name)
        private forgotPasswordTokenModel: Model<ForgotPasswordTokenDocument>,
    ) {}

    async create(user: User, token: string): Promise<ForgotPasswordToken> {
        const newForgotPasswordToken = new this.forgotPasswordTokenModel({ user, token});
        return await newForgotPasswordToken.save();
    }

    async findByUser(userId: string): Promise<ForgotPasswordToken> {
        return await this.forgotPasswordTokenModel.findOne({ user: userId });
    }

    async delete(id: string): Promise<ForgotPasswordToken> {
        return await this.forgotPasswordTokenModel.findByIdAndDelete(id).exec();
      }
}
