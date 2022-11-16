import { DatabaseService } from '../database/database.service';
import { RoleRepository } from '../repository/role.repository';
import { RoleService } from '../service/role.service';

import { statusEnum } from '../dto/role.query.dto';

let database: DatabaseService;
let repository: RoleRepository;
let service: RoleService;

const mockPayloadCreate = [
  {
    role: 'COO123',
    status: false,
    createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
  },
  {
    role: 'CTO',
    status: false,
    createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
  },
  {
    role: 'CTO',
    status: true,
    createdBy: 'user:f23957ed_d6f1-4ce2-8807-28a2cf4f93b2',
  },
];

const mockReturnValue = {
  count: 2,
  data: [
    {
      id: 'usr-role:6ee1b011-25fc-4f1f-be94-f3d571a60a71',
      role: 'CEO',
      status: false,
      createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      createdAt: BigInt(1665050354335),
      updatedBy: null,
      updatedAt: null,
    },
    {
      id: 'usr-role:6ee1b011-25fc-4f1f-be94-f3d571a60a71',
      role: 'ADMIN',
      status: true,
      createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      createdAt: BigInt(1665050354335),
      updatedBy: null,
      updatedAt: null,
    },
  ],
};

beforeEach(() => {
  repository = new RoleRepository(database);
  service = new RoleService(repository);
});

describe('[GET] role negative test', () => {
  it.each([
    {
      role: 'negative12',
    },
    {
      role: 'VP_OPERASIONAL',
    },
  ])('[GET] role negative test - invalid query role %o', async (query) => {
    try {
      jest
        .spyOn(repository, 'findMany')
        .mockImplementation(async () => mockReturnValue);
      await service.findMany(query);
    } catch (error) {
      expect(error.code).toBe(400);
      expect(error.message).toMatch('bad request');
      expect(error.error).toContain('role');
    }
  });

  it.each([
    {
      status: 'ok',
    },
    {
      status: true,
    },
  ])('[GET] role negative test - invalid query status %o', async (query) => {
    try {
      jest
        .spyOn(repository, 'findMany')
        .mockImplementation(async () => mockReturnValue);

      const statusQuery = {
        status:
          query.status === 'active'
            ? statusEnum['active']
            : statusEnum['unactive'],
      };

      await service.findMany(statusQuery);
    } catch (error) {
      expect(error.code).toBe(400);
      expect(error.message).toMatch('bad request');
      expect(error.error).toContain('role');
    }
  });

  it.each([
    {
      status: 'ok',
      role: 'CEO',
    },
    {
      status: 'active',
      role: 'ADMIN12',
    },
    {
      status: 1,
      role: 'ADMIN43',
    },
  ])('[GET] role negative test - with query %o', async (query) => {
    try {
      jest
        .spyOn(repository, 'findMany')
        .mockImplementation(async () => mockReturnValue);

      const roleStatusQuery = {
        role: query.role,
        status:
          query.status === 'active'
            ? statusEnum['active']
            : statusEnum['unactive'],
      };

      await service.findMany(roleStatusQuery);
    } catch (error) {
      expect(error.code).toBe(400);
      expect(error.message).toMatch('bad request');
    }
  });
});

describe('[POST] role negative test', () => {
  it.each([...mockPayloadCreate])(
    '[POST] role negative test - invalid payload %o',
    async (payload) => {
      try {
        jest
          .spyOn(repository, 'create')
          .mockImplementation(async () => mockReturnValue.data[0]);

        await service.create(payload);
      } catch (error) {
        expect(error.code).toBe(400);
        expect(error.message).toMatch('bad request');
      }
    },
  );
});

describe('[DELETE] role negative test', () => {
  it.each([
    [
      {
        id: 'usr-role:6ee1b011-25fc-4f1f-be94_f3d571a60a71',
      },
      {
        role: 'COO123',
        status: false,
        updatedBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      },
    ],
    [
      {
        id: 'usr:6ee1b011-25fc-4f1f-be94-f3d571a60a71',
      },
      {
        role: 'COO',
        status: false,
        updatedBy: 'usr:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      },
    ],
  ])(
    '[PUT] role negative test - invalid param and payload %o',
    async (id, payload) => {
      try {
        jest
          .spyOn(repository, 'update')
          .mockImplementation(async () => mockReturnValue.data[0]);

        await service.update(id, payload);
      } catch (error) {
        expect(error.code).toBe(400);
        expect(error.message).toMatch('bad request');
      }
    },
  );
});

describe('[DELETE] role negative test', () => {
  it.each([
    {
      id: 'usrrole:6ee1b011-25fc-4f1f-be94-f3d571a60a71',
    },
    {
      id: 'usr-role_6ee1b011-25fc-4f1f-be94-f3d571a60a71',
    },
    {
      id: 'usr-role:6ee1b011-25fc_4f1f-be94-f3d571a60a71',
    },
  ])('[DELETE] role negative test - invalid param %o', async (param) => {
    try {
      jest
        .spyOn(repository, 'delete')
        .mockImplementation(async () => mockReturnValue.data[0]);
      await service.delete(param);
    } catch (error) {
      expect(error.code).toBe(400);
      expect(error.message).toMatch('bad request');
    }
  });
});
