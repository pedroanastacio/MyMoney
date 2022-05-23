import { Module } from '@nestjs/common';
import { BillingCycleService } from './billing-cycle.service';
import { BillingCycleController } from './billing-cycle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingCycle, BillingCycleSchema } from './billing-cycle.schema';
import { BillingCycleRepository } from './billing-cycle.repository';

@Module({
  providers: [BillingCycleService, BillingCycleRepository],
  controllers: [BillingCycleController],
  imports: [
    MongooseModule.forFeature([
      { name: BillingCycle.name, schema: BillingCycleSchema },
    ]),
  ],
})
export class BillingCycleModule {}
