const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: process.env.NODE_ENV === 'production',
    rejectUnauthorized: false
  }
});

redisClient.on("error", (err) => console.error("Redis Error", err));
redisClient.connect();

module.exports = redisClient;