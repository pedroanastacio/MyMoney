import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshTokenGuard } from './jwt-refresh-token.guard';
import { LocalAuthGuard } from './local-auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() request: RequestWithUser) {
    return this.authService.login(request.user);
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshTokenGuard)
  async authWithRefreshToken(@Request() request: RequestWithUser) {
    return this.authService.authenticate(request.user);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Request() request: RequestWithUser) {
    return this.authService.deleteRefreshToken(request.user);
  }
}
