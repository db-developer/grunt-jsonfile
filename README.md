# grunt-jsonfile

use objects or json files as template, to create, modify and distribute jsonfiles.  

[![npm version](https://img.shields.io/npm/v/grunt-jsonfile?color=blue)](https://www.npmjs.com/package/grunt-jsonfile)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![jsdoc](https://img.shields.io/static/v1?label=jsdoc&message=%20api%20&color=blue)](https://jsdoc.app/)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)
[![codecov](https://codecov.io/gh/db-developer/grunt-jsonfile/branch/master/graph/badge.svg)](https://codecov.io/gh/db-developer/grunt-jsonfile)
[![Build Status](https://travis-ci.com/db-developer/grunt-jsonfile.svg?branch=master)](https://travis-ci.com/db-developer/grunt-jsonfile)
[![dependencies](https://david-dm.org/db-developer/grunt-jsonfile.svg)](https://david-dm.org/)

When running a complex make for various environments, types like [test|production]
and/or os targets, json configuration files might be required, which differ in
specific properties.  

grunt-jsonfile offers the opportunity to:

* provide json templates
* customize templates by merging in values
* customize templates by removing values
* customize templates by updating values
* write modified templates to json files into custom (build) directories
* use project package.json files as templates

## content ##

* Usage (see further down this page)
  * [Getting started guide](#getting-started)
  * [Usage and examples](#usage)

* Developers
  * [Testing grunt-jsonfile](docs/grunt.md#testing)
  * [Code coverage of tests for grunt-jsonfile](docs/grunt.md#code-coverage)
  * [Build grunt-jsonfile from scratch](docs/grunt.md#building)
  * [NPM integration of grunt-jsonfile](docs/grunt.md#npm_integration)
  * [Frameworks used for testing, building, etc.](docs/frameworks.md)
  * [API of package grunt-jsonfile](docs/api.index.md)

[Changelog](docs/changelog.md)

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

### defining an EOF ###

If option.EOF is truthy, jsonfiles will close with an operating system specifc
EOL (end of line)

```javascript

const jsonfile = {
  options: {
    EOF: true
  }
};
```

### defining templates ###

The following example defines two templates in the options section of 'jsonfile'.

```javascript
// Templates are identified by name. This example defines two templates, which
// can be referenced by "tmpl1" and "tmpl2"

const jsonfile = {
  options:{
    templates: {
      tmpl1:  "config/template.json",   // strings will be interpreted as path to
                                        // json files, which will be required and
                                        // used as template.
      tmpl2:  {                         // objects will directly be used as
        pname1:     5,                  // template
        pname2:     true,
        pname3:     "value",
        aproperty:  "a aproperty will be deleted"
      }
    }
  }
};
```

The following examples define templates directly within their targets.

```javascript
const BUILD    = "...some path";
const jsonfile = {
  target1: {
    template: "config/template.json",   // template is a string value, and does not
                                        // reference a template in  options.templates.
                                        // Therefor it will be interpreted as path to
                                        // a json file, which will be required.
    dest:     `${ BUILD }/file.json`,   // write the result to this file.
  }
};
```

```javascript
const BUILD    = "...some path";
const jsonfile = {
  target1: {
    template: {                         // a template object
      pname1:     5,
      pname2:     true,
      pname3:     "value",
      aproperty:  "a aproperty will be deleted"
    },
    dest:     `${ BUILD }/file.json`,   // write the result to this file.
  }
};
```

### referencing templates ###

```javascript
// Target 'target1' references a template in options.templates

const BUILD    = "...some path";
const jsonfile = {
  options:{
    templates: {
      tmpl1:  "config/template.json"    // read the json file and use the resulting
                                        // object as template.
    }
  },
  target1: {
    template: "tmpl1",                  // template is a string value, and references
                                        // a template in options.templates which will
                                        // be used.
    dest: [                             // write the result to all files in this array
            `${ BUILD }/1/file.json`,   
            `${ BUILD }/2/file.json`,
            `${ BUILD }/3/file.json`
          ]
  }
};
```

### setting template values ###

Setting a value to a property of a template can mean:
* creating a template property if it did not yet exist
* overwriting the value of an existing template property

```javascript
const BUILD    = "...some path";
const jsonfile = {
  target1: {
    template: {                         // a template object
      pname1:     5,
      pname2:     true,
      pname3:     { key: "value" },
      aproperty:  "a aproperty will be deleted"
    },
    dest:     `${ BUILD }/file.json`,   // write the result to this file.
    set: {
      pname1: "value 5 replaced",       // this will set template.pname1 to
                                        // "value 5 replaced"
      pname2: undefined,                // this will set template.pname2 to
                                        // undefined
      pname3: { other: "instance" },    // this will set template.pname3 to
                                        // another instance.
      aproperty: null                   // this will set template.aproperty to
                                        // null
    }
};
```

### merging template values ###

Merging properties into templates means
* inserting properties which did not yet exist
* setting values to properties that do exist
* deleting templates properties if value to merge is null
* mering will iterate into object trees

```javascript
const BUILD    = "...some path";
const jsonfile = {
  target1: {
    template: {                         // a template object
      pname1:     5,
      pname2:     true,
      pname3:     { key: "value" },
      aproperty:  "a aproperty will be deleted"
    },
    dest:     `${ BUILD }/file.json`,   // write the result to this file.
    merge: {
      pname3: { key: { test: "fun" }},  // this will replace value by { test: "fun" }
      aproperty: null                   // this will remove aproperty from template
    }
  }
}

```

### updating template values ###

Updating template properties means
* setting a value to a template property that exists
* ignoring properties that do not exist in the template

```javascript
const BUILD    = "...some path";
const jsonfile = {
  target1: {
    template: {                         // a template object
      pname1:     5,
      pname2:     true,
      pname3:     { key: "value" },
      aproperty:  "a aproperty will be deleted"
    },
    dest:     `${ BUILD }/file.json`,   // write the result to this file.
    update: {
      pname1:     "fun",                // will set template.pname1 to "fun"
      xproperty:  "uups"                // will change nothing, because there is
                                        // no xproperty in template.      
    }
  }
}
```
