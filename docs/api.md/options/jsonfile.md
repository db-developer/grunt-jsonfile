
<br><a name="module_grunt-jsonfile/options/jsonfile"></a>

## grunt-jsonfile/options/jsonfile
> options/jsonfile.js: grunt-jsonfile


* [grunt-jsonfile/options/jsonfile](#module_grunt-jsonfile/options/jsonfile)
    * [~_OPTIONS](#module_grunt-jsonfile/options/jsonfile.._OPTIONS)
    * [~getOptions(grunt, task)](#module_grunt-jsonfile/options/jsonfile..getOptions) ⇒ <code>Object</code>
    * [~getEOF(grunt, task)](#module_grunt-jsonfile/options/jsonfile..getEOF) ⇒ <code>string</code>
    * [~getTemplateFromOptions(grunt, task, templatename)](#module_grunt-jsonfile/options/jsonfile..getTemplateFromOptions)


<br><a name="module_grunt-jsonfile/options/jsonfile.._OPTIONS"></a>

### grunt-jsonfile/options/jsonfile~\_OPTIONS
> Default options


<br><a name="module_grunt-jsonfile/options/jsonfile..getOptions"></a>

### grunt-jsonfile/options/jsonfile~getOptions(grunt, task) ⇒ <code>Object</code>
> Returns grunt task specific options for 'jsonfile'.

**Returns**: <code>Object</code> - 'nyc_mocha' options for grunt task  

| Param | Type |
| --- | --- |
| grunt | <code>grunt</code> | 
| task | <code>grunt.task</code> | 


<br><a name="module_grunt-jsonfile/options/jsonfile..getEOF"></a>

### grunt-jsonfile/options/jsonfile~getEOF(grunt, task) ⇒ <code>string</code>
> Returns EOF (end of file) from options.>  If options.EOF is true this function will return the os>  specific EOL.

**Returns**: <code>string</code> - wich either is an empty string or an 'end of line'  

| Param | Type |
| --- | --- |
| grunt | <code>grunt</code> | 
| task | <code>grunt.task</code> | 


<br><a name="module_grunt-jsonfile/options/jsonfile..getTemplateFromOptions"></a>

### grunt-jsonfile/options/jsonfile~getTemplateFromOptions(grunt, task, templatename)
> Load json template by name.


| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> |  |
| task | <code>grunt.task</code> |  |
| templatename | <code>string</code> | to load. |

