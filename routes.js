#!/usr/bin/env node

/**
 * The application end points (routes) for the Grocereport API server.
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138}
 */

'use strict'

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
 * @param {object} app - The Express application instance.
 * @see {@link https://expressjs.com/en/guide/routing.html Express routing}
 * @see {@link http://expressjs.com/en/api.html Express API}
 */
const router = (app) => {
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
  app.get('/', (req, res) => {
    if (req.query.url !== undefined) {
      spawns.spawner({
        'command': phantomjs.path,
        'argsArray': [
          path.join(__dirname, 'confess.js'),
          req.query.url,
          'performance'
        ]
      })
        .then(output => {
          respond.success(res, "Here's the output in a json object.", output)
        })
        .catch(err =>
          respond.error(res, err)
        )
    } else {
      respond.success(res, 'This is the trackerTimer API server.', {
        headers: req.headers
      })
    }
  })
}

/**
 * Assign our appRouter object to module.exports.
 * @see {@link https://nodejs.org/api/modules.html#modules_the_module_object Nodejs modules: The module object}
 * @see {@link https://nodejs.org/api/modules.html#modules_module_exports Nodejs modules: module exports}
 */
module.exports = router
