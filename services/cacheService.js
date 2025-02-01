const client = require("../config/redis");

class CacheService {
  async get(key) {
    return await client.get(key);
  }

  async set(key, value, expireTime = 3600) {
    await client.setEx(key, expireTime, JSON.stringify(value));
  }

  async delete(pattern) {
    await client.del(pattern);
  }
}

module.exports = new CacheService();