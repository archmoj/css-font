﻿var t = require('tcomb');
var unquote = require('unquote');
var cssGlobalValues = require('css-global-values');
var cssSystemFonts = require('css-system-fonts');
var cssFontWeights = require('css-font-weights');
var cssFontStyles = require('css-font-styles');
var cssFontStretches = require('css-font-stretches');

var helpers = require('./lib/helpers');

var SystemFont = t.struct({
	system: t.String
});

var Font = t.struct({
	style: t.String,
	variant: t.String,
	weight: t.String,
	stretch: t.String,
	size: t.String,
	lineHeight: t.union([t.String, t.Number]),
	family: t.list(t.String)
});

var Result = t.union([Font, SystemFont]);

module.exports = t.func(t.String, t.Object).of(
	function(value) {

		if (value === '') {
			throw error('Cannot parse an empty string.');
		}

		if (cssSystemFonts().indexOf(value) !== -1) {
			return SystemFont({ system: value });
		}

		var font = {
			style: 'normal',
			variant: 'normal',
			weight: 'normal',
			stretch: 'normal',
			lineHeight: 'normal'
		};

		var isLocked = false;
		var tokens = value.split(/\s+/);
		var token = tokens.shift();
		for (; !t.Nil.is(token); token = tokens.shift()) {

			if (token === 'normal' || cssGlobalValues.indexOf(token) !== -1) {
				['style', 'variant', 'weight', 'stretch'].forEach(function(prop) {
					font[prop] = token;
				});
				isLocked = true;
				continue;
			}

			if (cssFontWeights.indexOf(token) !== -1) {
				if (isLocked) {
					continue;
				}
				font.weight = token;
				continue;
			}

			if (cssFontStyles.indexOf(token) !== -1) {
				if (isLocked) {
					continue;
				}
				font.style = token;
				continue;
			}

			if (cssFontStretches.indexOf(token) !== -1) {
				if (isLocked) {
					continue;
				}
				font.stretch = token;
				continue;
			}

			if (helpers.isSize(token)) {
				var parts = token.split('/');
				font.size = parts[0];
				if (!t.Nil.is(parts[1])) {
					font.lineHeight = parseLineHeight(parts[1]);
				}
				if (!tokens.length) {
					throw error('Missing required font-family.');
				}
				font.family = tokens.join(' ').split(/\s*,\s*/).map(unquote);
				return Font(font);
			}

			if (font.variant !== 'normal') {
				throw error('Unknown or unsupported font token: ' + font.variant);
			}

			if (isLocked) {
				continue;
			}
			font.variant = token;
		}

		throw error('Missing required font-size.');
	}
);

function error(message) {
	return new Error('[parse-css-font] ' + message);
}

function parseLineHeight(value) {
	var parsed = parseFloat(value);
	if (parsed.toString() === value) {
		return parsed;
	}
	return value;
}
