# grunt-jsonfile
create, modify and distribute jsonfiles.  

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/db-developer/grunt-jsonfile/branch/master/graph/badge.svg)](https://codecov.io/gh/db-developer/grunt-jsonfile)
[![jsdocs](https://codecov.io/gh/db-developer/grunt-jsonfile/branch/master/graph/badge.svg)](https://codecov.io/gh/db-developer/grunt-jsonfile)
[![Build Status](https://travis-ci.com/db-developer/grunt-jsonfile.svg?branch=master)](https://travis-ci.com/db-developer/grunt-jsonfile)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

When running a complex make for various environments, types like [test|production]
and/or os targets, you might need to provide json configuration files which differ
in specific settings.  

grunt-jsonfile offers the opportunity to:

* provide json templates
* customize templates by merging settings
* customize templates by removing settings
* deploy customized json files into custom (build) directories
* use the projects package.json file as template

## content ##

* [Getting started guide (see 'getting started' below)](#getting-started)
* [Testing grunt-jsonfile](docs/grunt.md#testing)
* [Code coverage of tests for grunt-jsonfile](docs/grunt.md#code-coverage)
* [Build grunt-jsonfile from scratch](docs/grunt.md#building)
* [NPM integration of grunt-jsonfile](docs/grunt.md#npm_integration)

## getting started ##

This guide assumes, that you are familiar with the use of [npm](https://npmjs.com "Homepage of npm") and [grunt](https://gruntjs.com "Homepage of grunt").  
The plugin can be installed by the following command:

<code>npm install grunt-jsonfiles --save-dev</code>

Do note forget to install the peer dependencies.  
Once installed, the plugin may be loaded from within your gruntfile:

<code>grunt.loadNpmTasks( "jsonfiles" );</code>

Setup the task configuration as described below (see usage) and run the task:

<code>grunt jsonfiles</code>

Of cause, the task can be integrated into any complex build process.

## usage ##


```javascript

const BUILD = "...some path";

jsonfiles: {
  target1: {
    template: "config/template.json", // no options - string value must address a json file
    dest:     `${ BUILD }/file.json`,
    set: {
      pname1: "value 5 replaced"  // this will set pname1 to "value 5 replaced"
    },
    merge: {
      aproperty: null             // this will remove aproperty from template
    }
  }
}

```

```javascript

const BUILD = "...some path";

jsonfiles: {
  options: {
    templates: {
      "templatename": "config/template.json"
    }
  },
  target1: {
    template: "templatename",     // check options.templates[ "templatename" ]
                                  //       a string must address a json file
    dest:     `${ BUILD }/file.json`,
    set: {
      pname1: "value 5 replaced"  // this will set pname1 to "value 5 replaced"
    },
    merge: {
      aproperty: null             // this will remove aproperty from template
    }
  }
}

```

```javascript

const BUILD = "...some path";

jsonfiles: {
  options: {
    templates: {
      one: {
        pname1:     5,
        pname2:     true,
        pname3:     "value",
        aproperty:  "a aproperty will be deleted"
      }
      two: {
        foo:        "foo"
      }
    }
  },
  target1: {
    template: "one",              // check options.templates[ "templatename" ]
                                  //       an object will be used as template
    dest: [ `${ BUILD }/1/file.json`,
            `${ BUILD }/2/file.json`,
            `${ BUILD }/3/file.json` ], // ... write three times ...
    set: {
      pname1: "value 5 replaced"  // this will set pname1 to "value 5 replaced"
    },
    merge: {
      aproperty: null             // this will remove aproperty from template
    }
  }
}

```
