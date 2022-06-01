import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './jwt-refresh-token.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshTokenExceptionFilter } from './refresh-token-exception.filter';
import RequestWithUser from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Res() response: Response, @Request() request: RequestWithUser) {
    const result = await this.authService.login(request.user);
    return response.json(result);
  }

  @Put('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseFilters(RefreshTokenExceptionFilter)
  @UseGuards(JwtRefreshTokenGuard)
  async authWithRefreshToken(
    @Res() response: Response,
    @Request() request: RequestWithUser,
  ) {
    const result = await this.authService.login(request.user);
    return response.json(result);
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Res() response: Response,
    @Body('email') email: string,
  ) {
    const result = await this.authService.forgotPassword(email);
    return response.json(result);
  }

  @Put('/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Res() response: Response,
    @Body('user_id') userId: string,
    @Body('forgot_password_token') forgotPasswordToken: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.resetPassword(
      userId,
      forgotPasswordToken,
      password,
    );
    return response.json(result);
  }
}
