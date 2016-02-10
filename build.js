#!/usr/bin/env node
var packager = require('electron-packager');
var proc = require('child_process');

var opts = {
  "dir": ".",
  "name": "RPH",
  "all": true,
  "version": "0.36.2",
  "icon": "resources/rph-icon",
  "out": "build",
  "prune": 1,
  "asar": 1,
  "ignore": "(resources|dist|build|node_modules/(electron\-.*))",
  "app-version": process.argv[3]
};
packager(opts, function done (err, appPath) {});
