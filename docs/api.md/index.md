
<br><a name="module_grunt-jsonfile"></a>

## grunt-jsonfile
> lib/index.js: grunt-jsonfile


<br><a name="module_grunt-jsonfile.registerMultiTask"></a>

### grunt-jsonfile.registerMultiTask(grunt) ⇒ <code>Promise.&lt;void&gt;</code>
> Registers the `jsonfile` Grunt multi task.> >  Attaches a multitask to the provided Grunt instance using the>  configured task name and description from the constants module.>  The registered task delegates execution to `tasks.runTask`>  and propagates errors via `grunt.fail.fatal`.

**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves once the multitask has been registered.  

| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>grunt</code> | The Grunt instance used to register the multitask. |

