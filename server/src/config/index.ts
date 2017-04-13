import * as _ from 'lodash';

export interface IConfig {
  server: {
    env: string;
    port: number;
  };

  mongo: any
}

const env = process.argv[2];

export const Config: IConfig = (!!env)
  ? _.merge(require('./config.json'), require(`./config.${env}.json`))
  : require('./config.json')

