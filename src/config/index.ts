import * as _ from 'lodash';
export {IConfig} from './IConfig';

const env = process.env.NODE_ENV;
console.log(`Loading config for env: [${env || 'default'}]`);

const defaultConfig = require('./config').CONFIG;
const envConfig = require(`./config.${env}`).CONFIG;

export const Config = _.merge(defaultConfig, envConfig);

