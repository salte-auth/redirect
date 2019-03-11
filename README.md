<h3 align="center">
	NOTE: This package is currently a work in progress and shouldn't be used!
</h3>

<h2 align="center">
  <div>
    <a href="https://github.com/salte-auth/redirect">
      <img height="190px" src="https://raw.githubusercontent.com/salte-auth/logos/master/images/logo.svg?sanitize=true">
      <br>
      <br>
      <img height="50px" src="https://raw.githubusercontent.com/salte-auth/logos/master/images/%40salte-auth/redirect.svg?sanitize=true">
    </a>
  </div>
</h2>

<h3 align="center">
	A Salte Auth provider for authenticating via Redirect!
</h3>

<p align="center">
	<strong>
		<a href="https://salte-auth.github.io/salte-auth">Docs</a>
		•
		<a href="https://salte-auth-demo.glitch.me">Demo</a>
	</strong>
</p>

<div align="center">

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Downloads][npm-downloads-image]][npm-url]
  [![Travis][travis-ci-image]][travis-ci-url]
  [![Coveralls][coveralls-image]][coveralls-url]

  [![semantic-release][semantic-release-image]][semantic-release-url]
  [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

</div>

## Supported Browsers

_If a version isn't specified that means we test on the latest and greatest, however most versions of that browser should work._

- Chrome
- Firefox
- Safari 8+ (7.1 and below require a [Promise polyfill](#promise-polyfill))
- Edge
- IE 10+ (Requires a [Promise polyfill](#promise-polyfill))

## Install

```sh
$ npm install @salte-auth/redirect
```

## Usage

```js
import { SalteAuth } from '@salte-auth/salte-auth';
import { GitHub } from '@salte-auth/github';
import { Redirect } from '@salte-auth/redirect';

const auth = new SalteAuth({
  providers: [
    new GitHub('12345')
  ],

  handlers: [
    new Redirect()
  ]
});

auth.login('github');
```

[npm-version-image]: https://img.shields.io/npm/v/@salte-auth/redirect.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@salte-auth/redirect.svg?style=flat
[npm-url]: https://npmjs.org/package/@salte-auth/redirect

[travis-ci-image]: https://img.shields.io/travis/com/salte-auth/redirect/master.svg?style=flat
[travis-ci-url]: https://travis-ci.com/salte-auth/redirect

[coveralls-image]: https://img.shields.io/coveralls/salte-auth/redirect/master.svg
[coveralls-url]: https://coveralls.io/github/salte-auth/redirect?branch=master

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: https://commitizen.github.io/cz-cli/

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[greenkeeper-image]: https://badges.greenkeeper.io/salte-auth/redirect.svg
[greenkeeper-url]: https://greenkeeper.io
