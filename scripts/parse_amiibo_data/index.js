const scrape = require('website-scraper');
const _ = require('lodash');
const $ = require('cheerio');
const path = require('path');
const fs = require('fs-extra');

const URL = 'http://www.nintendo.com/amiibo/line-up';

function readCache() {
  console.log('Reading from cache...');

  return fs.readFileSync('./bin/index.html', 'utf8');
}

function downloadSource(url) {
  console.log(`Downloading data from ${url}`);

  return scrape({
    urls: [url],
    directory: './bin'
  })
  .then(function (result) {
    const resource = _.first(result);
    return resource.text;
  })
  .catch(handelError);
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

    return {
      name: _.snakeCase($container.attribs.title),
      displayName: $container.attribs.title,
      series: seriesName.replace('series', '').trim(),
      image: $image.attribs.src
    };
  });
}

function processImages(ds) {
  console.log('Processing images...');

  _.each(ds, function (amiibo) {
    var srcPath = path.join('./bin', amiibo.image);
    var destPath = path.join('./dest/images', amiibo.name + '.png');

    fs.copySync(srcPath, destPath);
  });
}

function saveJson(ds) {
  console.log('Saving json...');

  const json = _.map(ds, function(data) {
    return {
      name: data.name,
      displayName: data.displayName,
      series: data.series
    };
  });

  fs.writeFileSync('./dest/amiibos.json', JSON.stringify(json));
}

function run(url, clearCache) {
  const cacheExists = fs.existsSync('./bin/index.html');

  if(!fs.existsSync || clearCache) {
    downloadSource(url)
      .then(parseSource)
      .then(function(ds) {
        processImages(ds);
        saveJson(ds);
        console.log('Success!');
      });
  }
  else {
    const source = readCache();
    const ds = parseSource(source);
    processImages(ds);
    saveJson(ds);
    console.log('Success!');
  }
}

function handelError(error) {
  console.error(error);
}

run(URL, false);