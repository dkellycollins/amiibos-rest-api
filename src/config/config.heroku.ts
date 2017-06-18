import * as url from 'redis-url';

const redisUrl = url.parse(process.env.REDIS_URL)
export const CONFIG = {
  server: {
    env: "production",
    port: process.env.PORT
  },
  redis: {
    host: redisUrl.hostname,
    port: redisUrl.port,
    password: redisUrl.password,
    db: redisUrl.db || 0
  },
  sequelize: {
    url: process.env.DATABASE_URL,
    options: {
      logging: false
    }
  }
}