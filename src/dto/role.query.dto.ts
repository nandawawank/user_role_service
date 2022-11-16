import {
  IsString,
  IsEnum,
  IsOptional,
  Matches,
  IsNumber,
} from 'class-validator';

export enum statusEnum {
  'active',
  'unactive',
}

export class RoleQueryDto {
  @IsEnum(statusEnum)
  @IsOptional()
  status?: statusEnum;

  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z\s]+$/)
  role?: string;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsNumber()
  @IsOptional()
  skip?: number;
}
