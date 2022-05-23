import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtSchema } from './debt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Debt.name, schema: DebtSchema }]),
  ],
})
export class DebtModule {}
