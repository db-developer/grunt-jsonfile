/**
 *	constants.js: grunt-jsonfile
 *
 *  @module grunt-jsonfile/constants
 *
 *//*
 *  © 2020, db-developer.
 *
 *  constants.js  is distributed  WITHOUT  ANY WARRANTY;  without  even  the
 *  implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
"use strict";

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = {
  PROPERTY_TASKNAME_JSONFILE:   "TASKNAME_JSONFILE",
  PROPERTY_TASKDESC_JSONFILE:   "TASKDESCRIPTION_JSONFILE",
  TASKNAME_JSONFILE:            "jsonfile",
  TASKDESCRIPTION_JSONFILE:     "create, modify and distribute jsonfiles.  "
};

// Module exports:
Object.defineProperty( module.exports, _STRINGS.PROPERTY_TASKNAME_JSONFILE, {
       value:    _STRINGS.TASKNAME_JSONFILE,
       writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.PROPERTY_TASKDESC_JSONFILE, {
       value:    _STRINGS.TASKDESCRIPTION_JSONFILE,
       writable: false, enumerable: true, configurable: false });
