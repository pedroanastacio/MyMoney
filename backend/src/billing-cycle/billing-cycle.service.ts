/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserWithId } from 'src/auth/request-with-user.interface';
import { Summary } from 'src/utils/summary';
import { BillingCycleRepository } from './billing-cycle.repository';
import { BillingCycle } from './billing-cycle.schema';

@Injectable()
export class BillingCycleService {
  constructor(private billingCycleRepository: BillingCycleRepository) { }

  async findAll(user: UserWithId, skip = 0, limit?: number): Promise<BillingCycle[]> {
    return await this.billingCycleRepository.findAll(user, skip, limit);
  }

  async findById(id: string): Promise<BillingCycle> {
    return await this.billingCycleRepository.findById(id);
  }

  async create(billingCycle: BillingCycle, user: UserWithId): Promise<BillingCycle> {
    return await this.billingCycleRepository.create(billingCycle, user);
  }

  async update(id: string, billingCycle: BillingCycle): Promise<BillingCycle> {
    return await this.billingCycleRepository.update(id, billingCycle);
  }

  async delete(id: string): Promise<BillingCycle> {
    return await this.billingCycleRepository.delete(id);
  }

  async count(user: UserWithId): Promise<number> {
    return await this.billingCycleRepository.count(user);
  }

  async summary(user: UserWithId): Promise<Summary> {
    const summary = await this.billingCycleRepository.summary(user);
    if (!summary) return { credit: 0, debt: 0 };
    return summary;
  }
}
