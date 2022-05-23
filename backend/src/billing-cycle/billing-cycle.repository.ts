/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BillingCycle, BillingCycleDocument } from './billing-cycle.schema';
import { Model } from 'mongoose';
import { Summary } from 'src/utils/summary';

@Injectable()
export class BillingCycleRepository {
    constructor(
        @InjectModel(BillingCycle.name)
        private billingCycleModel: Model<BillingCycleDocument>,
    ) { }

    async findAll(skip = 0, limit?: number): Promise<BillingCycle[]> {
        const findQuery = this.billingCycleModel
            .find()
            .sort({ _id: 1 })
            .skip(skip);
        if (limit) findQuery.limit(limit);
        return await findQuery.exec();
    }

    async findById(id: string): Promise<BillingCycle> {
        return await this.billingCycleModel.findById(id).exec();
    }

    async create(billingCycle: BillingCycle): Promise<BillingCycle> {
        const newBillingCycle = new this.billingCycleModel(billingCycle);
        return newBillingCycle.save();
      }
    
      async update(id: string, billingCycle: BillingCycle): Promise<BillingCycle> {
        return await this.billingCycleModel.findByIdAndUpdate(id, billingCycle, {
          new: true,
        });
      }
    
      async delete(id: string): Promise<BillingCycle> {
        return await this.billingCycleModel.findByIdAndDelete(id).exec();
      }
    
      async count(): Promise<number> {
        return await this.billingCycleModel.countDocuments().exec();
      }
    
      async summary(): Promise<Summary> {
        const summary = await this.billingCycleModel.aggregate([
          {
            $project: {
              credit: { $sum: '$credits.value' },
              debt: { $sum: '$debts.value' },
            },
          },
          {
            $group: {
              _id: null,
              credit: { $sum: '$credit' },
              debt: { $sum: '$debt' },
            },
          },
          {
            $project: { _id: 0, credit: 1, debt: 1 },
          },
        ]);
        return summary[0];
      }
}
