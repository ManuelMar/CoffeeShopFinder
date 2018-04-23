const express = require('express');
const prodConfig = require('./config/prod');
const importData = require('./data/importCSV');
const shopSchema = require('./models/shop');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require('./routes/locationRoutes')(app);

importData.instantiate().then(() => {
  console.log(importData.maxId);
  //Set server to listen on PORT 5000 after data is ingested
  PORT = process.env.PORT || prodConfig.port;
  app.listen(PORT);
});
