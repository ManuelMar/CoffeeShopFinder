# KinsaCoffeeShopFinder:
This simple REST API build on Node and Express provides endpoints to gain more information about the coffee shops that are "subscribed" to our service (input as csv). Per the spec, please note the data only lives on server memory and will not be persisted after restarting the server.
This API provides endpoints for the basic CRUD operations and also uses geocoding to return the nearest coffee shop.

### Getting Setup:
Ensure you are running Nodejs v8.x.x. You can download and install it from https://nodejs.org/en/

On a Mac with Home Brew:

`$ brew install node`

### Initializing Configuration:
Please review the file /config/prod.js and update the google geoCoderConf parameter to include your API key. Also feel free to modify the port parameter to suit your needs.

API Keys can be generated here after registering a project with google: https://developers.google.com/maps/documentation/geocoding/start

### Installing and Running KinsaCoffeeShopFinder:
To bootstrap the project and install dependencies clone this repository and run:

`$ npm install`

Then to run locally execute:

`$ npm run server`

For development and server reset on code changes:

`$ npm run dev`

to start up the server on the PORT specified in the config/prod.js file.

### CRUD End Point Overview With Examples:
## Create:
Add coffee shop in request to data store:
post /api/create

Example:
  `$ curl -i -H "Content-Type: application/json" -X POST -d '{"name":"Manny's Coffee Shop","address":"6514 Ridge Road","latitude":41.3869428,"longitude":-81.7353053}' http://localhost:5000/api/create`

## Read:
Return all location records
$ get /api/read

Example:
  `$ curl -i http://localhost:5000/api/read`

Return specific record matching id
$ put /api/read/:id

Example:
  `$ curl -i http://localhost:5000/api/read/3`

## Update:
Given an id and updated coffee shop information, modify the corresponding record

$ post /api/update

Example:
  `$ curl -i -H "Content-Type: application/json" -X POST -d '{"id": 2, "name":"Pam's Coffee Shop","address":"6513 Ridge Road","latitude":41.3869428,"longitude":-81.7353053}' http://localhost:5000/api/update`

## Delete:
Delete record with given id:

$ delete /api/delete

Example:
`$ curl -i -X "DELETE" http://localhost:5000/api/delete/3`

## Find Nearest
Find nearest coffee shop to given address string

$ put /api/read/nearest/:address

Example:
`$ curl -i localhost:5000/api/read/nearest/535%20Mission%20StSan%20Francisco,%20CA`
