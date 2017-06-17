import * as _ from 'lodash'

export function ifNotNull<TValue, TReturn>(value: TValue, action: (v: TValue) => TReturn, defaultValue?: TReturn): TReturn {
  const isNull = _.isNull(value) || _.isUndefined(value);
  if(isNull) {
    return defaultValue;
  }

  return action(value);
}