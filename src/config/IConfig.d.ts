export interface IConfig {
  server: {
    env: string;
    port: number;
    apiKey: string;
  };
  
  sequelize: {
    url: string,
    options: any
  };
}