import { Container } from 'inversify';

const env = process.env.NODE_ENV;
if(!env) {
  throw new Error(`Environment not found. NODE_ENV must be specified when running services.`);
}

const defaultContainer = require('./container').container;
const envContainer = require(`./container.${env}`).container;

export default Container.merge(defaultContainer, envContainer);
