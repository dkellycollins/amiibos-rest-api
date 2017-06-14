import * as _ from 'lodash';

export interface IConfig {
  server: {
    env: string;
    port: number;
  };

  mongo: any,
  redis: any
}

const env = process.env.NODE_ENV;

console.log(`Loading config for env: [${env || 'default'}]`);

export const Config: IConfig = (!!env)
  ? _.merge(require('./config.json'), require(`./config.${env}.json`))
  : require('./config.json')

