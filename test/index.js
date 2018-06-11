'use strict'

var t = require('tape')
var font = require('../')
var s = font.stringify, p = font.parse

// run separate tests
require('./stringify')
require('./parse')


t('readme', t => {

	var obj = font.parse('small-caps 1rem/1.2 "Roboto Condensed", sans-serif');

	t.deepEqual(obj, {
		size: '1rem',
		lineHeight: 1.2,
		variant: 'small-caps',
		stretch: 'normal',
		weight: 'normal',
		style: 'normal',
		family: ['Roboto Condensed', 'sans-serif']
	})

	t.equal(
		font.stringify(obj),
		'normal small-caps 1rem/1.2 "Roboto Condensed", sans-serif'
	)

	t.end()
})

t.skip('reversible', t => {

	// console.log(s({
	// 	family: ["Roboto", "sans-serif"],
	// 	stretch: "normal",
	// 	weight: 100
	// }))

	console.log(p('100 normal 1rem "Roboto", sans-serif'))

	t.end()
})

// t('reversible strings', t => {
// 	var strings = [
// 		'',
// 		''
// 	]

// 	strings.forEach(str => {
// 		t.equal(str, stringify(parse(str)))
// 	})

// 	t.end()
// })


// t('reversible objects', t => {
// 	var objects = [
// 		{},
// 		{}
// 	]

// 	objects.forEach(obj => {
// 		t.deepEqual(str, parse(stringify(obj)))
// 	})

// 	t.end()
// })


t('fix wrong font syntax')
t('compare with browser')
