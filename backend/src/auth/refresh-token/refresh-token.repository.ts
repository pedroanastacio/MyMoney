/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWithId } from 'src/auth/request-with-user.interface';
import { RefreshToken, RefreshTokenDocument } from './refresh-token.schema';

@Injectable()
export class RefreshTokenRepository {
    constructor(
        @InjectModel(RefreshToken.name)
        private refreshTokenModel: Model<RefreshTokenDocument>,
    ) { }

    async create(user: UserWithId, token: string): Promise<RefreshToken> {
        return await this.refreshTokenModel.findOneAndUpdate(
            { user: user._id },
            { user, token },
            { new: true, upsert: true }
        );
    }

    async findByUser(userId: string): Promise<RefreshToken> {
        return await this.refreshTokenModel.findOne({ user: userId });
    }
}
