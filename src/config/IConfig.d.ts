export interface IConfig {
  server: {
    env: string;
    port: number;
  };
  
  sequelize: {
    url: string,
    options: any
  };
}