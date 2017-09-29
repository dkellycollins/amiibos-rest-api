export const CONFIG = {
  server: {
    env: 'test'
  },
  sequelize: {
    url: process.env.DATABASE_URL,
    options: {
      logging: false
    }
  }
};
