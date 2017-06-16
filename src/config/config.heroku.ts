import * as url from 'redis-url';

const redisUrl = url.parse(process.env.REDIS_URL)
export const CONFIG = {
  server: {
    env: "production",
    port: process.env.PORT || 3000
  },
  mongo: {},
  redis: {
    host: redisUrl.hostname,
    port: redisUrl.port,
    password: redisUrl.password,
    db: redisUrl.db || 0
  }
}

console.log(process.env);
console.log(CONFIG);