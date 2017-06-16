#!/usr/bin/env node

/**
 * The trackerTimer.
 * @namespace trackertimer
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138 on GitHub}
 */

/**
 * Require the 3rd party modules that will be used.
 * @see {@link https://github.com/petkaantonov/bluebird bluebird}
 */
const P = require("bluebird");

/**
 * Require the local modules/functions that will be used.
 */
const spawns = require("./spawns.js");


spawns.spawner({
  "command": "phantomjs",
  "argsArray": ["--version"]
});