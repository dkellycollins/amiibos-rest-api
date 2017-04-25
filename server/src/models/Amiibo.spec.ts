
require('../helpers/setup.spec');

import container from '../container';
import {TYPES} from '../types';
import {IAmiibo} from './Amiibo';

describe('AmiiboModel.create', () => {

  it('should successfully create a model instance', test({
    model: {
      name: 'test_amiibo',
      displayName: 'Test Amiibo',
      releaseDate: '1970-01-01',
      amiibo_series_id: '1'
    },
    expected: {
      _id: null,
      name: 'test_amiibo',
      displayName: 'Test Amiibo',
      releaseDate: '1970-01-01',
      amiibo_series_id: '1',
      series: null
    }
  }))

  it('should successfully create a model when an optional property is missing', test({
    model: {
      name: 'test_amiibo',
      displayName: 'Test Amiibo',
      amiibo_series_id: '1'
    },
    expected: {
      _id: null,
      name: 'test_amiibo',
      displayName: 'Test Amiibo',
      releaseDate: null,
      amiibo_series_id: '1',
      series: null
    }
  }))

  it('should fail if a required parameter is missing', test({
    model: {
      name: null,
      displayName: 'Test Amiibo',
      releaseDate: '1970-01-01',
      amiibo_series_id: '1'
    },
    shouldFail: true
  }))

  it('should fail if an invalid id is given for "amiibo_series_id"', test({
    model: {
      name: 'test_amiibo',
      displayName: 'Test Amiibo',
      releaseDate: '1970-01-01',
      amiibo_series_id: '100'
    },
    shouldFail: true
  }))

  it('should fail if a duplicate name is provided')

  function test(opts) {
    return function() {
      const amiiboModel = container.get<any>(TYPES.Models.AmiiboModel);
      const amiiboPromise = amiiboModel.create(opts.model);

      if(opts.shouldFail) {
        amiiboPromise.should.be.rejected;
      }
      else {
        amiiboPromise.should.be.fullfilled;
        amiiboPromise.should.eventually.deep.equal(opts.expected);
      }

      return amiiboPromise
    }
  }
});

