# concat-stream

Writable stream that concatenates all the data from a stream and calls a callback with the result. Use this when you want to collect all the data from a stream into a single buffer.

[![Build Status](https://travis-ci.org/maxogden/concat-stream.svg?branch=master)](https://travis-ci.org/maxogden/concat-stream)

[![NPM](https://nodei.co/npm/concat-stream.png)](https://nodei.co/npm/concat-stream/)

### description

Streams emit many buffers. If you want to collect all of the buffers, and when the stream ends concatenate all of the buffers together and receive a single buffer then this is the module for you.

Only use this if you know you can fit all of the output of your stream into a single Buffer (e.g. in RAM).

There are also `objectMode` streams that emit things other than Buffers, and you can concatenate these too. See below for details.

## Related

`concat-stream` is part of the [mississippi stream utility collection](https://github.com/maxogden/mississippi) which includes more useful str