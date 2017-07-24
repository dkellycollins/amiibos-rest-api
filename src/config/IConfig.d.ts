export interface IConfig {
  server: {
    env: string;
    port: number;
    apiKey: string;
  };

  redis: any;
  
  sequelize: {
    url: string,
    options: any
  };
}