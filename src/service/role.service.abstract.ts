import { IResponse } from '../response/response.interface';

import { RoleParamDto } from '../dto/role.param.dto';
import { RoleQueryDto } from '../dto/role.query.dto';
import { RolePayloadDto } from '../dto/role.payload.dto';

export abstract class IRoleService {
  abstract findMany(query: RoleQueryDto): Promise<IResponse>;
  abstract findById(id: RoleParamDto): Promise<IResponse>;
  abstract create(payload: RolePayloadDto): Promise<IResponse>;
  abstract update(
    id: RoleParamDto,
    payload: RolePayloadDto,
  ): Promise<IResponse>;
  abstract delete(id: RoleParamDto): Promise<IResponse>;
}
