import { IsString, IsNumber, IsBoolean, Matches } from 'class-validator';

export class RoleUpdateDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/)
  role: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  @Matches(/^(user):[a-zA-Z0-9-]+$/)
  updatedBy: string;

  @IsNumber()
  updatedAt: number;
}
