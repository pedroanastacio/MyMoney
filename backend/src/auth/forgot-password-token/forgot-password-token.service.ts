import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { ForgotPasswordTokenRepository } from './forgot-password-token.repository';
import { ForgotPasswordToken } from './forgot-password-token.schema';

@Injectable()
export class ForgotPasswordTokenService {
  constructor(
    private forgotPasswordRepository: ForgotPasswordTokenRepository,
  ) {}

  async create(user: User, token: string): Promise<ForgotPasswordToken> {
    return await this.forgotPasswordRepository.create(user, token);
  }

  async findByUser(userId: string): Promise<ForgotPasswordToken> {
    return await this.forgotPasswordRepository.findByUser(userId);
  }

  async delete(id: string): Promise<ForgotPasswordToken> {
    return await this.forgotPasswordRepository.delete(id);
  }
}
