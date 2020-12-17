## Functions

<dl>
<dt><a href="#getTemplate">getTemplate(grunt, task, targetconfig)</a></dt>
<dd><p>Load json template by reference specified in target configuration.</p>
</dd>
<dt><a href="#setValues">setValues(target, container)</a></dt>
<dd><p>Set keys from container into target</p>
</dd>
<dt><a href="#mergeValues">mergeValues(target, container)</a></dt>
<dd><p>Merge keys from container into target. Keys which are set to null
 within container, will be deleted from target.</p>
<p> Note: This is a &quot;deep-deep&quot; merge.</p>
</dd>
<dt><a href="#runTaskJSONFile">runTaskJSONFile(grunt, task)</a></dt>
<dd><p>Return a promise for executing
   &#39;node --[node opts] nyc --[nyc opts] mocha --[mocha opts]&#39;</p>
</dd>
</dl>

<a name="getTemplate"></a>

## getTemplate(grunt, task, targetconfig)
Load json template by reference specified in target configuration.

**Kind**: global function  

| Param | Type |
| --- | --- |
| grunt | <code>grunt</code> | 
| task | <code>grunt.task</code> | 
| targetconfig | <code>object</code> | 

<a name="setValues"></a>

## setValues(target, container)
Set keys from container into target

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | a json object |
| container | <code>object</code> | a json object which holds key value pairs, which                             are to be set to target. |

<a name="mergeValues"></a>

## mergeValues(target, container)
Merge keys from container into target. Keys which are set to null within container, will be deleted from target. Note: This is a "deep-deep" merge.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | a json object |
| container | <code>object</code> | a json object which holds key value pairs, which                             are to be merged into target. |

<a name="runTaskJSONFile"></a>

## runTaskJSONFile(grunt, task)
Return a promise for executing   'node --[node opts] nyc --[nyc opts] mocha --[mocha opts]'

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> | the runtime 'instance' of grunt. |
| task | <code>grunt.task</code> | the current task |

