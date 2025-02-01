const redisClient = process.env.NODE_ENV === 'test' 
  ? global.redisClient 
  : require('../config/redis');

class CacheService {
  async get(key) {
    try {
      return await redisClient.get(key);
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      await redisClient.set(key, value, { EX: ttl });
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(pattern) {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}

module.exports = new CacheService();