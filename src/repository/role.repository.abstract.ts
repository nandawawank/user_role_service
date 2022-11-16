import { Roles } from '@prisma/client';
import { RoleParamDto } from '../dto/role.param.dto';
import { RoleCreateDto } from '../dto/role.create.dto';
import { RoleUpdateDto } from '../dto/role.update.dto';

export abstract class IRoleRepository {
  abstract findMany(
    whereCondition: object | undefined,
    take: number,
    skip: number,
  ): Promise<{ count: number; data: Roles[] }>;
  abstract findById(
    id: RoleParamDto,
  ): Promise<{ count: number; data: Roles | null }>;
  abstract create(data: RoleCreateDto): Promise<Roles>;
  abstract update(id: RoleParamDto, data: RoleUpdateDto): Promise<Roles>;
  abstract delete(id: RoleParamDto): Promise<Roles>;
}
