import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from 'src/user/user.schema';
import { UserWithId } from './request-with-user.interface';
import { TokenPayload } from './token-payload.interface';
import { AuthPayload } from './auth-payload.interface';
import { RefreshTokenService } from 'src/auth/refresh-token/refresh-token.service';
import { ForgotPasswordTokenService } from './forgot-password-token/forgot-password-token.service';
import { sendEmail } from 'src/utils/sendEmail';
import { forgotPasswordMessage } from 'src/utils/forgot-password-message';
import { hash } from 'src/utils/hash';
import { ForgotPasswordToken } from './forgot-password-token/forgot-password-token.schema';
import { resetPasswordMessage } from 'src/utils/reset-password-message';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private refreshTokenService: RefreshTokenService,
    private forgotPasswordTokenService: ForgotPasswordTokenService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.userService.removePassword(user);
    }
    return null;
  }

  generateNewAcessToken(payload: TokenPayload): string {
    const newAcessToken = this.jwtService.sign(payload);
    return newAcessToken;
  }

  async generateTokens(user: UserWithId): Promise<Partial<AuthPayload>> {
    const payload = { sub: user._id };
    //Cria access e refresh tokens
    const accessToken = this.generateNewAcessToken(payload);
    const refreshToken =
      this.refreshTokenService.generateNewRefreshToken(payload);
    //Faz o hash do refresh-token criado
    const hashedRefreshToken = await hash(
      this.refreshTokenService.createHmacRefreshToken(refreshToken),
    );
    //Persiste o refresh-token
    await this.refreshTokenService.create(user, hashedRefreshToken);
    //Retorna access e refresh token criados
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(user: UserWithId): Promise<Partial<AuthPayload>> {
    const tokens = await this.generateTokens(user);
    const loggedUser = await this.userService.findById(user._id);
    return { ...tokens, user: loggedUser };
  }

  async forgotPassword(email: string): Promise<void> {
    //Verifica se o e-mail pertence a um usuário existente
    const user: User & { _id?: string } = await this.userService.findByEmail(
      email,
    );
    if (!user)
      throw new NotFoundException('Não existe um usuário com este e-mail');
    //Verifica se o usuário já tem um token de alteração de senha
    const token: ForgotPasswordToken & { _id?: string } =
      await this.forgotPasswordTokenService.findByUser(user._id);
    //Remove o token existente
    if (token) await this.forgotPasswordTokenService.delete(token._id);
    //Cria um novo token
    const newToken = crypto.randomBytes(32).toString('hex');
    //Faz o hash do novo token
    const hashedNewToken = await hash(newToken);
    //Persiste o novo token
    await this.forgotPasswordTokenService.create(user, hashedNewToken);
    //Envia e-mail com link para alterar senha
    await sendEmail(
      email,
      'Alteração de senha',
      forgotPasswordMessage(user, newToken),
    );
  }

  async resetPassword(
    userId: string,
    forgotPasswordToken: string,
    password: string,
  ): Promise<void> {
    //Verifica se há um token de alteração de senha para o usuário
    const persistedForgotPasswordToken: ForgotPasswordToken & { _id?: string } =
      await this.forgotPasswordTokenService.findByUser(userId);
    if (!persistedForgotPasswordToken) {
      throw new BadRequestException(
        'O token de alteração de senha é inválido ou expirou',
      );
    }
    //Verifica se o token de alteração de senha é válido
    const tokenIsValid = await bcrypt.compare(
      forgotPasswordToken,
      persistedForgotPasswordToken.token,
    );
    if (!tokenIsValid) {
      throw new BadRequestException(
        'O token de alteração de senha é inválido ou expirou',
      );
    }
    //Persiste a nova senha
    await this.userService.updatePassword(userId, password);
    //Recupera o usuário pelo ID
    const user = await this.userService.findById(userId);
    //Envia o e-mail de confirmação de alteração de senha
    await sendEmail(
      user.email,
      'Corfirmação de alteração de senha',
      resetPasswordMessage(user.name),
    );
    //Remove o token de alteração de senha
    await this.forgotPasswordTokenService.delete(
      persistedForgotPasswordToken._id,
    );
  }
}
