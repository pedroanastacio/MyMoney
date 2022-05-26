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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationParams } from 'src/utils/pagination-params';
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
    @Query() { skip, limit }: PaginationParams,
  ) {
    const billingCycles = await this.billingCycleService.findAll(skip, limit);
    return response.json(billingCycles);
  }

  @Get('/count')
  @HttpCode(HttpStatus.OK)
  async count(@Res() response: Response) {
    const count = await this.billingCycleService.count();
    return response.json({ count });
  }

  @Get('/summary')
  @HttpCode(HttpStatus.OK)
  async summary(@Res() response: Response) {
    const summary = await this.billingCycleService.summary();
    return response.json(summary);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Res() response: Response, @Param('id') id: string) {
    const billingCycle = await this.billingCycleService.findById(id);
    return response.json(billingCycle);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Res() response: Response, @Body() billingCycle: BillingCycle) {
    const newBillingCycle = await this.billingCycleService.create(billingCycle);
    return response.json(newBillingCycle);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
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
  async delete(@Res() response: Response, @Param('id') id: string) {
    const deletedBillingCycle = await this.billingCycleService.delete(id);
    return response.json(deletedBillingCycle);
  }
}
