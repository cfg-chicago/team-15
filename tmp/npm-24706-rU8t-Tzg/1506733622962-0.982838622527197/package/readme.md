# crypto-random-string [![Build Status](https://travis-ci.org/sindresorhus/crypto-random-string.svg?branch=master)](https://travis-ci.org/sindresorhus/crypto-random-string)

> Generate a [cryptographically strong](https://en.m.wikipedia.org/wiki/Strong_cryptography) random string

Can be useful for creating an identifier, slug, salt, fixture, etc.


## Install

```
$ npm install --save crypto-random-string
```


## Usage

```js
const cryptoRandomString = require('crypto-random-string');

cryptoRandomString(