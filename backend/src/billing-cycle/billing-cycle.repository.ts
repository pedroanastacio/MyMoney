/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BillingCycle, BillingCycleDocument } from './billing-cycle.schema';
import { Model } from 'mongoose';
import { Summary } from 'src/utils/summary';
import { UserWithId } from 'src/auth/request-with-user.interface';
import mongoose from 'mongoose';

@Injectable()
export class BillingCycleRepository {
  constructor(
    @InjectModel(BillingCycle.name)
    private billingCycleModel: Model<BillingCycleDocument>,
  ) { }

  async findAll(user: UserWithId, skip = 0, limit?: number): Promise<BillingCycle[]> {
    const findQuery = this.billingCycleModel
      .find({ user: user._id })
      .sort({ _id: 1 })
      .skip(skip);
    if (limit) findQuery.limit(limit);
    return await findQuery.exec();
  }

  async findById(id: string): Promise<BillingCycle> {
    return await this.billingCycleModel.findOne({ _id: id });
  }

  async create(billingCycle: BillingCycle, user: UserWithId): Promise<BillingCycle> {
    const newBillingCycle = new this.billingCycleModel({ ...billingCycle, user: user });
    return newBillingCycle.save();
  }

  async update(id: string, billingCycle: BillingCycle): Promise<BillingCycle> {
    return await this.billingCycleModel.findByIdAndUpdate(id, billingCycle, {
      new: true,
    });
  }

  async delete(id: string): Promise<BillingCycle> {
    return await this.billingCycleModel.findByIdAndDelete(id);
  }

  async count(user: UserWithId): Promise<number> {
    return await this.billingCycleModel.countDocuments({ user: user._id });
  }

  async summary(user: UserWithId): Promise<Summary> {
    const userId = new mongoose.Types.ObjectId(user._id);
    const summary = await this.billingCycleModel.aggregate([
      { $match: { user: userId } },
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
