
<br><a name="module_grunt-jsonfile/tasks/jsonfile"></a>

## grunt-jsonfile/tasks/jsonfile
> lib/tasks/jsonfile.js: grunt-jsonfile/tasks> >  Internal implementation of the tasks handling logic for>  grunt-jsonfile.> >  ⚠ This module is NOT part of the public API surface.>  It may change at any time without semver guarantees.> >  External consumers MUST use `grunt-jsonfile/tasks` instead.


* [grunt-jsonfile/tasks/jsonfile](#module_grunt-jsonfile/tasks/jsonfile)
    * [.getTemplate(grunt, task, targetconfig)](#module_grunt-jsonfile/tasks/jsonfile.getTemplate) ⇒ <code>Object</code>
    * [.setValues(destination, source)](#module_grunt-jsonfile/tasks/jsonfile.setValues) ⇒ <code>Object</code>
    * [.mergeValues(destination, source)](#module_grunt-jsonfile/tasks/jsonfile.mergeValues) ⇒ <code>Object</code>
    * [.updateValues(destination, source)](#module_grunt-jsonfile/tasks/jsonfile.updateValues) ⇒ <code>Object</code>
    * [.runTask(grunt, task)](#module_grunt-jsonfile/tasks/jsonfile.runTask)


<br><a name="module_grunt-jsonfile/tasks/jsonfile.getTemplate"></a>

### grunt-jsonfile/tasks/jsonfile.getTemplate(grunt, task, targetconfig) ⇒ <code>Object</code>
> Resolve the effective JSON template for a grunt-jsonfile target.> >  Resolution strategy:> >  1. If no template is defined for the target, an empty object literal>     is returned.> >  2. If `targetconfig.template` is an object literal, a deep clone of>     that object is returned.> >  3. If `targetconfig.template` is a string:>     a) It is resolved against `options.templates`.>     b) If the resolved value is an object, a deep clone is returned.>     c) If the resolved value is of unsupported type, or if resolution>        fails, the original string will be treated as a file path.> >  Returned objects are deep-cloned using `structuredClone` in order to>  guarantee target isolation and prevent cross-target side effects.> >  Note:>    - Node.js >= 20 is required, as set in package.json engines field.

**Returns**: <code>Object</code> - A JSON object template.  

| Param | Type |
| --- | --- |
| grunt | <code>grunt</code> | 
| task | <code>grunt.task</code> | 
| targetconfig | <code>Object</code> | 


<br><a name="module_grunt-jsonfile/tasks/jsonfile.setValues"></a>

### grunt-jsonfile/tasks/jsonfile.setValues(destination, source) ⇒ <code>Object</code>
> Assigns all enumerable own properties from `source` to `destination`.> >  This function mutates the `destination` object in place and returns it.>  It performs a deep copy of the `source` object via `structuredClone`, meaning that >  nested objects or arrays are cloned, ensuring that the original `source` remains>  unmodified under all circumstances.> >  Use this function to apply a set of key/value pairs to an existing>  object. It is intended for cases where you want to merge configuration>  objects, patch existing data structures, or apply updates without>  creating side-effects between Grunt targets.> >  Important considerations:>    - Only enumerable own properties of `source` are copied.>    - The prototype of `source` is ignored.>    - Nested objects and arrays are deep-cloned; modifying them in `destination`>      will not affect `source`.>    - Non-clonable values (e.g., functions, DOM elements) will throw errors>      from `structuredClone`. This is expected, as the function assumes JSON-like>      structures typical for Grunt plugin configurations and JSON files.

**Returns**: <code>Object</code> - The mutated `destination` object.  

| Param | Type | Description |
| --- | --- | --- |
| destination | <code>Object</code> | The target object that will be mutated by receiving new key/value pairs. |
| source | <code>Object</code> | The object containing key/value pairs to set on `destination`. |


<br><a name="module_grunt-jsonfile/tasks/jsonfile.mergeValues"></a>

### grunt-jsonfile/tasks/jsonfile.mergeValues(destination, source) ⇒ <code>Object</code>
> Deeply merges properties from `source` into `destination`.> >  This function mutates `destination` in place and returns it.>  It performs a recursive merge for plain objects and applies>  special handling for arrays and deletion semantics.> >  Merge rules:> >  1. If a property in `source` is `undefined`, the corresponding>     property is deleted from `destination`.> >  2. If both `destination[key]` and `source[key]` are plain objects,>     they are recursively merged.> >  3. If both values are arrays, the arrays are merged by appending>     values from `source` that are not already present in the>     `destination` array. Equality is determined using JavaScript's>     `SameValueZero` comparison semantics (the same behavior as>     `Array.prototype.includes`). As a result:> >        - Primitive values already present in the destination array>          are not inserted again.>        - Object values are considered identical only if they refer>          to the same object reference.>        - Structurally equal but different object instances are>          treated as distinct values and will be appended.> >  4. In all other cases, the value from `source` replaces the value>     in `destination`. Replacement values are copied using>     `structuredClone` to prevent accidental mutation of the>     original source data.> >  This function is intended for merging JSON-like data structures>  used in the `grunt-jsonfile` task system.> >  Important considerations:> >  - Only enumerable own properties of `source` are processed.>  - `destination` must be a plain object.>  - `source` must be a plain object.>  - Nested objects are merged recursively.>  - Arrays are merged with duplicate prevention rather than>    simple concatenation.>  - Replacement values are cloned using `structuredClone`.> >  The merge implementation is designed to behave predictably for>  JSON-compatible data structures and has explicit handling for>  common edge cases such as nested merges, deletion semantics,>  array deduplication, and structured cloning constraints.

**Returns**: <code>Object</code> - The mutated `destination` object.  
**Throws**:

- <code>TypeError</code> If `destination` or `source` is not a plain object.


| Param | Type | Description |
| --- | --- | --- |
| destination | <code>Object</code> | The target object that will receive merged values. |
| source | <code>Object</code> | The object containing values that will be merged                                  into `destination`. |


<br><a name="module_grunt-jsonfile/tasks/jsonfile.updateValues"></a>

### grunt-jsonfile/tasks/jsonfile.updateValues(destination, source) ⇒ <code>Object</code>
> Updates properties in `destination` using values from `source`.> >  This function mutates `destination` in place and returns it.>  It is intended for applying updates to JSON-like data structures>  used in the `grunt-jsonfile` task system.> >  Unlike `mergeValues`, this function does **not concatenate arrays**>  and does not attempt structural merges beyond plain objects.>  Values from `source` replace values in `destination`, except when>  both values are plain objects, in which case the update is applied>  recursively.> >  Update rules:> >  1. If a property in `source` is `undefined`, the corresponding>     property is deleted from `destination`.> >  2. If both `destination[key]` and `source[key]` are plain objects,>     the objects are updated recursively.> >  3. If both `destination[key]` and `source[key]` are arrays,>     the update is applied element-wise:>       - `undefined` in `source` deletes the corresponding element>         in `destination`.>       - Existing elements are replaced by the corresponding `source`>         element.>       - New elements are appended if the index does not exist in>         `destination`.> >  4. In all other cases, the value from `source` replaces the value>     in `destination`.> >  To avoid reference sharing between different task executions,>  assigned values are copied using `structuredClone`. This ensures>  that `source` remains unmodified and that no references from>  `source` are reused in `destination`.> >  If `structuredClone` encounters values that cannot be cloned>  (e.g. functions, certain host objects, or unsupported structures),>  the underlying cloning operation will throw an exception.> >  Important considerations:> >  - Only enumerable own properties of `source` are processed.>  - `destination` must be a plain object.>  - `source` must be a plain object.>  - Nested plain objects are updated recursively.>  - Arrays are updated element-wise according to the rules above.>  - `destination` is mutated and returned.

**Returns**: <code>Object</code> - The mutated `destination` object.  
**Throws**:

- <code>TypeError</code> If `destination` or `source` is not a plain object.


| Param | Type | Description |
| --- | --- | --- |
| destination | <code>Object</code> | The target object that will receive updated values. |
| source | <code>Object</code> | The object containing values that will be applied                                  to `destination`. |


<br><a name="module_grunt-jsonfile/tasks/jsonfile.runTask"></a>

### grunt-jsonfile/tasks/jsonfile.runTask(grunt, task)
> Return a promise for executing>    'node --[node opts] nyc --[nyc opts] mocha --[mocha opts]'


| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> | the runtime 'instance' of grunt. |
| task | <code>grunt.task</code> | the current task |

