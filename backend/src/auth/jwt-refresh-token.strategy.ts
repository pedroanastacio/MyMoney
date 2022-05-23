/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UserWithId } from './requestWithUser.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private authRepository: AuthRepository,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.body?.refresh_token
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<Partial<UserWithId>> {
    const refreshToken = request.body?.refresh_token;
    const refreshTokenHmac = this.authService.createHmacRefreshToken(refreshToken);
    const persistedRefreshToken = await this.authRepository.getRefreshTokenByUser(payload.sub);
    if (persistedRefreshToken && await bcrypt.compare(refreshTokenHmac, persistedRefreshToken.token))
      return { _id: payload.sub };
  }
}
