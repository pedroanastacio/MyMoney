/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Summary } from 'src/utils/summary';
import { BillingCycleRepository } from './billing-cycle.repository';
import { BillingCycle } from './billing-cycle.schema';

@Injectable()
export class BillingCycleService {
  constructor(private billingCycleRepository: BillingCycleRepository) {}

  async findAll(skip = 0, limit?: number): Promise<BillingCycle[]> {
    return await this.billingCycleRepository.findAll(skip, limit);
  }

  async findById(id: string): Promise<BillingCycle> {
    return await this.billingCycleRepository.findById(id);
  }

  async create(billingCycle: BillingCycle): Promise<BillingCycle> {
    return await this.billingCycleRepository.create(billingCycle);
  }

  async update(id: string, billingCycle: BillingCycle): Promise<BillingCycle> {
    return await this.billingCycleRepository.update(id, billingCycle);
  }

  async delete(id: string): Promise<BillingCycle> {
    return await this.billingCycleRepository.delete(id);
  }

  async count(): Promise<number> {
    return await this.billingCycleRepository.count();
  }

  async summary(): Promise<Summary> {
    return await this.billingCycleRepository.summary();
  }
}
