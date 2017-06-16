#!/usr/bin/env node

/**
 * The trackerTimer.
 * @namespace trackertimer
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138 on GitHub}
 */

/**
 * Require the local modules/functions that will be used.
 */
const spawns = require("./spawns.js");

spawns.spawner({
  "command": "phantomjs",
  "argsArray": ["--version"]
});
