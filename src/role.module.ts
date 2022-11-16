import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { RoleController } from './role.controller';
import { RoleService } from './service/role.service';
import { IRoleService } from './service/role.service.abstract';
import { RoleRepository } from './repository/role.repository';
import { IRoleRepository } from './repository/role.repository.abstract';
import { DatabaseService } from './database/database.service';
import { HttpExceptionFilter } from 'src/response/http-exception.filter';

@Module({
  controllers: [RoleController],
  providers: [
    DatabaseService,
    {
      provide: IRoleService,
      useClass: RoleService,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class RoleModule {}
