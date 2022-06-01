/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { DebtStatus } from 'src/utils/debt-status';

@Schema()
export class Debt {

  @IsNotEmpty({ message: 'O nome do débito é obrigatório' })
  @IsString({ message: 'O nome do débito é inválido' })
  @Prop({ required: true })
  name: string;

  @IsNotEmpty({ message: 'O valor do débito é obrigatório' })
  @IsNumber({},{ message: 'O valor do débito deve ser um número'})
  @Min(0, { message: 'O valor mínimo do débito é R$ 0,00' })
  @Prop({ required: true, min: 0 })
  value: number;

  @IsEnum(DebtStatus, { message: `O status do débito deve ser "${DebtStatus.pago}", "${DebtStatus.pendente}" ou "${DebtStatus.agendado}"`})
  @Prop({ required: true, enum: DebtStatus })
  status: string;
}

export const DebtSchema = SchemaFactory.createForClass(Debt);