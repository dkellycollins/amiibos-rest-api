export interface IConfig {
  server: {
    env: string;
    port: number;
  };

  mongo: any;
  redis: any;
  sequelize: {
    url: string,
    options: any
  };
}