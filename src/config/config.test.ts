export const CONFIG = {
  server: {
    env: "test"
  },
  redis: {
    host: "localhost",
    port: "32769",
    db: 1
  },
  sequelize: {
    url: 'postgres://postgres@localhost:32768/amiibos_test',
    options: {
      logging: false
    }
  }
}