const importData = require('../data/importCSV');
const yup = require('yup');
const Schema = require('../models/shop');
const geoCoding = require('./geoCoding');

module.exports = app => {
  app.get('/api/read', (req, res) => {
    res.send(200, importData.coffeeShops);
  });

  app.post('/api/create', async (req, res) => {
    data = req.body;
    nId = importData.maxId + 1;
    const shop = {
      id: nId,
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude
    };
    // yup will accept strings that contain numbers
    // need strict property enabled.
    Schema.schema.isValid(shop, { strict: true }).then(valid => {
      if (valid) {
        importData.maxId++;
        importData.coffeeShops[nId] = shop;
        console.log('Shop created succesfully');
        res.send(200, shop);
      } else {
        console.log('Invalid request');
        res.send(400);
      }
    });
  });

  app.put('/api/read/:id', async (req, res) => {
    console.log('read ');
    const sid = await req.params.id;
    if (sid) {
      if (importData.coffeeShops[sid]) {
        res.send(200, importData.coffeeShops[sid]);
      } else {
        res.send(400, 'Record does not exist');
      }
    } else {
      res.send(400, 'Invalid Request');
    }
  });

  app.post('/api/update', async (req, res) => {
    console.log('update');
    let data = req.body;
    let upId = data.id;
    Schema.schema.isValid(data, { strict: true }).then(valid => {
      if (valid) {
        if (importData.coffeeShops[upId]) {
          importData.coffeeShops[upId] = data;
          res.send(200, upId);
        } else {
          res.send(400, 'Record did not exist');
        }
      } else {
        res.send(400, 'Invalid Request');
      }
    });
  });

  app.delete('/api/delete/:id', async (req, res) => {
    console.log('delete');
    const delId = await req.params.id;
    if (delId) {
      if (importData.coffeeShops[delId]) {
        delete importData.coffeeShops[delId];
        res.send(200, delId);
      } else {
        res.send(400, 'Record did not exist');
      }
    } else {
      res.send(400, 'Invalid id');
    }
  });

  app.put('/api/read/nearest/:address', async (req, res) => {
    console.log('get nearest');
    const qryStr = req.params.address;
    geoCoding.findNearest(qryStr, importData.coffeeShops).then(nearestShop => {
      if (nearestShop) {
        res.send(200, nearestShop);
      } else {
        res.send(400, 'Invalid Address');
      }
    });
  });
};
