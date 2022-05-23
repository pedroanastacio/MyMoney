/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @IsNotEmpty({ message: 'O nome do usuário é obrigatório' })
    @IsString({ message: 'O nome do usuário é inválido' })
    @Prop({ required: true })
    name: string;

    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    @IsEmail({ message: 'O e-mail é inválido' })
    @Prop({ required: true, unique: true })
    email: string

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    @MaxLength(12, { message: 'A senha deve ter no máximo 12 caracteres' })
    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);
