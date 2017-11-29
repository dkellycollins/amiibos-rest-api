import * as passport from 'passport';

export {localApiKeyStrategyFactory} from './LocalApiKeyStrategyFactory';

export const AuthenticateLocalApiKey = passport.authenticate('localapikey', {session: false});
