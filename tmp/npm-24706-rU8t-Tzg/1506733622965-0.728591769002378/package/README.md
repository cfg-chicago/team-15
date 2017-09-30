A light, featureful and explicit option parsing library for node.js.

[Why another one? See below](#why). tl;dr: The others I've tried are one of
too loosey goosey (not explicit), too big/too many deps, or ill specified.
YMMV.

Follow <a href="https://twitter.com/intent/user?screen_name=trentmick" target="_blank">@trentmick</a>
for updates to node-dashdash.

# Install

    npm install dashdash


# Usage

```javascript
var dashdash = require('dashdash');

// Specify the options. Minimally `name` (or `names`) and `type`
// must be given for each.
var options = [
    {
        // `names` or a single `name`. First element is the `opts.KEY`.
        names: ['help', 'h'],
        // See "Option specs" below for types.
        type: 'bool',
        help: 'Print this help and exit.'
    }
];

// Shortcut form. As called it infers `process.argv`. See below for
// the longer form to use methods like `.help()` on the Parser object.
var opts = dashdash.parse({options: options});

console.log("opts:", opts);
console.log("args:", opts._args);
```


# Longer Example

A more realistic [starter script "foo.js"](./examples/foo.js) is as follows.
This also shows using `parser.help()` for formatted option help.

```javascript
var dashdash = require('./lib/dashdash');

var options = [
    {
        name: 'version',
        type: 'bool',
        help: 'Print tool version and exit.'
    },
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Print this help and exit.'
    },
    {
        names: ['verbose', 'v'],
        type: 'arrayOfBool',
        help: 'Verbose output. Use multiple times for more verbose.'
    },
    {
        names: ['file', 'f'],
        type: 'string',
        help: 'File to process',
        helpArg: 'FILE'
    }
];

var parser = dashdash.createParser({options: options});
try {
    var opts = parser.parse(process.argv);
} catch (e) {
    console.error('foo: error: %s', e.message);
    process.exit(1);
}

console.log("# opts:", opts);
console.log("# args:", opts._args);

// Use `parser.help()` for formatted options help.
if (opts.help) {
    var help = parser.help({includeEnv: true}).trimRight();
    console.log('usage: node foo.js [OPTIONS]\n'
                + 'options:\n'
                + help);
    process.exit(0);
}

// ...
```


Some example output from this script (foo.js):

```
$ node foo.js -h
# opts: { help: true,
  _order: [ { name: 'help', value: true, from: 'argv' } ],
  _args: [] }
# args: []
usage: node foo.js [OPTIONS]
options:
    --version             Print tool version and exit.
    -h, --help            Print this help and exit.
    -v, --verbose         Verbose output. Use multiple times for more verbose.
    -f FILE, --file=FILE  File to process

$ node foo.js -v
# opts: { verbose: [ true ],
  _order: [ { name: 'verbose', value: true, from: 'argv' } ],
  _args: [] }
# args: []

$ node foo.js --version arg1
# opts: { version: true,
  _order: [ { name: 'version', value: true, from: 'argv' } ],
  _args: [ 'arg1' ] }
# args: [ 'arg1' ]

$ node foo.js -f bar.txt
# opts: { file: 'bar.txt',
  _order: [ { name: 'file', value: 'bar.txt', from: 'argv' } ],
  _args: [] }
# args: []

$ node foo.js -vvv --file=blah
# opts: { verbose: [ true, true, true ],
  file: 'blah',
  _order:
   [ { name: 'verbose', value: true, from: 'argv' },
     { name: 'verbose', value: true, from: 'argv' },
     { name: 'verbose', value: true, from: 'argv' },
     { name: 'file', value: 'blah', from: 'argv' } ],
  _args: [] }
# args: []
```


See the ["examples"](examples/) dir for a number of starter examples using
some of dashdash's features.


# Environment variable integration

If you want to allow environment variables to specify options to your tool,
dashdash makes this easy. We can change the 'verbose' option in the example
above to include an 'env' field:

```javascript
    {
        names: ['verbose', 'v'],
        type: 'arrayOfBool',
        env: 'FOO_VERBOSE',         // <--- add this line
        help: 'Verbose output. Use multiple times for more verbose.'
    },
```

then the **"FOO_VERBOSE" environment variable** can be used to set this
option:

```shell
$ FOO_VERBOSE=1 node foo.js
# opts: { verbose: [ true ],
  _order: [ { name: 'verbose', value: true, from: 'env' } ],
  _args: [] }
# args: []
```

Boolean options will interpret the empty string as unset, '0' as false
and anything else as true.

```shell
$ FOO_VERBOSE= node examples/foo.js                 # not set
# opts: { _order: [], _args: [] }
# args: []

$ FOO_VERBOSE=0 node examples/foo.js                # '0' is false
# opts: { verbose: [ false ],
  _order: [ { key: 'verbose', value: false, from: 'env' } ],
  _args: [] }
# args: []

$ FOO_VERBOSE=1 node examples/foo.js                # true
# opts: { verbose: [ true ],
  _order: [ { key: 'verbose', value: true, from: 'env' } ],
  _args: [] }
# args: []

$ FOO_VERBOSE=boogabooga node examples/foo.js       # true
# opts: { verbose: [ true ],
  _order: [ { key: 'verbose', value: true, from: 'env' } ],
  _args: [] }
# args: []
```

Non-booleans can be used as well. Strings:

```shell
$ FOO_FILE=data.txt node examples/foo.js
# opts: { file: 'data.txt',
  _order: [ { key: 'file', value: 'data.txt', from: 'env' } ],
  _args: [] }
# args: []
```

Numbers:

```shell
$ FOO_TIMEOUT=5000 node examples/foo.js
# opts: { timeout: 5000,
  _order: [ { key: 'timeout', value: 5000, from: 'env' } ],
  _args: [] }
# args: []

$ FOO_TIMEOUT=blarg node examples/foo.js
foo: error: arg for "FOO_TIMEOUT" is not a positive integer: "blarg"
```

With the `includeEnv: true` config to `parser.help()` the environment
variable can also be included in **help output**:

    usage: node foo.js [OPTIONS]
    options:
        --version             Print tool version and exit.
        -h, --help            Print this help and exit.
        -v, --verbose         Verbose output. Use multiple times for more verbose.
                              Environment: FOO_VERBOSE=1
        -f FILE, --file=FILE  File to process


# Bash completion

Dashdash provides a simple way to create a Bash completion file that you
can place in your "bash_completion.d" directory -- sometimes that is
"/usr/local/etc/bash_completion.d/"). Features:

- Support for short and long opts
- Support for knowing which options take arguments
- Support for subcommands (e.g. 'git log <TAB>' to show just options for the
  log subcommand). See
  [node-cmdln](https://github.com/trentm/node-cmdln#bash-completion) for
  how to integrate that.
- Does the right thing with "--" to stop options.
- Custom optarg and arg types for custom completions.

Dashdash will return bash completio