const scrape = require('website-scraper');
const _ = require('lodash');
const $ = require('cheerio');
const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');

const URL = 'http://www.nintendo.com/amiibo/line-up';

function readCache() {
  console.log('Reading from cache...');

  return new Promise(function(resolve, reject){
    fs.readFile('./bin/index.html', 'utf8', function(err, data) {
      if(!!err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
}

function downloadSource(url) {
  console.log(`Downloading data from ${url}`);

  return scrape({
      urls: [url],
      directory: './bin',
      sources: [
        {selector: 'img[itemprop="image"]', attr: 'src'}
      ]
    })
    .then(function (result) {
      const resource = _.first(result);
      return resource.text;
    });
}

function parseSource(result) {
  console.log('Parsing data...');

  const $html = $.load(result);

  const $containers = $html('a[data-index]');
  return _.map($containers, function($container) {
    const name = $container.attribs.title;
    const $series = $html('span[itemprop="isRelatedTo"]', $container);
    const seriesName = $series.text();
    const $image = _.first($html('img[itemprop="image"]', $container));
    const $releaseDate = _.last($html('.b8', $container));
    const releaseDate = $releaseDate.children[0].data;

    return {
      name: _.snakeCase($container.attribs.title),
      displayName: $container.attribs.title,
      series: seriesName.replace('series', '').trim(),
      image: $image.attribs.src,
      releaseDate: parseReleaseDate(releaseDate)
    };
  });
}

function parseReleaseDate(releaseDate) {
  if(!releaseDate) {
    return null;
  }

  releaseDate = releaseDate.replace('Available', '');
  momentDate = moment(releaseDate, ['MMMM YYYY', 'MM/DD/YYYY']);

  if(!momentDate.isValid()) {
    console.warn('Failed to parse date: ' + releaseDate);
    return null;
  }

  return momentDate.format('YYYY-MM-DD');
}

function processImages(ds) {
  console.log('Processing images...');

  const promises = _.map(ds, function (amiibo) {
    var srcPath = path.join('./bin', amiibo.image);
    var destPath = path.join('./dest/images', amiibo.name + '.png');

    return new Promise(function(resolve, reject) {
      fs.copy(srcPath, destPath, function(err) {
        if(!!err) {
          reject(err);
        }
        else {
          resolve();
        }
      })
    })

    fs.copySync(srcPath, destPath);
  });

  return Promise.all(promises);
}

function saveJson(ds) {
  console.log('Saving json...');

  const json = _.map(ds, function(data) {
    return {
      name: data.name,
      displayName: data.displayName,
      series: data.series,
      releaseDate: data.releaseDate
    };
  });

  return new Promise(function(resolve, reject) {
    fs.outputFile('./dest/amiibos.json', JSON.stringify(json), function(err) {
      if(!!err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

function clean(clearCache) {
  fs.removeSync('./dest');

  if(clearCache) {
    fs.removeSync('./bin');
  }
}

function run(url, clearCache) {
  clean(clearCache);
  
  const cacheExists = fs.existsSync('./bin/index.html');
  const promise = (!cacheExists)
    ? downloadSource(url)
    : readCache();

  promise
    .then(parseSource)
    .then(function(ds) {
      return Promise.all([
        processImages(ds),
        saveJson(ds)
      ]);
    })
    .then(function() { console.log('Success!'); })
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
}

run(URL, true);