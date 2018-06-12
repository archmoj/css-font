'use strict'

var t = require('tape')
var s = require('../stringify')

var systemFontKeywords = require('css-system-font-keywords')
var fontWeightKeywords = require('css-font-weight-keywords')
var fontStyleKeywords = require('css-font-style-keywords')
var fontStretchKeywords = require('css-font-stretch-keywords')


t('parse-css-font cases', t => {
	systemFontKeywords.forEach(function(systemFont) {
		t.equal(s({ system: systemFont }),
			systemFont,
			'stringifies system font keyword: ' + systemFont
		)
	})

	t.equal(s({
			size: '1rem',
			family: ['serif']
		}),
		'1rem serif',
		'stringifies size: 1rem and family: serif'
	)

	t.equal(s({
			lineHeight: 1.2
		}),
		'1rem/1.2 serif',
		'stringifies line-height: 1.2'
	)

	t.equal(s({
			size: '1rem',
			lineHeight: '1.2em'
		}),
		'1rem/1.2em serif',
		'preserves line-height unit'
	)

	t.equal(s({
			lineHeight: '1.2em',
			family: ['foo bar', 'foo bar baz', 'foo', 'bar', 'baz', 'sans-serif']
		}),
		'1rem/1.2em "foo bar", "foo bar baz", "foo", "bar", "baz", sans-serif',
		'quotes each font-family'
	)

	t.equal(s({
			size: 'fn(a, b, c)',
			lineHeight: 'fn(x, y, z)'
		}),
		'fn(a, b, c)/fn(x, y, z) serif',
		'preserves functions with spaces and commas inside'
	)

	t.equal(s({
			size: 'fn(a / b / c)',
			lineHeight: 'fn(x / y / z)'
		}),
		'fn(a / b / c)/fn(x / y / z) serif',
		'preserves functions with slashes inside'
	)

	fontWeightKeywords.forEach(function(weight) {
		t.equal(s({ weight: weight }),
			weight + ' 1rem serif',
			'stringifies weight: ' + weight
		)
	})

	fontStyleKeywords.forEach(function(style) {
		t.equal(s({ style: style }),
			style + ' 1rem serif',
			'stringifies style: ' + style
		)
	})

	fontStretchKeywords.forEach(function(stretch) {
		t.equal(s({ stretch: stretch }),
			stretch + ' 1rem serif',
			'stringifies stretch: ' + stretch
		)
	})

	t.equal(s({ variant: 'small-caps' }),
		'small-caps 1rem serif',
		'stringify font variant'
	)

	t.throws(
		() => s({ variant: 'foo' })
	)

	t.equal(
		s({
			style: 'italic',
			variant: 'small-caps',
			weight: '500',
			stretch: 'condensed',
			size: '1rem',
			lineHeight: 1.2,
			family: ['serif']
		}),
		'italic small-caps 500 condensed 1rem/1.2 serif',
		'stringifies style, variant, weight, stretch, size, lineHeight and family'
	)

	t.end()
})


t('Ignore normal line-height', t => {
	t.equal(s({
		family: ["Roboto", "sans-serif"],
		lineHeight: "normal",
		size: "1rem",
		stretch: "condensed",
		style: "normal",
		variant: "normal",
		weight: "100"
	}), 'normal 100 condensed 1rem "Roboto", sans-serif')

	t.end()
})
