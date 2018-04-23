const fs = require('fs');
const prodConfig = require('../config/prod');
const parse = require('csv-parse');
const _ = require('lodash');

const ingestShops = function ingest() {
  let data = [];
  // Implement Error handling
  return new Promise((res, rej) => {
    fs.readFile(prodConfig.pathData, (err, csvData) => {
      parse(csvData, (err, rows) => {
        res({ rows });
      });
    });
  });
};

// array or object list
let coffeeShops = {};
// keep track of maxId for creating new coffeeShops
let maxId = 0;

const instantiate = function instantiate() {
  return ingestShops().then(data => {
    _.map(data.rows, row => {
      coffeeShops[row[0]] = {
        id: parseInt(row[0], 10),
        name: row[1],
        adress: row[2],
        latitude: parseFloat(row[3]),
        longitude: parseFloat(row[4])
      };
      module.exports.maxId = parseInt(row[0], 10);
    });
  });
};

module.exports = {
  maxId,
  instantiate,
  ingestShops,
  coffeeShops
};
