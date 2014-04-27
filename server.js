'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    http = require('http'),
    io = require('socket.io');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Populate empty DB with sample data
require('./lib/config/dummydata');

var app = express(),
    server = http.createServer(app),
    channel = io.listen(server);
// Express settings

// socket.io setup
var socket_api = require('./lib/controllers/socket_api')(server, channel);

require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app, socket_api);

server.listen(80);

// Expose app
exports = module.exports = app;