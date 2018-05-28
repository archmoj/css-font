# css-font [![NPM version](http://img.shields.io/npm/v/css-font.svg?style=flat)](https://www.npmjs.org/package/css-font) [![Travis Build Status](https://img.shields.io/travis/dy/css-font.svg?label=unix)](https://travis-ci.org/dy/css-font)

Parse or stringify the CSS [font property](https://developer.mozilla.org/en-US/docs/Web/CSS/font) string.

## Usage

[![npm install css-font](https://nodei.co/npm/css-font.png?mini=true)](https://npmjs.org/package/css-font/)

```js
var font = require('css-font');

var obj = font.parse('1rem "Roboto Condensed", sans-serif');

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

font.stringify(obj)

// '1rem "Roboto Condensed", sans-serif'
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
