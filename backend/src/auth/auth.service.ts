import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.schema';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';
import { UserWithId } from './requestWithUser.interface';
import { RefreshToken } from './refresh-token.schema';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.userService.removePassword(user);
    }
    return null;
  }

  generateNewAcessToken(payload: TokenPayload): string {
    const newAcessToken = this.jwtService.sign(payload);
    return newAcessToken;
  }

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

  async createHashedRefreshToken(refreshTokenHmac: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(refreshTokenHmac, salt);
    return hashedRefreshToken;
  }

  async generateTokens(user: UserWithId): Promise<any> {
    const payload = { sub: user._id };
    //Cria access e refresh tokens
    const accessToken = this.generateNewAcessToken(payload);
    const refreshToken = this.generateNewRefreshToken(payload);
    const hashedRefreshToken = await this.createHashedRefreshToken(
      this.createHmacRefreshToken(refreshToken),
    );
    //Persiste o refresh-token
    await this.authRepository.createRefreshToken(user, hashedRefreshToken);
    //Retorna access e refresh token criados
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(user: UserWithId): Promise<any> {
    const tokens = await this.generateTokens(user);
    const loggedUser = await this.userService.findById(user._id);
    return { ...tokens, user: loggedUser };
  }
}
