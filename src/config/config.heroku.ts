
export const CONFIG = {
  server: {
    env: "production",
    port: process.env.PORT,
    apiKey: process.env.LOCAL_API_KEY
  },
  sequelize: {
    url: process.env.DATABASE_URL,
    options: {
      logging: false
    }
  }
}