#!/usr/bin/env node

'use strict'

/**
 * Expressjs API for the trackerTimer.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Modules that will be used.
 * @see {@link https://github.com/expressjs/cors cors}
 * @see {@link https://github.com/expressjs/express express}
 * @see {@link https://github.com/aredo/express-enforces-ssl express-enforces-ssl}
 * @see {@link https://github.com/helmetjs helmet}
 * @see {@link https://nodejs.org/api/http.html http}
 */
const cors = require('cors')
const expressjs = require('express')
const expressEnforcesSSL = require('express-enforces-ssl')
const helmet = require('helmet')
const http = require('http')
const routes = require('./routes.js')

/**
 * Instantiate the express.js application.
 */
function expressInstance () {
  return new Promise(resolve => {
    let express = expressjs()
    resolve(express)
  })
}

/**
 * Configure the express.js application.
 * Define all express configurations here (except routes, define routes last).
 * @param {Object} express The expressjs instance.
 */
function expressConfigure (express) {
  return new Promise(resolve => {
    express.use(helmet())
    if (process.env.NODE_ENV === 'production') express.use(expressEnforcesSSL())
    express.use(cors())
    express.set('json spaces', 2)
    resolve()
  })
}

/**
 * Define the express.js routes.
 * @param {Object} express The expressjs instance.
 * @see {@link https://expressjs.com/en/guide/routing.html Express routing}
 */
function expressRoutes (express) {
  return new Promise(resolve => {
    routes.router(express)
    resolve()
  })
}

/**
 * Define the express.js error handling middleware.
 * @param {Object} express The expressjs instance.
 */
function expressErrors (express) {
  return new Promise(resolve => {
    express.use((req, res, next) => res.status(404).render('four, oh four!'))
    express.use((err, req, res, next) => {
      res.status(500).send('Something broke!')
      console.log(err.message)
    })
    // express.on('error', err => console.log(err.message))
    resolve()
  })
}

/**
 * Instantiate the http server.
 * @param {Object} express The expressjs instance.
 */
function serverInstance (express) {
  return new Promise(resolve => {
    let server = http.Server(express)
    resolve(server)
  })
}

/**
 * Listen for http server connections.
 * @param {Object} server The http server instance.
 */
function serverListen (server) {
  return new Promise(resolve => {
    const port = parseInt(process.env.PORT, 10) || 1138
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`)
      resolve()
    })
  })
}

/**
 * Create the API parts in proper order.
 */
async function create () {
  let express = await expressInstance()
  await expressConfigure(express)
  await expressRoutes(express)
  await expressErrors(express)
  let server = await serverInstance(express)
  await serverListen(server)
}
exports.create = create // For supertest

create()
