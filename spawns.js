#!/usr/bin/env node

/**
 * The child process wrapper functions for the trackertimer.
 * @namespace spawns
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138 on GitHub}
 */

/**
 * Invoke strict mode for the entire script.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode Strict mode}
 */
"use strict";

/**
 * Require the 3rd party modules that will be used.
 * @see {@link https://github.com/petkaantonov/bluebird bluebird}
 * @see {@link https://nodejs.org/api/child_process.html child process}
 */
const P = require("bluebird");
const spawn = require("child_process").spawn;

/**
 * Module to be exported, containing the spawn child process wrapper functions.
 */
const spawns = {

  /**
   * Child process spawner.
   * @param {Object} data An object containing the command and arguments-array
   * to be spawned.
   * @example
   * const spawns = require("./spawns.js");
   * spawns.spawner({
   *   "command": "echo",
   *   "argsArray": ["This is a test"]
   * });
   */
  spawner: data => {

    /**
     * 
     */
    return new P((resolve, reject) =>
      handleNoDataProvided(data)
        .then(data => handleNoCommandProvided(data))
        .then(data => spawnTheCommandAsChildProcess(data))
        .then(proc => handleProcessOutput(proc))
        .timeout( // @see {@link http://bluebirdjs.com/docs/api/timeout.html timeout}
          10000 // 10,000 ms (10 seconds)
        ) // If the process takes too long, reject with a TimeoutError.
        .then(output => resolve(output))
        .catch(err => reject(err)));

    /**
     * Handle the case where data isn't defined.
     * Set the command and args to echo "No data provided" when spawned.
     * @param {Object} data
     */
    function handleNoDataProvided(data) {
      return new P(resolve => {
        if (!data) {
          data = {};
          data.command = "echo";
          data.argsArray = ["No data provided"];
        }
        resolve(data);
      });
    }

    /**
     * Handle the case where data.command isn't defined.
     * Set the command and args to echo "No data provided" when spawned.
     * @param {Object} data
     */
    function handleNoCommandProvided(data) {
      return new P(resolve => {
        if (!data.command) {
          data.command = "echo";
          data.argsArray = ["No command provided"];
        }
        resolve(data);
      });
    }

    /**
     * Spawn the command, using arguments only if they were provided.
     * @param {Object} data
     */
    function spawnTheCommandAsChildProcess(data) {
      return new P(resolve => {
        if (!data.argsArray) {
          resolve(spawn(data.command, [], {
            shell: true
          }));
        } else if (data.argsArray) {
          resolve(spawn(data.command, data.argsArray, {
            shell: true
          }));
        }
      });
    }

    /**
     * Handle the process output of the spawned child process.
     * @param {*} proc
     */
    function handleProcessOutput(proc) {
      return new P((resolve, reject) => {
        let count = 0;
        let output = {};
        proc.stdout.on("data", data => {
          let string = data.toString("utf8");
          let lines = string.split(/\r?\n|\r/g); // @see {@link https://stackoverflow.com/a/10805292 stackoverflow}
          for (var i = 0; i < lines.length; i++) {
            if (lines[i] !== "") {
              output[count] = lines[i];
              count++;
            }
          }
        });
        proc.stderr.on("data", data => reject(data));
        proc.on("exit", () => resolve(output));
      });
    }

  }

};

/**
 * Assign our spawns object to module.exports.
 * @see {@link https://nodejs.org/api/modules.html#modules_the_module_object Nodejs modules: The module object}
 * @see {@link https://nodejs.org/api/modules.html#modules_module_exports Nodejs modules: module exports}
 */
module.exports = spawns;
