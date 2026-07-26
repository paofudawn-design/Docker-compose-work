jest.mock('monk');
jest.mock('jsonwebtoken', () => {
  const original = jest.requireActual('jsonwebtoken');
  return {
    ...original,
    verify: jest.fn().mockImplementation((token) => {
      if (token === 'valid-mock-token') {
        return { sub: 'user1', username: 'testuser', role: 'user' };
      }
      if (token === 'admin-mock-token') {
        return { sub: 'admin1', username: 'admin', role: 'admin' };
      }
      throw new Error('Invalid token');
    }),
  };
});

describe('Auth Middleware', () => {
  let auth;

  beforeEach(() => {
    // Clear jest mock modules and re-require
    jest.resetModules();
    // Set dummy env for tests
    process.env.JWT_SECRET = 'test-secret';
    auth = require('../src/middlewares/auth');
  });

  it('should export isAuthenticated and isAdmin functions', () => {
    expect(auth).toBeDefined();
    expect(typeof auth.isAuthenticated).toBe('function');
    expect(typeof auth.isAdmin).toBe('function');
  });

  it('isAuthenticated should reject missing token', () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    const next = jest.fn();

    auth.isAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Authentication required' });
  });

  it('isAuthenticated should reject empty Bearer token', () => {
    const req = { headers: { authorization: 'Bearer ' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    const next = jest.fn();

    auth.isAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('isAuthenticated should call next with valid token', () => {
    const req = {
      headers: { authorization: 'Bearer valid-mock-token' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    const next = jest.fn();

    auth.isAuthenticated(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.username).toBe('testuser');
  });
});
