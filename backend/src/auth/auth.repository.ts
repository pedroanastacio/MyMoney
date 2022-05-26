/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenDocument, RefreshToken } from './refresh-token.schema';
import { Model } from 'mongoose';
import { UserWithId } from './requestWithUser.interface';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel(RefreshToken.name)
        private refreshTokenModel: Model<RefreshTokenDocument>,
    ) {}

    async createRefreshToken(user: UserWithId, token: string): Promise<RefreshToken> {
        return await this.refreshTokenModel.findOneAndUpdate({ 
            user: user._id 
        }, {
            user,
            token
        }, { 
            new: true,
            upsert: true
        });
    }

    async getRefreshTokenByUser(userId: string): Promise<RefreshToken> {
        return await this.refreshTokenModel.findOne({ user: userId });
    }
}