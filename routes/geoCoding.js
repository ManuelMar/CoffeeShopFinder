const importData = require('../data/importCSV');
const geoCoder = require('node-geocoder');
const prodConfig = require('../config/prod');
const geodist = require('geodist');

const geo = geoCoder(prodConfig.geoCoderConf);

const findNearest = function findNearest(address, shopData) {
  return geo.geocode(address).then(loc => {
    if (loc) {
      //console.log(loc);
      qryLoc = { lat: loc[0].latitude, lon: loc[0].longitude };

      let minDist = null;
      let nearShop = null;

      for (var key in importData.coffeeShops) {
        let s = importData.coffeeShops[key];
        curLoc = { lat: s.latitude, lon: s.longitude };

        let dist = geodist(qryLoc, curLoc, { exact: true, unit: 'km' });

        if (minDist === null || dist < minDist) {
          minDist = dist;
          nearShop = s;
        }
      }
      console.log(nearShop);
      return nearShop;
    } else {
      return null;
    }
  });
};

module.exports = {
  findNearest
};
