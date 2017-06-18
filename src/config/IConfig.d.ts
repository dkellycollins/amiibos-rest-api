export interface IConfig {
  server: {
    env: string;
    port: number;
  };

  redis: any;
  
  sequelize: {
    url: string,
    options: any
  };
}