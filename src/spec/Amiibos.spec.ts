import './_Setup.spec';
import * as _ from 'lodash';
import * as request from 'supertest';
import {APP} from '../server';
import {given_the_amiibos} from './helpers/AmiiboHelpers';

describe('GET /amiibos', function() {

  it('returns an amiibo when given a name', testSearch({
    amiibos: [
      {
        name: 'test_1',
        displayName: 'test one'
      },
      {
        name: 'test_2',
        displayName: 'test two'
      }],
    query: {
      name: 'test_1'
    },
    expected: [{
      name: 'test_1',
      displayName: 'test one',
      releaseDate: null
    }]
  }));

  it('returns all amiibos in a series', testSearch({
    amiibos: [
      {
        name: 'test_1',
        displayName: 'test1',
        series: {
          name: 'test_series_1',
          displayName: 'testSeries1'
        }
      },
      {
        name: 'test_2',
        displayName: 'test2',
        series: {
          name: 'test_series_2',
          displayName: 'testSeries2'
        }
      }
    ],
    query: {
      series: 'test_series_1'
    },
    expected: [{
      name: 'test_1',
      displayName: 'test1',
      series: {
        name: 'test_series_1',
        displayName: 'testSeries1'
      },
      releaseDate: null
    }]
  }));

  it('does not return results for a non-existant name', testSearch({
    amiibos: [{
      name: 'test_1',
      displayName: 'test1',
      series: {
        name: 'test_series_1',
        displayName: 'testSeries1'
      }
    }],
    query: {
      name: 'test_2'
    },
    expected: []
  }));

  it('does not return results for a non-existant series', testSearch({
    amiibos: [{
      name: 'test_1',
      displayName: 'test1',
      series: {
        name: 'test_series_1',
        displayName: 'testSeries1'
      }
    }],
    query: {
      series: 'test_series_2'
    },
    expected: [] 
  }));

  function testSearch(opts) {
    return async function() {
      const r = request(APP);
      await given_the_amiibos(r, opts.amiibos);

      const query = _.map(opts.query, (value, key) => `${key}=${value}`).join('&');
      return await request(APP)
        .get(`/amiibos?${query}`)
        .expect(opts.expectedStatus || 200, opts.expected);
    };
  }

});

describe('PUT /amiibos', function() {

  it('successfully creates a new amiibo', testSave({
    amiibos: [],
    request: [
      {
        name: 'test_1',
        displayName: 'test1'
      }
    ],
    expected: [{
      name: 'test_1',
      displayName: 'test1',
      releaseDate: null
    }]
  }));

  it('updates an existing amiibo with the same name', testSave({
    amiibos: [{
      name: 'test_1',
      displayName: 'test1'
    }],
    request: [{
      name: 'test_1',
      displayName: 'test1-old',
      releaseDate: '1970-01-01'
    }],
    expected: [{
      name: 'test_1',
      displayName: 'test1-old',
      releaseDate: '1970-01-01'
    }]
  }));

  it('successfully creates a series for a new amiibos', testSave({
    amiibos: [],
    request: [{
      name: 'test_1',
      displayName: 'test1',
      series: {
        name: 'test_series_1',
        displayName: 'testSeries1'
      }
    }],
    expected: [{
      name: 'test_1',
      displayName: 'test1',
      releaseDate: null,
      series: {
        name: 'test_series_1',
        displayName: 'testSeries1'
      }
    }]
  }));

  function testSave(opts) {
    return async function() {
      const r = request(APP);
      await given_the_amiibos(r, opts.amiibos);

      return await r.put('/amiibos')
        .set('Content-Type', 'application/json')
        .set('apikey', '1234abcd')
        .send(opts.request)
        .expect(opts.expectedStatus || 200, opts.expected);
    };
  }
});

describe('DELETE /amiibos/:name', function() {

  it('sucessfully removes an amiibo', testRemove({
    amiibos: [
      {
        name: 'test_1',
        displayName: 'test1'
      }
    ],
    name: 'test_1'
  }));

  it.skip('fails to remove a non-existant amiibo', testRemove({
    amiibos: [
      {
        name: 'test_1',
        displayName: 'test1'
      }
    ],
    name: 'test_1',
    expectedStatus: 404
  }));

  function testRemove(opts) {
    return async function() {
      const r = request(APP);
      await given_the_amiibos(r, opts.amiibos);

      return await r.delete(`/amiibos/${opts.name}`)
        .set('apikey', '1234abcd')
        .expect(opts.expectedStatus || 200);
    };
  }

});
