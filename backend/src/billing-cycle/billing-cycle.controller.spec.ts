import { Test, TestingModule } from '@nestjs/testing';
import { BillingCycleController } from './billing-cycle.controller';

describe('BillingCycleController', () => {
  let controller: BillingCycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingCycleController],
    }).compile();

    controller = module.get<BillingCycleController>(BillingCycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
