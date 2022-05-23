/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationParams {

  @Type(() => Number)
  @IsOptional()
  @IsNumber({},{ message: 'O parâmetro "skip" deve ser um número'})
  @Min(0, { message: 'O parâmetro "skip" deve ser maior ou igual a 0' })
  skip?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({},{ message: 'O parâmetro "limit" deve ser um número'})
  @Min(1, { message: 'O parâmetro "limit" deve ser maior ou igual a 1' })
  limit?: number;
}
