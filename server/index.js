var path = require('path');

var express = require('express');
var pouchDb = require('pouchdb');
var expressPouchDb = require('express-pouchdb');
var pouchDbUpsert = require('pouchdb-upsert');
var pouchDbAuthentication = require('pouchdb-authentication');

var server = express({
  // config
});

expressPouchDbApplication = expressPouchDb(pouchDb, {
  // configPath: a path to the configuration file to use. Defaults to './config.json'.
  // mode: determines which parts of the HTTP API express-pouchdb offers are enabled. There are three values:
  // 'fullCouchDB': enables every part of the HTTP API, which makes express-pouchdb very close to a full CouchDB replacement. This is the default.
  // 'minimumForPouchDB': just exposes parts of the HTTP API that map 1-1 to the PouchDB api. This is the minimum required to make the PouchDB test suite run, and a nice start when you just need an HTTP API to replicate with.
  // 'custom': no parts of the HTTP API are enabled. You can add parts yourself using the opts.overrideMode discussed below.
  // overrideMode: Sometimes the preprogrammed modes are insufficient for your needs, or you chose the 'custom' mode. In that case, you can set this to an object. This object can have the following properties:
  // 'include': a javascript array that specifies parts to include on top of the ones specified by opts.mode. Optional.
  // 'exclude': a javascript array that specifies parts to exclude from the ones specified by opts.mode. Optional.
});

expressPouchDbLogger = expressPouchDbApplication.couchLogger;

server.use('/db', expressPouchDbApplication);

var subPouch = new pouchDb('app');
// make a pouchdb instance available at /db/app

server.use(express.static(path.resolve(__dirname, '../client/')));

server.listen(8099);

module.exports = server;
