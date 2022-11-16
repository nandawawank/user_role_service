import {
  Controller,
  Get,
  Query,
  Param,
  Res,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { IRoleService } from './service/role.service.abstract';

import { RoleQueryDto } from './dto/role.query.dto';
import { RoleParamDto } from './dto/role.param.dto';
import { RolePayloadDto } from './dto/role.payload.dto';

@Controller('/v1/api')
export class RoleController {
  constructor(private readonly service: IRoleService) {}

  @Get('/user-roles')
  async findMany(
    @Res() response: Response,
    @Query() query: RoleQueryDto,
  ): Promise<any> {
    const result = await this.service.findMany(query);
    return response.status(result.code).send(result);
  }

  @Get('/user-roles/:id')
  async findById(
    @Res() response: Response,
    @Param() id: RoleParamDto,
  ): Promise<any> {
    const result = await this.service.findById(id);
    return response.status(result.code).send(result);
  }

  @Post('/user-roles')
  async create(
    @Res() response: Response,
    @Body() payload: RolePayloadDto,
  ): Promise<any> {
    const result = await this.service.create(payload);
    return response.status(result.code).send(result);
  }

  @Put('/user-roles/:id')
  async update(
    @Res() response: Response,
    @Param() id: RoleParamDto,
    @Body() payload: RolePayloadDto,
  ): Promise<any> {
    const result = await this.service.update(id, payload);
    return response.status(result.code).send(result);
  }

  @Delete('/user-roles/:id')
  async delete(
    @Res() response: Response,
    @Param() id: RoleParamDto,
  ): Promise<any> {
    const result = await this.service.delete(id);
    return response.status(result.code).send(result);
  }
}
