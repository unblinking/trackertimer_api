#!/usr/bin/env node

'use strict'

/**
 * Application end points (routes) for the trackerTimer API server.
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Modules that will be used.
 * @see {@link https://nodejs.org/api/path.html path}
 * @see {@link https://github.com/Medium/phantomjs phantomjs-prebuilt}
 */
const path = require('path')
const phantomjs = require('phantomjs-prebuilt')
const respond = require('./respond')
const spawns = require('./spawns.js')

/**
 * Router
 * @param {object} express - The Expressjs instance.
 * @see {@link https://expressjs.com/en/guide/routing.html Express routing}
 * @see {@link http://expressjs.com/en/api.html Express API}
 */
const router = express => {
  /**
   * GET request to the root route. Responds with a JSend-compliant response.
   * @function
   * @memberof! routes.router
   * @example
   * const request = require("request");
   * request("https://trackertimerapi.herokuapp.com/",
   *   function(err, res, body) {
   *     if (!err && res.statusCode == 200) {
   *       console.log(body);
   *     }
   *   });
   */
  express.get('/', (req, res) => {
    if (req.query.url !== undefined) {
      // spawns.spawner('node', ['--version'])
      spawns.spawner(phantomjs.path, [path.join(__dirname, 'confess.js'), req.query.url, 'performance'])
        .then(output => {
          respond.success(res, "Here's the output in a json object.", output)
        })
        .catch(err => {
          console.log(err)
          respond.error(res, err)
        })
    } else {
      respond.success(res, 'This is the trackerTimer API server.', {
        headers: req.headers
      })
    }
  })
}

module.exports = router
