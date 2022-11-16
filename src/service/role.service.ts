import { Injectable, HttpException, Res } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { RoleEntity } from '../entities/role.entity';
import { RoleQueryDto } from '../dto/role.query.dto';
import { RoleParamDto } from '../dto/role.param.dto';
import { RolePayloadDto } from '../dto/role.payload.dto';

import { IResponse } from '../response/response.interface';
import { Response } from '../response/response';
import { IRoleService } from './role.service.abstract';
import { IRoleRepository } from '../repository/role.repository.abstract';

@Injectable()
export class RoleService implements IRoleService {
  constructor(private readonly repository: IRoleRepository) {}

  async findMany(query: RoleQueryDto): Promise<IResponse> {
    try {
      let whereCondition = undefined;
      const take = query.take || 10;
      const skip = query.skip || 0;

      if (query.role !== undefined) {
        whereCondition = {
          where: {
            role: query.role,
          },
        };
      }

      if (query.status !== undefined) {
        whereCondition = {
          where: {
            status: this.statusToBool(query.status.toString()),
          },
        };
      }

      if (query.status !== undefined && query.role !== undefined) {
        whereCondition = {
          where: {
            role: query.role,
            status: this.statusToBool(query.status.toString()),
          },
        };
      }

      if (whereCondition === undefined) {
        whereCondition = { status: true };
      }

      const roles = await this.repository.findMany(whereCondition, take, skip);
      if (roles.count < 1) {
        return new Response(404, 'not found', roles.count, roles.data, null);
      }
      const transformData = roles.data.map((row) => {
        let createdAtBigInt = false;
        let updatedAtBigInt = false;

        if (row.createdAt !== null) {
          // check type from data createdAt
          createdAtBigInt = this.typeOfData(row.createdAt, 'bigint');
        }

        if (row.updatedAt !== null) {
          // check tpy of data updatedAt
          updatedAtBigInt = this.typeOfData(row.updatedAt, 'bigint');
        }

        return new RoleEntity({
          id: row.id,
          role: row.role,
          status: row.status === true ? 'active' : 'unactive',
          createdBy: row.createdBy,
          createdAt: createdAtBigInt ? row.createdAt.toString() : null,
          updatedBy: row.updatedBy,
          updatedAt: updatedAtBigInt ? row.updatedAt?.toString() : null,
        });
      });

      return new Response(200, 'success', roles.count, transformData, null);
    } catch (error) {
      throw new HttpException(
        new Response(500, 'internal server error', 0, null, error),
        500,
      );
    }
  }

  async findById(id: RoleParamDto): Promise<IResponse> {
    try {
      let createdAtBigInt = false;
      let updatedAtBigInt = false;
      const role = await this.repository.findById(id);

      if (role.count < 1) {
        return new Response(404, 'not found', 0, null, null);
      }

      if (role.data?.createdAt !== null) {
        // check type from data createdAt
        createdAtBigInt = this.typeOfData(role.data?.createdAt, 'bigint');
      }

      if (role.data?.updatedAt !== null) {
        // check tpy of data updatedAt
        updatedAtBigInt = this.typeOfData(role.data?.updatedAt, 'bigint');
      }

      const transformData = new RoleEntity({
        id: role.data?.id,
        role: role.data?.role,
        status: role.data?.status === true ? 'active' : 'unactive',
        createdBy: role.data?.createdBy,
        createdAt: createdAtBigInt ? role.data?.createdAt.toString() : null,
        updatedBy: role.data?.updatedBy,
        updatedAt: updatedAtBigInt ? role.data?.updatedAt?.toString() : null,
      });

      return new Response(200, 'success', role.count, transformData, null);
    } catch (error) {
      throw new HttpException(
        new Response(500, 'internal server error', 0, null, error),
        500,
      );
    }
  }

  async create(payload: RolePayloadDto): Promise<IResponse> {
    try {
      const id = uuidv4();
      let createdBy = '';
      if (payload.createdBy !== undefined) createdBy = payload.createdBy;

      const data = {
        id: `usr-role:${id}`,
        role: payload.role,
        status: payload.status,
        createdBy: createdBy,
        createdAt: Date.now(),
      };

      await this.repository.create(data);
      return new Response(201, 'created', 1, [], null);
    } catch (error) {
      throw new HttpException(
        new Response(500, 'internal server error', 0, null, error),
        500,
      );
    }
  }

  async update(id: RoleParamDto, payload: RolePayloadDto): Promise<IResponse> {
    try {
      let updatedBy = '';
      if (payload.updatedBy !== undefined) updatedBy = payload.updatedBy;

      const data = {
        role: payload.role,
        status: payload.status,
        updatedBy: updatedBy,
        updatedAt: Date.now(),
      };

      await this.repository.update(id, data);
      return new Response(200, 'success', 1, [], null);
    } catch (error) {
      throw new HttpException(
        new Response(500, 'internal server error', 0, [], error),
        500,
      );
    }
  }

  async delete(id: RoleParamDto): Promise<IResponse> {
    try {
      await this.repository.delete(id);
      return new Response(200, 'success', 1, [], null);
    } catch (error) {
      throw new HttpException(
        new Response(500, 'internal server error', 0, [], error),
        500,
      );
    }
  }

  private statusToBool(status: string): boolean {
    if (status === 'active') return true;
    return false;
  }

  private typeOfData(
    data: any,
    type: string,
    success = true,
    error = false,
  ): boolean {
    if (typeof data === type) return success;
    return error;
  }
}
