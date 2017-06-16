import * as url from 'redis-url';

export const CONFIG = {
  "server": {
    "env": "production"
  },
  "mongo": {},
  "redis": url.parse(process.env.REDIS_URL)
}

console.log(CONFIG);