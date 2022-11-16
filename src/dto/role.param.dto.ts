import { Matches, IsString } from 'class-validator';
export class RoleParamDto {
  @IsString()
  @Matches(/^(usr-role):[a-z0-9-]+$/)
  id: string;
}
