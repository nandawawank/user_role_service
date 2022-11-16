import { IsString, IsBoolean, Matches, IsOptional } from 'class-validator';

export class RolePayloadDto {
  @IsString()
  @Matches(/^[a-zA-Z%s]+$/)
  role: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  @IsOptional()
  @Matches(/^(user):[A-Za-z0-9-]+$/)
  createdBy?: string;

  @IsString()
  @IsOptional()
  @Matches(/^(user):[A-Za-z0-9-]+$/)
  updatedBy?: string;
}
