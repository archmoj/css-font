'use strict'

var t = require('tape')
var font = require('../');

// run separate tests
require('./stringify')
require('./parse')


t('readme', t => {
	var obj = font.parse('1rem "Roboto Condensed", sans-serif');

	t.deepEqual(obj,
		{
			size: '1rem',
			family: ['Roboto Condensed', 'sans-serif']
		}
	)

	t.equal(
		font.stringify(obj),
		'1rem "Roboto Condensed", sans-serif'
	)

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
