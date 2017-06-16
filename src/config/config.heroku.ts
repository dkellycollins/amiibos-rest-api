import * as url from 'redis-url';

const redisUrl = url.parse(process.env.REDIS_URL)
export const CONFIG = {
  "server": {
    "env": "production"
  },
  "mongo": {},
  "redis": {
    host: redisUrl.host,
    port: redisUrl.port,
    password: redisUrl.password,
    db: redisUrl.db
  }
}

console.log(CONFIG);