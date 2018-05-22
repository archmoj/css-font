'use strict'

var t = require('tape')
var {parse, strinfify} = require('../')

require('./stringify')
require('./parse')

t('reversible strings', t => {
	var strings = [
		'',
		''
	]

	strings.forEach(str => {
		t.equal(str, stringify(parse(str)))
	})

	t.end()
})


t('reversible objects', t => {
	var objects = [
		{},
		{}
	]

	objects.forEach(obj => {
		t.deepEqual(str, parse(stringify(obj)))
	})

	t.end()
})


t('fix syntax')
t('browser test')
