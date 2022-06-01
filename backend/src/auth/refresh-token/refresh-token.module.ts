import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshToken, RefreshTokenSchema } from './refresh-token.schema';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  providers: [RefreshTokenService, RefreshTokenRepository],
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRES_IN') },
      }),
    }),
  ],
  exports: [RefreshTokenService, RefreshTokenRepository],
})
export class RefreshTokenModule {}
