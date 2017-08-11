#!/usr/bin/env node

'use strict'

/**
 * Response related utilities.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Modules that will be used.
 * @see {@link https://github.com/tjmehta/error-to-json error-to-json}
 */
const err2json = require('error-to-json')

/**
 * Respond.
 */
const respond = {

  /**
   * Send the Express HTTP response with error information.
   * @param {Object} res HTTP res that Express sends when it gets a req.
   * @param {Error} err Error object to include with the res.
   */
  error: (res, err) =>
    res
      .status(200)
      .json({
        'status': 'error',
        'message': err.message,
        'json': err2json(err)
      }),

  /**
   * Send the Express HTTP response with success information.
   * @param {Object} res HTTP res that Express sends when it gets a req.
   * @param {String} message Message to include with the res.
   * @param {Object} json Object to include with the res.
   */
  success: (res, message, json) =>
    res
      .status(200)
      .json({
        'status': 'success',
        'message': message,
        'json': json
      })

}

module.exports = respond
