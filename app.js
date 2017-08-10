#!/usr/bin/env node

'use strict'

/**
 * trackerTimer API.
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Require the modules that will be used.
 * @see {@link https://github.com/expressjs/cors cors}
 * @see {@link https://github.com/expressjs/express Express}
 * @see {@link https://github.com/helmetjs Helmet}
 */
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const routes = require('./routes.js')

/**
 * Instantiate the Express application, define all app configurations here, and
 * then define routes last.
 */
const app = express()
app.use(helmet())
app.use(cors())
app.set('json spaces', 2)
routes(app)

/**
 * Listen for connections on the specified port.
 */
const port = parseInt(process.env.PORT, 10) || 1138
app.listen(port, () => console.log(`Listening on port ${port}.`))
app.on('error', err => console.log(err.message))

module.exports = app // For supertest
