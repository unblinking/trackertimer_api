#!/usr/bin/env node

'use strict'

/**
 * The trackerTimer.
 * @namespace trackertimer
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138 on GitHub}
 */

/**
 * Require the 3rd party modules that will be used.
 * @see {@link https://github.com/expressjs/express Express}
 * @see {@link https://github.com/helmetjs Helmet}
 */
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

/**
 * Require the local modules that will be used.
 */
const routes = require('./routes.js')

/**
 * Define the port for the application entry point to listen on.
 * Use port 1138 if environmental variable PORT is not defined.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt MDN JavaScript parseInt}
 */
const port = parseInt(process.env.PORT, 10) || 1138

/**
 * Define all app configurations here except routes (define routes last).
 * Instantiate the Express application.
 */
const app = express()
app.use(helmet())
app.use(cors())
app.set('json spaces', 2)

/**
 * Define routes last, after all other configurations.
 * @param {object} app - The Express application instance.
 */
routes(app)

/**
 * Listen for connections on the specified port.
 * @see {@link https://expressjs.com/en/api.html#app.listen Express API app.listen}
 */
app.listen(parseInt(process.env.PORT, 10) || 1138, function () {
  console.log('trackerTimer API listening.')
}).on('error', function (err) {
  console.log(err)
  // TODO: If error, try again a number of times and then give up.
})

module.exports = app // For testing with supertest
