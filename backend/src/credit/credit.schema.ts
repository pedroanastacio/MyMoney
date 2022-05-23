/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@Schema()
export class Credit {

  @IsNotEmpty({ message: 'O nome do crédito é obrigatório' })
  @IsString({ message: 'O nome do crédito é inválido' })
  @Prop({ required: true })
  name: string;

  @IsNotEmpty({ message: 'O valor do crédito é obrigatório' })
  @IsNumber({},{ message: 'O valor do crédito deve ser um número'})
  @Min(0, { message: 'O valor mínimo do crédito é R$ 0,00' })
  @Prop({ required: true, min: 0 })
  value: number;
}

export const CreditSchema = SchemaFactory.createForClass(Credit);
