
require('../helpers/setup.spec');

import container from '../container';
import {TYPES} from '../types';
import {IAmiibo} from './Amiibo';

describe('AmiiboModel.create', () => {

  it('should successfully create a model instance', () => {
    const model = {
      name: 'test_amiibo',
      displayName: 'Test Amiibo',
      releaseDate: '1970-01-01',
      amiibo_series_id: '1    '
    };

    const expected: IAmiibo = {
      _id: null,
      name: 'test_amiibo',
      displayName: 'Test Amiibo',
      releaseDate: '1970-01-01',
      amiibo_series_id: '1',
      series: null
    }

    test(model, expected);
  })

  it('should fail if a required parameter is missing')
  it('should fail if an invalid id is given for "amiibo_series_id"')
  it('should fail if a duplicate name is provided')

  function test(model: any, expected: any, shouldFail: boolean = false) {
    const amiiboModel = container.get<any>(TYPES.Models.AmiiboModel);
    const amiiboPromise = amiiboModel.create(model);

    if(shouldFail) {
      amiiboPromise.should.be.rejected;
    }
    else {
      amiiboPromise.should.be.fullfilled;
      amiiboPromise.should.eventually.deep.equal(expected);
    }
  }
});

