
<br><a name="module_grunt-jsonfile/options/jsonfile"></a>

## grunt-jsonfile/options/jsonfile
> lib/options/jsonfile.js: grunt-jsonfile/options> >  Internal implementation of the options handling logic for>  grunt-jsonfile.> >  ⚠ This module is NOT part of the public API surface.>  It may change at any time without semver guarantees.> >  External consumers MUST use `grunt-jsonfile/options` instead.


* [grunt-jsonfile/options/jsonfile](#module_grunt-jsonfile/options/jsonfile)
    * [.getOptions(grunt, task)](#module_grunt-jsonfile/options/jsonfile.getOptions) ⇒ <code>Object</code>
    * [.getEOF(grunt, task)](#module_grunt-jsonfile/options/jsonfile.getEOF) ⇒ <code>string</code>
    * [.getTemplateReferenceFromOptions(grunt, task, templatename)](#module_grunt-jsonfile/options/jsonfile.getTemplateReferenceFromOptions) ⇒ <code>Object</code> \| <code>null</code>


<br><a name="module_grunt-jsonfile/options/jsonfile.getOptions"></a>

### grunt-jsonfile/options/jsonfile.getOptions(grunt, task) ⇒ <code>Object</code>
> Returns the effective configuration object for the current `jsonfile`>  Grunt task invocation.> >  This function merges the internally defined default options with the>  task-specific options provided via `task.options()`. The merge is>  shallow and follows `Object.assign` semantics:> >    - Default options are applied first.>    - Task options override defaults for matching keys.>    - Unknown keys provided by the task are preserved.> >  A new object instance is always returned. The internal default>  `OPTIONS` object is never mutated.> >  Merge characteristics:> >    - Shallow merge only (no deep cloning).>    - Nested objects are copied by reference.>    - Primitive values are copied by value.> >  Error behavior:> >    - Throws if `task` is `undefined` or if `task.options`>      is not callable (runtime error when invoking `task.options()`).

**Returns**: <code>Object</code> - A new object containing the merged task configuration.  

| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> | The active Grunt runtime instance.                                 (Currently unused but part of the public API.) |
| task | <code>grunt.task</code> | The Grunt task context providing `task.options()`. |


<br><a name="module_grunt-jsonfile/options/jsonfile.getEOF"></a>

### grunt-jsonfile/options/jsonfile.getEOF(grunt, task) ⇒ <code>string</code>
> Resolves the effective end-of-file (EOF) sequence for the current>  `jsonfile` task invocation.> >  The returned value depends on the merged task options obtained via>  [getOptions](#module_grunt-jsonfile/options/jsonfile.getOptions).> >  Behavior:> >    - If `options.EOF === true`, the platform-specific line terminator>      (`os.EOL`) is returned.>    - If `options.EOF === false` (default), an empty string is returned.> >  This function does not mutate any state. It strictly derives the>  EOF suffix from the effective task configuration.> >  Error behavior:> >    - Throws if `task` is `undefined` or does not expose a callable>      `options()` function (propagated from `getOptions`).

**Returns**: <code>string</code> - The platform-specific end-of-line sequence (`os.EOL`)                        if enabled; otherwise an empty string.  

| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> | The active Grunt runtime instance.                                 (Currently unused but required by API.) |
| task | <code>grunt.task</code> | The Grunt task context providing `task.options()`. |


<br><a name="module_grunt-jsonfile/options/jsonfile.getTemplateReferenceFromOptions"></a>

### grunt-jsonfile/options/jsonfile.getTemplateReferenceFromOptions(grunt, task, templatename) ⇒ <code>Object</code> \| <code>null</code>
> Resolves and returns a JSON template reference by its logical name>  from the task configuration. A template reference must be cloned,>  before being modified, to avoid mutating the original template.> >  The template lookup is performed against the `templates` property>  of the merged task options (see>  [getOptions](#module_grunt-jsonfile/options/jsonfile.getOptions)).> >  Resolution behavior:> >    1. The given `templatename` is used as key in `options.templates`.>    2. If no template with that name exists, `null` is returned.>    3. If the resolved template value is a string, it is interpreted>       as a file path and loaded via `grunt.file.readJSON(...)`.>    4. If the resolved value is a plain object literal, it is returned>       as-is.> >  No deep cloning is performed. Objects stored in `options.templates`>  are returned by reference.> >  Error behavior:> >    - Throws if `task` is `undefined` or does not provide a callable>      `options()` function (propagated from `getOptions`).>    - Throws if `options.templates` is not a plain object.>    - Throws if the resolved template value is neither a plain object>      nor a string.>    - Throws if `grunt.file.readJSON` fails (e.g. invalid path or>      invalid JSON content).

**Returns**: <code>Object</code> \| <code>null</code> - The resolved template object, or `null` if no template                         with the given name exists.  

| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> | The active Grunt runtime instance. |
| task | <code>grunt.task</code> | The Grunt task context providing `task.options()`. |
| templatename | <code>string</code> | The logical template key to resolve. |

