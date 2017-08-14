#!/usr/bin/env node

'use strict'

/**
 * Application end points (routes) for the trackerTimer API server.
 * @author {@link https://github.com/jmg1138 jmg1138}
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
 * Handle a request to the root route.
 * @param  {Object} req The expressjs request
 * @param  {Object} res The expressjs response
 */
function rootRoute (req, res) {
  return new Promise(resolve => {
    respond.success(res, 'This is the trackerTimer API server.', {
      headers: req.headers
    })
    resolve()
  })
}

/**
 * Handle a request for a URL performance report.
 * @param  {Object} req The expressjs request
 * @param  {Object} res The expressjs response
 */
async function performanceReport (req, res) {
  let output = await spawns.spawner(
    phantomjs.path,
    [path.join(__dirname, 'confess.js'), req.query.url, 'performance']
  )
  respond.success(res, "Here's the output in a json object.", output)
}

/**
 * Define the expressjs routes.
 * @param {object} express - The expressjs instance.
 */
function router (express) {
  express.get('/', (req, res) => {
    if (req.query.url !== undefined) performanceReport(req, res)
    else rootRoute(req, res)
  })
}
exports.router = router
