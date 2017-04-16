import * as _ from 'lodash';
import * as yargs from 'yargs';

export interface IConfig {
  server: {
    env: string;
    port: number;
  };

  mongo: any
}

const env = yargs.argv.env;

console.log(`Loading config for env: [${env || 'default'}]`);

export const Config: IConfig = (!!env)
  ? _.merge(require('./config.json'), require(`./config.${env}.json`))
  : require('./config.json')

