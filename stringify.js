'use strict'

var pick = require('pick-by-alias')
var a2o = require('./lib/util').a2o
var isSize = require('./lib/util').isSize

var globals = a2o(require('css-global-keywords'))
var systems = a2o(require('css-system-font-keywords'))
var weights = a2o(require('css-font-weight-keywords'))
var styles = a2o(require('css-font-style-keywords'))
var stretches = a2o(require('css-font-stretch-keywords'))

var variants = {'normal': 1, 'small-caps': 1}
var fams = {
	'serif': 1,
	'sans-serif': 1,
	'monospace': 1,
	'cursive': 1,
	'fantasy': 1,
	'system-ui': 1
}

var defaults = {
	style: 'normal',
	variant: 'small-caps',
	weight: 'normal',
	stretch: 'normal',
	size: '1rem',
	lh: '1',
	family: 'serif'
}

module.exports = function stringifyFont (o) {
	o = pick(o, {
		style: 'style fontstyle fontStyle font-style slope distinction',
		variant: 'variant font-variant fontVariant fontvariant var capitalization',
		weight: 'weight w font-weight fontWeight fontweight',
		stretch: 'stretch font-stretch fontStretch fontstretch width',
		size: 'size s font-size fontSize fontsize height',
		lh: 'lh line-height lineHeight lineheight leading',
		family: 'font family fontFamily font-family fontfamily type typeface face',
		system: 'system reserved default global',
	})

	if (o.system) {
		if (o.system) verify(o.system, systems)
		return o.system
	}

	verify(o.style, styles)
	verify(o.variant, variants)
	verify(o.weight, weights)
	verify(o.stretch, stretches)

	// default root value is medium, but by default it's inherited
	if (o.size == null) o.size = defaults.size
	if (typeof o.size === 'number') o.size += 'px'

	if (!isSize) throw Error('Bad size value `' + o.size + '`')

	// many user-agents use serif, we don't detect that for consistency
	if (!o.family) o.family = defaults.family
	if (Array.isArray(o.family)) {
		if (!o.family.length) o.family = [defaults.family]
		o.family = o.family.map(function (f) {
			return fams[f] ? f : '"' + f + '"'
		}).join(', ')
	}

	// [ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ]
	var result = []

	result.push(o.style)
	result.push(o.variant)
	result.push(o.weight)
	result.push(o.stretch)
	result.push(o.size + (o.lh == null ? '' : ('/' + o.lh)))
	result.push(o.family)

	return result.filter(Boolean).join(' ')
}

function verify (value, values) {
	if (value && !values[value] && !globals[value]) throw Error('Unknown keyword `' + value +'`')

	return value
}