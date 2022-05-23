/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
    user: User;

    @Prop({ required: true })
    token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
