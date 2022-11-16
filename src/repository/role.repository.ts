import { Injectable } from '@nestjs/common';
import { Roles } from '@prisma/client';

import { RoleParamDto } from '../dto/role.param.dto';
import { RoleCreateDto } from '../dto/role.create.dto';
import { RoleUpdateDto } from '../dto/role.update.dto';

import { DatabaseService } from '../database/database.service';
import { IRoleRepository } from './role.repository.abstract';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(private readonly db: DatabaseService) {}

  async findMany(
    whereCondition: object,
    take: number,
    skip: number,
  ): Promise<{ count: number; data: Roles[] }> {
    const [count, data] = await this.db.$transaction([
      this.db.roles.count({ where: whereCondition, take: take, skip: skip }),
      this.db.roles.findMany({ where: whereCondition, take: take, skip: skip }),
    ]);

    return { count: count, data: data };
  }

  async findById(
    id: RoleParamDto,
  ): Promise<{ count: number; data: Roles | null }> {
    const [count, data] = await this.db.$transaction([
      this.db.roles.count({ where: { ...id } }),
      this.db.roles.findFirst({ where: { ...id } }),
    ]);

    return { count: count, data: data };
  }

  async create(data: RoleCreateDto): Promise<Roles> {
    return await this.db.roles.create({ data });
  }

  async update(id: RoleParamDto, data: RoleUpdateDto): Promise<Roles> {
    return await this.db.roles.update({
      where: { ...id },
      data,
    });
  }

  async delete(id: RoleParamDto): Promise<Roles> {
    return await this.db.roles.delete({ where: { ...id } });
  }
}
