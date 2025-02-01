const mongoose = require('mongoose');
const { createClient } = require('redis');
const dotenv = require('dotenv');

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Redis client
let redisClient;

// Set test timeout
jest.setTimeout(10000);

global.beforeAll(async () => {
  // Connect to test MongoDB database
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to test MongoDB database');

    // Connect to test Redis instance
    redisClient = createClient({
      url: process.env.REDIS_URL
    });
    
    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    await redisClient.connect();
    console.log('Connected to test Redis instance');

    // Make redisClient available globally for tests
    global.redisClient = redisClient;
  } catch (error) {
    console.error('Setup Error:', error);
  }
});

global.beforeEach(async () => {
  // Clear test database collections
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }

  // Clear test Redis cache
  if (redisClient?.isOpen) {
    await redisClient.flushAll();
  }
});

global.afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
});

global.afterAll(async () => {
  try {
    // Disconnect from test MongoDB
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('Disconnected from test MongoDB database');
    }

    // Disconnect from test Redis
    if (redisClient?.isOpen) {
      await redisClient.quit();
      console.log('Disconnected from test Redis instance');
    }
  } catch (error) {
    console.error('Cleanup Error:', error);
  }
});

// Mock console.error to keep test output clean
console.error = jest.fn();

// Global test utilities
global.testUtils = {
  createTestFAQ: async (data = {}) => {
    const defaultFAQ = {
      question: 'Test Question?',
      answer: 'Test Answer',
      translations: {
        fr: { question: 'Question FR?', answer: 'Réponse' },
        es: { question: 'Pregunta?', answer: 'Respuesta' }
      }
    };
    return { ...defaultFAQ, ...data };
  }
}; 