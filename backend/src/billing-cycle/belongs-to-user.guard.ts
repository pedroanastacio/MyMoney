/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext, CanActivate, NotFoundException } from '@nestjs/common';
import RequestWithUser from 'src/auth/request-with-user.interface';
import { User } from 'src/user/user.schema';
import { BillingCycleService } from './billing-cycle.service';

@Injectable()
export class BelongsToUser implements CanActivate {
  constructor(private billingCycleService: BillingCycleService){}

  async validateUser(request: RequestWithUser): Promise<boolean> {
    const { _id: userId } = request.user;
    const { id: billingCycleId } = request.params;
    const billingCycle = await this.billingCycleService.findById(billingCycleId);
    if(!billingCycle) throw new NotFoundException('Ciclo de pagamento não encontrado')
    const billingCycleUser: User & { _id?: string } = billingCycle.user;
    if (billingCycleUser._id.valueOf() === userId) return true;
    return false;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateUser(request);
  }
}