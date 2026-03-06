
<br><a name="module_grunt-jsonfile/options"></a>

## grunt-jsonfile/options
> lib/options/index.js: grunt-jsonfile/options> >  Public options API of the grunt-jsonfile package.> >  This module exposes the stable, documented interface for resolving>  task options, EOF behavior, and JSON templates.> >  Consumers MUST depend on this module path instead of internal>  implementation files.> >  The underlying implementation is intentionally encapsulated and>  may change without notice.


* [grunt-jsonfile/options](#module_grunt-jsonfile/options)
    * [.getOptions()](#module_grunt-jsonfile/options.getOptions)
    * [.getEOF()](#module_grunt-jsonfile/options.getEOF)
    * [.getTemplateReferenceFromOptions()](#module_grunt-jsonfile/options.getTemplateReferenceFromOptions)


<br><a name="module_grunt-jsonfile/options.getOptions"></a>

### grunt-jsonfile/options.getOptions()
> Public API function that returns the effective configuration object>  for a `jsonfile` Grunt task invocation.

**See**: module:grunt-jsonfile/options/jsonfile.getOptions  

<br><a name="module_grunt-jsonfile/options.getEOF"></a>

### grunt-jsonfile/options.getEOF()
> Public API function that resolves the effective end-of-file (EOF)>  sequence for a `jsonfile` task execution.

**See**: module:grunt-jsonfile/options/jsonfile.getEOF  

<br><a name="module_grunt-jsonfile/options.getTemplateReferenceFromOptions"></a>

### grunt-jsonfile/options.getTemplateReferenceFromOptions()
> Public API function that resolves a named JSON template from the>  task configuration.

**See**: module:grunt-jsonfile/options/jsonfile.getTemplateReferenceFromOptions  
