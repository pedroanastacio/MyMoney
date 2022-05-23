import { Test, TestingModule } from '@nestjs/testing';
import { BillingCycleService } from './billing-cycle.service';

describe('BillingCycleService', () => {
  let service: BillingCycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingCycleService],
    }).compile();

    service = module.get<BillingCycleService>(BillingCycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
