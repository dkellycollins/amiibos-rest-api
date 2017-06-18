export const CONFIG = {
  server: {
    env: "test"
  },
  mongo: {
    debug: false,
    uri: "mongodb://localhost:32768/amiibos_test"
  },
  redis: {
    host: "localhost",
    port: "32769",
    db: 1
  },
  sequelize: {
    url: 'postgres://postgres@localhost:32769/amiibos_test',
    options: {
      logging: false
    }
  }
}