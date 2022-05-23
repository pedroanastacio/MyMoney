/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class SameUserById extends JwtAuthGuard {

  validateUser(request: any): boolean {
    const { id: requestId } = request.params;
    const { _id: tokenId } = request.user;
    if (requestId === tokenId) return true;
    return false;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    return this.validateUser(request);
  }
}