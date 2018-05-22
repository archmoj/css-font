# css-font [![NPM version](http://img.shields.io/npm/v/css-font.svg?style=flat)](https://www.npmjs.org/package/css-font) [![Travis Build Status](https://img.shields.io/travis/dy/css-font.svg?label=unix)](https://travis-ci.org/dy/css-font)

[![npm](https://nodei.co/npm/css-font.svg?downloads=true)](https://nodei.co/npm/css-font/)

Parses/stringifies the CSS [font property](https://developer.mozilla.org/en-US/docs/Web/CSS/font#font-variant-css21).

## Installation

```
$ npm install css-font [--save[-dev]]
```

## Usage

```js
var {parse, stringify} = require('css-font');

parse('1rem "Roboto Condensed", sans-serif;');

/*
{
	size: '1rem',
	family: ['Roboto Condensed', 'sans-serif'],
	style: 'normal',
	variant: 'normal',
	weight: 'normal',
	stretch: 'normal',
	lineHeight: 'normal'
}
*/
```

See [the tests](https://github.com/dy/css-font/blob/master/test/index.js) for more scenarios.

## Testing

```
$ npm test
```

This will run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.


## License

© 2018 Dmitry Yv. MIT License

Development supported by [plot.ly](https://github.com/plotly/).
