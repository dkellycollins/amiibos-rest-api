
export const CONFIG = {
  server: {
    env: "production",
    port: process.env.PORT
  },
  sequelize: {
    url: process.env.DATABASE_URL,
    options: {
      logging: false
    }
  }
}