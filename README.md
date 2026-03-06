
[![npm version](https://img.shields.io/npm/v/grunt-jsonfile?color=blue)](https://www.npmjs.com/package/grunt-jsonfile)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![jsdoc](https://img.shields.io/static/v1?label=jsdoc&message=%20api%20&color=blue)](https://jsdoc.app/)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)
[![dependencies](https://img.shields.io/librariesio/release/npm/grunt-jsonfile)](https://libraries.io/)
![Build & Test](https://github.com/db-developer/grunt-jsonfile/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/db-developer/grunt-jsonfile/branch/master/graph/badge.svg)](https://codecov.io/gh/db-developer/grunt-jsonfile)

[BOTTOM](#updating-template-values) [AI](AI.md) [CHANGELOG](CHANGELOG.md) [LICENSE](LICENSE)

# grunt-jsonfile

Use objects or JSON files as templates to create, modify, and distribute
JSON configuration files during a build process.

`grunt-jsonfile` is a Grunt plugin designed for projects that need to
generate multiple JSON configuration files from shared templates. This
is particularly useful when building for multiple environments
(e.g. `test`, `staging`, `production`) or different targets
(e.g. operating systems or deployment platforms) where configuration
values differ slightly.

Instead of maintaining many almost-identical JSON files,
`grunt-jsonfile` allows you to define templates and then derive
environment‑specific variants through controlled modifications.

Typical use cases include:

-   Generating environment-specific configuration files
-   Deriving build artifacts from a common template
-   Injecting build-time values into JSON configuration
-   Removing or overriding properties for specific targets
-   Distributing generated JSON files into build directories

Main capabilities:

-   Provide JSON templates from files or objects
-   Merge additional values into templates
-   Update existing template values
-   Remove values from templates
-   Generate one or multiple JSON files from a template
-   Use `package.json` or other project JSON files as templates

------------------------------------------------------------------------

## content

-   Usage (see further down this page)
    -   [Getting started guide](#getting-started)
    -   [Usage and examples](#usage)
-   Developers
    -   [Testing grunt-jsonfile](docs/grunt.md#testing)
    -   [Code coverage of tests for
        grunt-jsonfile](docs/grunt.md#code-coverage)
    -   [Build grunt-jsonfile from scratch](docs/grunt.md#building)
    -   [NPM integration of
        grunt-jsonfile](docs/grunt.md#npm_integration)
    -   [Frameworks used for testing, building,
        etc.](docs/frameworks.md)
    -   [API of package grunt-jsonfile](docs/api.index.md)

[Changelog](CHANGELOG.md)\
[Details on AI assistance during development](AI.md)

------------------------------------------------------------------------

## getting started

This guide assumes familiarity with:

-   [npm](https://npmjs.com)\
-   [Grunt](https://gruntjs.com)

### Installation

Install the plugin as a development dependency:

``` bash
npm install grunt-jsonfile --save-dev
```

If the package defines peer dependencies, install those as well.

### Loading the plugin

After installation, load the plugin in your `Gruntfile.js`:

``` javascript
grunt.loadNpmTasks("grunt-jsonfile");
```

### Running the task

Once the task configuration has been defined (see below), run it with:

``` bash
grunt jsonfile
```

The task can be integrated into larger build pipelines or chained with
other Grunt tasks.

------------------------------------------------------------------------

## usage

### defining an EOF

If `options.EOF` is truthy, generated JSON files will end with an
operating‑system‑specific end‑of‑line character.

``` javascript
const jsonfile = {
  options: {
    EOF: true
  }
};
```

This is useful for tools that expect files to end with a newline.

------------------------------------------------------------------------

### defining templates

Templates can be defined globally inside `options.templates` or locally
inside individual targets.

Templates may be:

-   a **path to a JSON file**
-   a **JavaScript object used directly as a template**

Example defining two templates globally:

``` javascript
const jsonfile = {
  options:{
    templates: {
      tmpl1: "config/template.json",
      tmpl2: {
        pname1: 5,
        pname2: true,
        pname3: "value",
        aproperty: "this property may later be removed"
      }
    }
  }
};
```

------------------------------------------------------------------------

### defining templates inside a target

A target may define its template directly instead of referencing
`options.templates`.

#### Template from file

``` javascript
const BUILD = "...some path";

const jsonfile = {
  target1: {
    template: "config/template.json",
    dest: `${BUILD}/file.json`
  }
};
```

If the `template` value is a string that does not reference a named
template, it is interpreted as a file path and loaded as JSON.

#### Template from object

``` javascript
const BUILD = "...some path";

const jsonfile = {
  target1: {
    template: {
      pname1: 5,
      pname2: true,
      pname3: "value",
      aproperty: "this property may later be removed"
    },
    dest: `${BUILD}/file.json`
  }
};
```

------------------------------------------------------------------------

### referencing templates

Targets can reference templates defined in `options.templates`.

``` javascript
const BUILD = "...some path";

const jsonfile = {
  options:{
    templates: {
      tmpl1: "config/template.json"
    }
  },

  target1: {
    template: "tmpl1",
    dest: [
      `${BUILD}/1/file.json`,
      `${BUILD}/2/file.json`,
      `${BUILD}/3/file.json`
    ]
  }
};
```

If `dest` is an array, the generated JSON file will be written to each
path.

------------------------------------------------------------------------

### setting template values

`set` assigns values directly to template properties.

Behavior:

-   Creates the property if it does not exist
-   Overwrites the value if it exists

``` javascript
const BUILD = "...some path";

const jsonfile = {
  target1: {
    template: {
      pname1: 5,
      pname2: true,
      pname3: { key: "value" },
      aproperty: "this property will be replaced"
    },

    dest: `${BUILD}/file.json`,

    set: {
      pname1: "value replaced",
      pname2: undefined,
      pname3: { other: "instance" },
      aproperty: null
    }
  }
};
```

------------------------------------------------------------------------

### merging template values

`merge` recursively merges values into the template.

Behavior:

-   Adds properties that do not yet exist
-   Updates values of existing properties
-   Removes properties if the merged value is `undefined`
-   Recursively traverses nested objects

``` javascript
const BUILD = "...some path";

const jsonfile = {
  target1: {
    template: {
      pname1: 5,
      pname2: true,
      pname3: { key: "value" },
      aproperty: "this property may be removed"
    },

    dest: `${BUILD}/file.json`,

    merge: {
      pname3: { key: { test: "fun" }},
      aproperty: undefined
    }
  }
};
```

------------------------------------------------------------------------

### updating template values

`update` modifies **only existing properties** in the template.

Behavior:

-   Updates properties that exist
-   Ignores properties that are not present in the template

``` javascript
const BUILD = "...some path";

const jsonfile = {
  target1: {
    template: {
      pname1: 5,
      pname2: true,
      pname3: { key: "value" },
      aproperty: "this property may be removed"
    },

    dest: `${BUILD}/file.json`,

    update: {
      pname1: "fun",
      xproperty: "ignored"
    }
  }
};
```

[TOP](#grunt-jsonfile) [AI](AI.md) [CHANGELOG](CHANGELOG.md) [LICENSE](LICENSE)