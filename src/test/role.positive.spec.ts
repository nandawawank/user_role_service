import { DatabaseService } from '../database/database.service';
import { RoleRepository } from '../repository/role.repository';
import { RoleService } from '../service/role.service';

import { statusEnum } from '../dto/role.query.dto';

let repository: RoleRepository;
let service: RoleService;
let database: DatabaseService;

const mockPayloadCreate = [
  {
    role: 'COO',
    status: false,
    createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
  },
  {
    role: 'CTO',
    status: true,
    createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
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

describe('[GET] role positive test', () => {
  it('[GET] role positive test - without param or query', async () => {
    jest
      .spyOn(repository, 'findMany')
      .mockImplementation(async () => mockReturnValue);

    const query = {};
    const response = await service.findMany(query);

    expect(response.code).toBe(200);
    expect(response.errors).toBeNull();
    expect(response.message).toMatch('success');
    expect(response.count).toBeGreaterThanOrEqual(1);
  });

  it.each([
    {
      role: 'admin',
    },
    {
      role: 'CEO',
    },
  ])('[GET] role positive test - with query %o', async (query) => {
    const mockReturnValueFilter = {
      count: 1,
      data: mockReturnValue.data.filter((r) => r.role === query.role),
    };

    jest
      .spyOn(repository, 'findMany')
      .mockImplementation(async () => mockReturnValueFilter);

    const response = await service.findMany(query);

    expect(response.code).toBe(200);
    expect(response.errors).toBeNull();
    expect(response.message).toMatch('success');
    expect(response.count).toBeGreaterThanOrEqual(1);
  });

  it.each([
    {
      status: 'active',
    },
    {
      status: 'unactive',
    },
  ])('[GET] role positive test - with query %o', async (query) => {
    const mockReturnValueFilter = {
      count: 1,
      data: mockReturnValue.data.filter(
        (r) => r.status === (query.status === 'active' ? true : false),
      ),
    };

    jest
      .spyOn(repository, 'findMany')
      .mockImplementation(async () => mockReturnValueFilter);

    const statusQuery = {
      status:
        query.status === 'active'
          ? statusEnum['active']
          : statusEnum['unactive'],
    };
    const response = await service.findMany(statusQuery);

    expect(response.code).toBe(200);
    expect(response.errors).toBeNull();
    expect(response.message).toMatch('success');
    expect(response.count).toBeGreaterThanOrEqual(1);
  });

  it.each([
    [{ status: 'active', role: 'admin' }],
    [{ status: 'unactive', role: 'ceo' }],
  ])('[GET] role positive test - with query %o', async (query) => {
    const mockReturnValueFilter = {
      count: 1,
      data: mockReturnValue.data.filter(
        (r) => r.status === (query.status === 'active' ? true : false),
      ),
    };

    jest
      .spyOn(repository, 'findMany')
      .mockImplementation(async () => mockReturnValueFilter);

    const roleStatusQuery = {
      role: query.role,
      status:
        query.status === 'active'
          ? statusEnum['active']
          : statusEnum['unactive'],
    };
    const response = await service.findMany(roleStatusQuery);

    expect(response.code).toBe(200);
    expect(response.errors).toBeNull();
    expect(response.message).toMatch('success');
    expect(response.count).toBeGreaterThanOrEqual(1);
  });
});

describe('[POST] role positive test', () => {
  it.each([...mockPayloadCreate])(
    '[POST] role positive test - with valid payload',
    async (payload) => {
      jest
        .spyOn(repository, 'create')
        .mockImplementation(async () => mockReturnValue.data[0]);
      const response = await service.create(payload);

      expect(response.code).toBe(201);
      expect(response.message).toMatch('created');
      expect(response.count).toBeGreaterThanOrEqual(1);
    },
  );
});

describe('[PUT] role positive test', () => {
  it.each([
    [
      {
        id: 'usr-role:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      },
      {
        role: 'COO',
        status: true,
        updatedBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      },
    ],
    [
      {
        id: 'usr-role:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      },
      {
        role: 'VP',
        status: true,
        updatedBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
      },
    ],
  ])(
    '[PUT] role positive test - with valid payload and param',
    async (param, payload) => {
      jest
        .spyOn(repository, 'update')
        .mockImplementation(async () => mockReturnValue.data[0]);
      const response = await service.update(param, payload);

      expect(response.code).toBe(200);
      expect(response.message).toMatch('success');
      expect(response.count).toBeGreaterThanOrEqual(1);
    },
  );
});

describe('[DEL] role positive test', () => {
  it.each([
    {
      id: 'usr-role:6ee1b011-25fc-4f1f-be94-f3d571a60a71',
    },
    {
      id: 'usr-role:6ee1b011-25fc-4f1f-be94-f3d571a60a71',
    },
  ])('[DEL] role positive test - with valid param %o', async (param) => {
    jest
      .spyOn(repository, 'delete')
      .mockImplementation(async () => mockReturnValue.data[0]);

    const response = await service.delete(param);

    expect(response.code).toBe(200);
    expect(response.message).toMatch('success');
    expect(response.count).toBeGreaterThanOrEqual(1);
  });
});
