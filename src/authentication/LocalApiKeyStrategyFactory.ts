import {interfaces} from 'inversify';
import {Strategy} from 'passport';
import {Strategy as LocalApiKeyStrategy} from 'passport-localapikey';
import {IAccount} from '../models';
import {IConfig} from '../config';
import {TYPES} from '../types';

export function localApiKeyStrategyFactory(context: interfaces.Context): Strategy {
  const config = context.container.get<IConfig>(TYPES.Config);

  function verify(apiKey: string, done: any) {
    if(apiKey !== config.server.apiKey) {
      return done(new Error('Invalid Api Key.'));
    }

    const user: IAccount = {
      identity: 'System'
    };
    return done(null, user);
  }

  return new LocalApiKeyStrategy({apiKeyHeader: 'x-api-key'}, verify);
}