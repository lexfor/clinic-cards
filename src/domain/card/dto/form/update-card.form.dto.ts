import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCardFormDto {
  @IsString()
  @IsOptional()
  readonly intolerances?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly height?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly weight?: number;

  @IsString()
  @IsOptional()
  readonly bloodType?: string;
}
