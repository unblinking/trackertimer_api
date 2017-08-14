#!/usr/bin/env node

'use strict'

/**
 * Response related utilities.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

function error (res) {
  return new Promise(resolve => {
    res.status(200).json({'status': 'error', 'message': 'There was an error.'})
    resolve()
  })
}
exports.error = error

function success (res, message, json) {
  return new Promise(resolve => {
    res.status(200).json({'status': 'success', 'message': message, 'json': json})
    resolve()
  })
}
exports.success = success
