// Mock monk - returns a mock collection for db.get()
jest.mock('monk', () => {
  // Simulated user database for test control
  const storedUsers = new Map();
  let userIdCounter = 1;

  const defaultUser = {
    _id: 'mock-default-id',
    username: 'testuser',
    password: 'hashed-password',
    email: 'default@example.com',
    roles: ['ROLE_USER'],
    activated: true,
    createdBy: 'system',
    createdDate: new Date(),
    langKey: 'en',
  };

  const mockCollection = {
    find: jest.fn().mockImplementation((query) => {
      if (query && query.job) {
        return Promise.resolve([{ _id: 'job1', title: 'Developer' }]);
      }
      return Promise.resolve([]);
    }),
    findOne: jest.fn().mockImplementation((query) => {
      const { username, email } = query || {};
      if (username) {
        if (storedUsers.has(username)) {
          return Promise.resolve(storedUsers.get(username));
        }
        // For account lookup with username not in storedUsers, try default
        // Only return default user if NODE_ENV is test (for account endpoint)
        if (process.env.NODE_ENV === 'test' && username === 'testuser') {
          return Promise.resolve({ ...defaultUser, _id: 'mock-testuser' });
        }
      }
      if (email && [...storedUsers.values()].some((u) => u.email === email)) {
        return Promise.resolve([...storedUsers.values()].find((u) => u.email === email));
      }
      return Promise.resolve(null);
    }),
    insert: jest.fn().mockImplementation((doc) => {
      const id = `mock-id-${userIdCounter++}`;
      const newUser = { ...doc, _id: id };
      storedUsers.set(doc.username, newUser);
      return Promise.resolve(newUser);
    }),
    update: jest.fn().mockResolvedValue({ n: 1, nModified: 1 }),
    remove: jest.fn().mockResolvedValue({ n: 1 }),
  };

  const mockDb = {
    get: jest.fn(() => mockCollection),
    then: jest.fn(),
  };

  return jest.fn(() => mockDb);
});

jest.mock('jsonwebtoken', () => {
  const actual = jest.requireActual('jsonwebtoken');
  return {
    ...actual,
    verify: jest.fn().mockImplementation((token) => {
      if (token === 'valid-mock-token') {
        return { sub: 'user1', username: 'testuser', authorities: ['ROLE_USER'] };
      }
      if (token === 'admin-mock-token') {
        return { sub: 'admin1', username: 'admin', authorities: ['ROLE_ADMIN'] };
      }
      throw new Error('Invalid token');
    }),
  };
});

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('../src/config/jwt', () => ({
  generateToken: jest.fn().mockReturnValue('mock-jwt-token'),
  verifyToken: jest.fn().mockReturnValue({
    sub: 'mock-user-id',
    username: 'testuser',
    authorities: ['ROLE_USER'],
  }),
  extractToken: jest.fn((req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }),
  jwtConfig: {
    secret: 'test-secret',
    expiresIn: 86400,
    issuer: 'test-app',
    audience: 'test-api',
  },
}));

import supertest from 'supertest';
import app from '../src/app';

let server;

describe('App and API endpoints', () => {
  beforeAll((done) => {
    server = app.listen(null, () => {
      global.agent = supertest.agent(server);
      done();
    });
  });

  it('POST /api/register should accept registration data', async () => {
    const response = await supertest(app)
      .post('/api/register')
      .send({ username: 'newuser', password: 'testpass123', email: 'new@example.com' });
    expect(response.status).toBe(201);
    expect(response.body.message).toContain('registered');
  });

  it('POST /api/register should reject duplicate username', async () => {
    const response = await supertest(app)
      .post('/api/register')
      .send({ username: 'newuser', password: 'testpass123', email: 'new@example.com' });
    expect(response.status).toBe(409);
    expect(response.body.error).toContain('exists');
  });

  it('POST /api/authenticate should return token', async () => {
    const response = await supertest(app)
      .post('/api/authenticate')
      .send({ username: 'newuser', password: 'testpass123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id_token');
  });

  it('POST /api/register should fail with missing fields', async () => {
    const response = await supertest(app)
      .post('/api/register')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('GET /api/authenticate should return 401 without JWT', async () => {
    const response = await supertest(app).get('/api/authenticate');
    expect(response.status).toBe(401);
  });

  it('GET /api/employees should return 401 without JWT', async () => {
    const response = await supertest(app).get('/api/employees');
    expect(response.status).toBe(401);
  });

  it('GET /api/employees/jobs should return 401 without JWT', async () => {
    const response = await supertest(app).get('/api/employees/jobs');
    expect(response.status).toBe(401);
  });

  it('GET /api/employees with valid token should work', async () => {
    const response = await supertest(app)
      .get('/api/employees')
      .set('Authorization', 'Bearer valid-mock-token');
    expect(response.status).toBe(200);
  });

  it('GET /api/account should return authenticated user with valid token', async () => {
    const response = await supertest(app)
      .get('/api/account')
      .set('Authorization', 'Bearer valid-mock-token');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});
