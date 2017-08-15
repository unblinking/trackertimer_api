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
const validUrl = require('valid-url')

/**
 * Handle a request to the root route.
 * @param {Object} req The expressjs request.
 * @param {Object} res The expressjs response.
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
 * Validate that an http req query string parameter 'url' is properly formatted.
 * @param {Object} req The expressjs request.
 */
function validateUrl (url) {
  return new Promise(resolve => {
    let validatedUrl = validUrl.isWebUri(url)
    resolve(validatedUrl)
  })
}

/**
 * Generate a network analysis report and send it with expressjs response.
 * @param {Object} url The http or https URL to be analyzed.
 * @param {Object} res The expressjs response.
 */
async function performanceReport (url, res) {
  let output = await spawns.childProcess(
    phantomjs.path,
    [path.join(__dirname, 'confess.js'), url, 'performance']
  )
  respond.success(res, "Here's the output.", output)
}

/**
 * Handle a request for a URL performance report.
 * @param {Object} req The expressjs request.
 * @param {Object} res The expressjs response.
 */
async function urlQueryStringReceived (req, res) {
  let url = await validateUrl(req.query.url)
  if (url !== undefined) performanceReport(url, res)
  else respond.error(res, 'Invalid URL')
}

/**
 * Define the expressjs routes.
 * @param {Object} express - The expressjs instance.
 */
function router (express) {
  express.get('/', (req, res) => {
    if (req.query.url !== undefined) urlQueryStringReceived(req, res)
    else rootRoute(req, res)
  })
}
exports.router = router
