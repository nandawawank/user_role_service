export class RoleEntity {
  id: string;
  role: string;
  status: string;
  createdBy: any;
  createdAt: any;
  updatedBy: any;
  updatedAt: any;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
