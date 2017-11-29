export const CONFIG = {
  server: {
    env: 'development'
  },

  sequelize: {
    url: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/amiibos',
    options: {
      benchmark: true
    }
  }
};
