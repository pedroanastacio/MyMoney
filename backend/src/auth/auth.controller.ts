import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshTokenGuard } from './jwt-refresh-token.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshTokenExceptionFilter } from './refresh-token-exception.filter';
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

  @Put('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseFilters(RefreshTokenExceptionFilter)
  @UseGuards(JwtRefreshTokenGuard)
  async authWithRefreshToken(@Request() request: RequestWithUser) {
    return this.authService.login(request.user);
  }
}
