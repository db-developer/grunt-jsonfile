
<br><a name="module_grunt-jsonfile/tasks/jsonfile"></a>

## grunt-jsonfile/tasks/jsonfile
> tasks/jsonfile.js: grunt-jsonfile


* [grunt-jsonfile/tasks/jsonfile](#module_grunt-jsonfile/tasks/jsonfile)
    * [~getTemplate(grunt, task, targetconfig)](#module_grunt-jsonfile/tasks/jsonfile..getTemplate)
    * [~setValues(target, container)](#module_grunt-jsonfile/tasks/jsonfile..setValues)
    * [~mergeValues(target, container)](#module_grunt-jsonfile/tasks/jsonfile..mergeValues)
    * [~updateValues(target, container)](#module_grunt-jsonfile/tasks/jsonfile..updateValues)
    * [~runTaskJSONFile(grunt, task)](#module_grunt-jsonfile/tasks/jsonfile..runTaskJSONFile)


<br><a name="module_grunt-jsonfile/tasks/jsonfile..getTemplate"></a>

### grunt-jsonfile/tasks/jsonfile~getTemplate(grunt, task, targetconfig)
> Load json template by reference specified in target configuration.


| Param | Type |
| --- | --- |
| grunt | <code>grunt</code> | 
| task | <code>grunt.task</code> | 
| targetconfig | <code>object</code> | 


<br><a name="module_grunt-jsonfile/tasks/jsonfile..setValues"></a>

### grunt-jsonfile/tasks/jsonfile~setValues(target, container)
> Set keys from container into target


| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | a json object |
| container | <code>object</code> | a json object which holds key value pairs, which                             are to be set to target. |


<br><a name="module_grunt-jsonfile/tasks/jsonfile..mergeValues"></a>

### grunt-jsonfile/tasks/jsonfile~mergeValues(target, container)
> Merge keys from container into target. Keys which are set to null>  within container, will be deleted from target.> >  Note: This is a "deep-deep" merge.


| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | a json object |
| container | <code>object</code> | a json object which holds key value pairs, which                             are to be merged into target. |


<br><a name="module_grunt-jsonfile/tasks/jsonfile..updateValues"></a>

### grunt-jsonfile/tasks/jsonfile~updateValues(target, container)
> Update keys from container into target. Keys which are set to null>  within container, will be deleted from target. Keys that do not exist>  in the target will not be set.> >  Note: This is a "deep-deep" merge.


| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | a json object |
| container | <code>object</code> | a json object which holds key value pairs,                             which will be used to update the target. |


<br><a name="module_grunt-jsonfile/tasks/jsonfile..runTaskJSONFile"></a>

### grunt-jsonfile/tasks/jsonfile~runTaskJSONFile(grunt, task)
> Return a promise for executing>    'node --[node opts] nyc --[nyc opts] mocha --[mocha opts]'


| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> | the runtime 'instance' of grunt. |
| task | <code>grunt.task</code> | the current task |

