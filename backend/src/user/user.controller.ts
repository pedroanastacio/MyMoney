import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { SameUserById } from './same-user-by-id.guard';
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SameUserById)
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ) {
    const updatedBillingCycle = await this.userService.update(id, user);
    return response.json(updatedBillingCycle);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SameUserById)
  async findById(@Res() response: Response, @Param('id') id: string) {
    const user = await this.userService.findById(id);
    return response.json(user);
  }

  @Put('reset-password/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(SameUserById)
  async resetPassword(
    @Res() response: Response,
    @Param('id') id: string,
    @Body('password') password: string,
  ) {
    await this.userService.resetPassword(id, password);
    return response.json();
  }
}
