import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestWithUser from 'src/auth/request-with-user.interface';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Res() response: Response, @Body() user: User) {
    const newUser = await this.userService.create(user);
    return response.json(newUser);
  }

  @Put('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Res() response: Response,
    @Request() request: RequestWithUser,
    @Body('password') password: string,
  ) {
    const result = await this.userService.updatePassword(
      request.user._id,
      password,
    );
    return response.json(result);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async update(
    @Res() response: Response,
    @Request() request: RequestWithUser,
    @Body() user: Partial<User>,
  ) {
    const newUser = await this.userService.update(request.user._id, user);
    return response.json(newUser);
  }
}
