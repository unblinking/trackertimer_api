#!/usr/bin/env node

/**
 * Response related utilities.
 * @namespace respond
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Invoke strict mode for the entire script.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode Strict mode}
 */
"use strict";

/**
 * Require the 3rd party modules that will be used.
 * @see {@link https://github.com/tjmehta/error-to-json error-to-json}
 */
const err2json = require("error-to-json");

/**
 *
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
      "status": "error",
      "message": err.message,
      "json": err2json(err)
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
      "status": "success",
      "message": message,
      "json": json
    })

};

/**
 * Assign our object to module.exports.
 * @see {@link https://nodejs.org/api/modules.html#modules_the_module_object Nodejs modules: The module object}
 * @see {@link https://nodejs.org/api/modules.html#modules_module_exports Nodejs modules: module exports}
 */
module.exports = respond;
