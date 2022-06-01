import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotPasswordTokenRepository } from './forgot-password-token.repository';
import {
  ForgotPasswordToken,
  ForgotPasswordTokenSchema,
} from './forgot-password-token.schema';
import { ForgotPasswordTokenService } from './forgot-password-token.service';

@Module({
  providers: [ForgotPasswordTokenService, ForgotPasswordTokenRepository],
  imports: [
    MongooseModule.forFeature([
      { name: ForgotPasswordToken.name, schema: ForgotPasswordTokenSchema },
    ]),
  ],
  exports: [ForgotPasswordTokenService, ForgotPasswordTokenRepository],
})
export class ForgotPasswordTokenModule {}
