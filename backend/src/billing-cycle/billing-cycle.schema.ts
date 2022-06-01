/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateNested, Min, Max } from 'class-validator';
import { Document } from 'mongoose';
import { CreditSchema, Credit } from 'src/billing-cycle/credit/credit.schema';
import { DebtSchema, Debt } from 'src/billing-cycle/debt/debt.schema';

export type BillingCycleDocument = BillingCycle & Document;

@Schema()
export class BillingCycle {
  
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome do ciclo de pagamento é inválido' })
  @Prop({ required: true })
  name: string;

  @IsNotEmpty({ message: 'O mês do ciclo de pagamento é obrigatório' })
  @IsNumber({},{ message: 'O mês do ciclo de pagamento deve ser um número'})
  @Min(1, { message: 'O valor mínimo do mês do ciclo de pagamento é 1' })
  @Max(12, { message: 'O valor máximo do mês do ciclo de pagamento é 12' })
  @Prop({ required: true, min: 1, max: 12 })
  month: number;

  @IsNotEmpty({ message: 'O ano do ciclo de pagamento é obrigatório' })
  @IsNumber({},{ message: 'O ano do ciclo de pagamento deve ser um número'})
  @Min(1970, { message: 'O valor mínimo do ano do ciclo de pagamento é 1970' })
  @Max(2100, { message: 'O valor máximo do ano do ciclo de pagamento é 2100' })
  @Prop({ required: true, min: 1970, max: 2100 })
  year: number;

  @Prop({ type: [CreditSchema] })
  @ValidateNested({ each: true })
  @Type(() => Credit)
  credits: [Credit]

  @Prop({ type: [DebtSchema] })
  @ValidateNested({ each: true })
  @Type(() => Debt)
  debts: [Debt]
}

export const BillingCycleSchema = SchemaFactory.createForClass(BillingCycle);
