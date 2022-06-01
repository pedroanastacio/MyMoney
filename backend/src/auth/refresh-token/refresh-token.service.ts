import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/auth/token-payload.interface';
import * as crypto from 'crypto';
import { UserWithId } from '../request-with-user.interface';
import { RefreshToken } from './refresh-token.schema';
import { RefreshTokenRepository } from './refresh-token.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  generateNewRefreshToken(payload: TokenPayload): string {
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });
    return newRefreshToken;
  }

  createHmacRefreshToken(refreshToken: string): string {
    //Cria objeto HMAC
    const hmac = crypto.createHmac(
      'sha256',
      this.configService.get('HMAC_REFRESH_TOKEN_SECRET'),
    );
    //Passa refresh-token a ser hasheado
    const data = hmac.update(refreshToken);
    //Cria HMAC no formato requerido
    const refreshTokenHmac = data.digest('hex');
    return refreshTokenHmac;
  }

  async create(user: UserWithId, token: string): Promise<RefreshToken> {
    return await this.refreshTokenRepository.create(user, token);
  }

  async findByUser(userId: string): Promise<RefreshToken> {
    return await this.refreshTokenRepository.findByUser(userId);
  }
}
