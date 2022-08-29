#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils.js");
const usage = "\nUsage: pab <ComponentName> component to create";
yargs.usage(usage).help(true).argv;

if (yargs.argv._[0] == null) {
  utils.showHelp(usage);
  return;
}

const isJavaScript = !!yargs.argv._[1];
utils.createComponent(yargs.argv._[0], isJavaScript);
