export const CONFIG = {
  server: {
    env: "development"
  },

  redis: {
    url: "redis://localhost:32769"
  },

  sequelize: {
    url: 'postgres://postgres@localhost:32768/amiibos',
    options: {
      benchmark: true
    }
  }
}