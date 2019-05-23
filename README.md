# grunt-jsonfile
use grunt to create and modify jsonfiles

## getting started ##

This guide assumes, that you are familiar with the use of npm and grunt.  
After having installed grunt@>=1.0.4, you may install this plugin by the following command:

<code>npm install grunt-jsonfiles --save-dev</code>

Once the plugin has been installed, it may be loaded from within your gruntfile:

<code>grunt.loadNpmTasks( "jsonfiles" );</code>

The task can be run now:

<code>grunt jsonfiles</code>

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
