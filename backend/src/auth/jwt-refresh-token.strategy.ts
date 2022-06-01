/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { UserWithId } from './request-with-user.interface';
import { TokenPayload } from './token-payload.interface';
import { RefreshTokenService } from 'src/auth/refresh-token/refresh-token.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private refreshTokenService: RefreshTokenService
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

  async validate(request: Request, payload: TokenPayload): Promise<Partial<UserWithId>> {
    const refreshToken = request.body?.refresh_token;
    const refreshTokenHmac = this.refreshTokenService.createHmacRefreshToken(refreshToken);
    const persistedRefreshToken = await this.refreshTokenService.findByUser(payload.sub);
    if (persistedRefreshToken && await bcrypt.compare(refreshTokenHmac, persistedRefreshToken.token))
      return { _id: payload.sub };
  }
}
