export const CONFIG = {
  server: {
    env: "development"
  },

  sequelize: {
    url: 'postgres://postgres@localhost:32768/amiibos',
    options: {
      benchmark: true
    }
  }
}