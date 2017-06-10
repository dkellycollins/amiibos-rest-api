const scrape = require('website-scraper');
const _ = require('lodash');
const $ = require('cheerio');
const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');

const URL = 'http://www.nintendo.com/amiibo/line-up';
const IGNORED_AMIIBOS = [
  /animal_crossing/,
  /mario_sports_superstars/
]

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
  return _.chain($containers)
    //Map parsed html to amiibo data.
    .map(function($container) {
      const name = $container.attribs.title;
      const $series = $html('span[itemprop="isRelatedTo"]', $container);
      var seriesName = $series.text();
      const $image = _.first($html('img[itemprop="image"]', $container));
      const $releaseDate = _.last($html('.b8', $container));
      const releaseDate = $releaseDate.children[0].data;

      seriesName = seriesName.replace('series', '').trim();

      return {
        name: _.snakeCase($container.attribs.title),
        displayName: $container.attribs.title,
        series: {
          name: _.snakeCase(seriesName),
          displayName: seriesName
        },
        image: $image.attribs.src,
        releaseDate: parseReleaseDate(releaseDate)
      };
    })
    //Handle duplicate amiibos
    .groupBy('name')
    .map((group) => {
      if(group.length > 1) {
        _.forEach(group, (item, index) => {
          item.name += '_' + index;
        });
      }

      return group;
    })
    .flatten()
    .value();
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

function isIgnoredAmiibo(amiiboName) {
  return _.some(IGNORED_AMIIBOS, (ignoredAmiibo) => ignoredAmiibo.test(amiiboName));
}

function processImages(ds) {
  console.log('Processing images...');

  const promises = _.map(ds, function (amiibo) {
    if(isIgnoredAmiibo(amiibo.name)) {
      return Promise.resolve();
    }

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

function saveAmiiboSeriesJson(ds) {
  const json = _.chain(ds)
    .map('series')
    .uniqBy('name')
    .map(function (data) {
      return {
        name: data.name,
        displayName: data.displayName
      }
    })
    .value();

  return new Promise(function(resolve, reject) {
    fs.outputFile('./dest/amiiboSeries.json', JSON.stringify(json), function(err) {
      if(!!err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

function saveAmiibosJson(ds) {
  console.log('Saving json...');

  const json = _.chain(ds)
    .reject(function(data) {
      return isIgnoredAmiibo(data.name);
    })
    .map(function(data) {
      var series = (!!data.series)
        ? {
          name: data.series.name,
          displayName: data.series.displayName
        }
        : (void 0);

      return {
        name: data.name,
        displayName: data.displayName,
        series: series,
        releaseDate: data.releaseDate
      };
    })
    .value();

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
        saveAmiibosJson(ds),
        //saveAmiiboSeriesJson(ds)
      ]);
    })
    .then(function() { console.log('Success!'); })
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
}

run(URL, false);