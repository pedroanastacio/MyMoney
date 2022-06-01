/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

export type ForgotPasswordTokenDocument = ForgotPasswordToken & Document;

@Schema()
export class ForgotPasswordToken {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
    user: User;

    @Prop({ required: true })
    token: string;

    @Prop({ required: true, default: new Date(), expires: 3600 })
    created_at: Date
}

export const ForgotPasswordTokenSchema = SchemaFactory.createForClass(ForgotPasswordToken);

