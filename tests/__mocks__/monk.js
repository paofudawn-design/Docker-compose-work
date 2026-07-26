// Mock monk database module for testing
// This prevents the connection error when running tests without MongoDB

const mockCollection = {
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
  insert: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
  remove: jest.fn().mockResolvedValue({}),
};

const mockDb = jest.fn(() => mockCollection);

// Statics used by monk
mockDb.then = jest.fn();
mockDb.get = jest.fn(() => mockCollection);

const monk = jest.fn(() => mockDb);

module.exports = monk;
module.exports.mockCollection = mockCollection;
module.exports.mockDb = mockDb;
