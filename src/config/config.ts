import * as Sequelize from 'sequelize';

export const CONFIG = {
  server: {
    port: 3000,
    apiKey: '1234abcd'
  },
  redis: {},
  sequelize: {
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
  }
}