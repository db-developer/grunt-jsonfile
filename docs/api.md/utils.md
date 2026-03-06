
<br><a name="module_grunt-jsonfile/utils"></a>

## grunt-jsonfile/utils
> lib/utils.js: grunt-jsonfile


* [grunt-jsonfile/utils](#module_grunt-jsonfile/utils)
    * [.isPlainObject(value)](#module_grunt-jsonfile/utils.isPlainObject) ⇒ <code>boolean</code>
    * [.isPrimitive(value)](#module_grunt-jsonfile/utils.isPrimitive) ⇒ <code>boolean</code>
    * [.isString(value)](#module_grunt-jsonfile/utils.isString) ⇒ <code>boolean</code>


<br><a name="module_grunt-jsonfile/utils.isPlainObject"></a>

### grunt-jsonfile/utils.isPlainObject(value) ⇒ <code>boolean</code>
> Determines whether the given value is a plain object literal.> >  This function strictly detects plain object literals (e.g. `{ ... }`).>  It excludes arrays, dates, maps, sets, class instances, buffers,>  and all other non-plain object types.> >  ⚠ Objects created via `Object.create(null)` are NOT considered plain>  objects by this implementation because their prototype is `null`.

**Returns**: <code>boolean</code> - Returns `true` if `value` is a non-null object whose                     prototype is exactly `Object.prototype`; otherwise `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to test. |

**Example**  
```js
isPlainObject({})                  // true   isPlainObject(Object.create(null)) // false   isPlainObject([])                  // false   isPlainObject(new Date())          // false 
```

<br><a name="module_grunt-jsonfile/utils.isPrimitive"></a>

### grunt-jsonfile/utils.isPrimitive(value) ⇒ <code>boolean</code>
> Determines whether a given value is a JavaScript primitive.> >  A value is considered primitive if it is `null` or if its>  `typeof` is neither `"object"` nor `"function"`.> >  This includes:>  - `string`>  - `number`>  - `boolean`>  - `bigint`>  - `symbol`>  - `undefined`>  - `null`> >  Note that boxed primitives (e.g. `new String("x")`) are>  objects and therefore not considered primitive.

**Returns**: <code>boolean</code> - Returns `true` if the value is primitive; otherwise `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to test. |


<br><a name="module_grunt-jsonfile/utils.isString"></a>

### grunt-jsonfile/utils.isString(value) ⇒ <code>boolean</code>
> Determines whether a given value represents a JavaScript string.> >  This function returns `true` for:>    - String primitives (`typeof value === "string"`)>    - Boxed String objects created via `new String(...)`> >  The helper is intentionally tolerant in order to support both:> >    1. Validation of existing JSON data structures.>    2. Validation of values that are not yet serialized but are>       intended to be written into JSON output.> >  While boxed String objects are not valid JSON values themselves,>  they may occur in pre-serialization processing pipelines. This>  function therefore treats them as strings to ensure consistent>  handling before JSON conversion.> >  Note:>    - JSON itself only supports string primitives.>    - `new String("x")` is considered an object in JavaScript,>      but will serialize to a string when passed to `JSON.stringify`.

**Returns**: <code>boolean</code> - Returns `true` if the value is a string primitive                     or a boxed `String` instance; otherwise `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to test. |

