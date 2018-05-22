'use strict'

var sizes = require('css-font-size-keywords')

module.exports = {
	isSize: function isSize(value) {
		return /^[\d\.]/.test(value)
			|| value.indexOf('/') !== -1
			|| sizes.indexOf(value) !== -1
	},

	// ['a', 'b'] -> {a: true, b: true}
	a2o: function a2o (a) {
		var o = {}
		for (var i = 0; i < a.length; i++) {
			o[a[i]] = 1
		}
		return o
	}
}
