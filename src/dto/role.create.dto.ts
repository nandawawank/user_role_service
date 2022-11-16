import { IsString, IsBoolean, Matches, IsNumber } from 'class-validator';
export class RoleCreateDto {
  @IsString()
  @Matches(/^(usr-role):[A-Za-z0-9-]+$/)
  id: string;

  @IsString()
  @Matches(/^[a-zA-Z%s]+$/)
  role: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  @Matches(/^(user):[A-Za-z0-9-]+$/)
  createdBy: string;

  @IsNumber()
  createdAt: number;
}
