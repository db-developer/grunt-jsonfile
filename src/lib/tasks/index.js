/**
 *	lib/tasks/index.js: grunt-jsonfile/tasks
 *
 *  @module grunt-jsonfile/tasks
 *
 *//*
 *  © 2026, db-developer.
 *
 *  Distributed  WITHOUT  ANY WARRANTY;  without  even the  implied
 *  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
"use strict";

const jsonfile = require( "./jsonfile" );

/**
 *  Public API function that runs a grunt task.
 *
 *  @function module:grunt-jsonfile/tasks.runTask
 *  @see module:grunt-jsonfile/tasks/jsonfile.runTask
 */

module.exports.runTask = jsonfile.runTask;
