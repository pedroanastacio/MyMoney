import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestWithUser from 'src/auth/request-with-user.interface';
import { PaginationParams } from 'src/utils/pagination-params';
import { BelongsToUser } from './belongs-to-user.guard';
import { BillingCycle } from './billing-cycle.schema';
import { BillingCycleService } from './billing-cycle.service';

@Controller('billing-cycle')
@UseGuards(JwtAuthGuard)
export class BillingCycleController {
  constructor(private readonly billingCycleService: BillingCycleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Res() response: Response,
    @Request() request: RequestWithUser,
    @Query() { skip, limit }: PaginationParams,
  ) {
    const billingCycles = await this.billingCycleService.findAll(
      request.user,
      skip,
      limit,
    );
    return response.json(billingCycles);
  }

  @Get('/count')
  @HttpCode(HttpStatus.OK)
  async count(@Res() response: Response, @Request() request: RequestWithUser) {
    const count = await this.billingCycleService.count(request.user);
    return response.json({ count });
  }

  @Get('/summary')
  @HttpCode(HttpStatus.OK)
  async summary(
    @Res() response: Response,
    @Request() request: RequestWithUser,
  ) {
    const summary = await this.billingCycleService.summary(request.user);
    return response.json(summary);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BelongsToUser)
  async findById(@Res() response: Response, @Param('id') id: string) {
    const billingCycle = await this.billingCycleService.findById(id);
    return response.json(billingCycle);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Res() response: Response,
    @Request() request: RequestWithUser,
    @Body() billingCycle: BillingCycle,
  ) {
    const newBillingCycle = await this.billingCycleService.create(
      billingCycle,
      request.user,
    );
    return response.json(newBillingCycle);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BelongsToUser)
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() billingCycle: BillingCycle,
  ) {
    const updatedBillingCycle = await this.billingCycleService.update(
      id,
      billingCycle,
    );
    return response.json(updatedBillingCycle);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BelongsToUser)
  async delete(@Res() response: Response, @Param('id') id: string) {
    const deletedBillingCycle = await this.billingCycleService.delete(id);
    return response.json(deletedBillingCycle);
  }
}
