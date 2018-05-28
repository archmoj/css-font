'use strict'

const t = require('tape');
const parse = require('../parse');
const globalKeywords = require('css-global-keywords');
const systemFontKeywords = require('css-system-font-keywords');
const fontWeightKeywords = require('css-font-weight-keywords');
const fontStyleKeywords = require('css-font-style-keywords');
const fontStretchKeywords = require('css-font-stretch-keywords');


t('throws when attempting to parse a number', (t) => {
	t.throws(
		() => {
			parse(42);
		},
		/Font argument must be a string\.$/
	)

	t.end()
});

t('throws when attempting to parse an empty string', (t) => {
	t.throws(
		() => {
			parse('');
		},
		/Cannot parse an empty string\.$/
	);

	t.end()
});

t('throws when the font-size is missing', (t) => {
	t.throws(
		() => {
			parse('foo');
		},
		/Unknown or unsupported font token/
	);

	t.end()
});

t('throws when the font-family is missing', (t) => {
	t.throws(
		() => {
			parse('1rem');
		},
		/Missing required font-family\.$/
	);

	t.end()
});

systemFontKeywords.forEach((systemFont) => {
	t('detects system font keyword: ' + systemFont, (t) => {
		t.deepEqual(
			parse(systemFont),
			{ system: systemFont }
		);
		t.end()
	});
});

t('detects size: 1rem and family: serif', (t) => {
	compare(t,
		parse('1rem serif'),
		{
			family: ['serif'],
			size: '1rem',
		}
	);
	t.end()
});

t('detects line-height: 1.2', (t) => {
	compare(t,
		parse('1rem/1.2 serif'),
		{
			lineHeight: 1.2,
		}
	);
	t.end()
});

t('detects font-size and line-height when using spaces around "/" separator', (t) => {
	compare(t,
		parse('1rem / 1.2 serif'),
		{
			lineHeight: 1.2,
			size: '1rem',
		}
	);
	t.end()
});

t('preserves line-height unit', (t) => {
	compare(t,
		parse('1rem/1.2em serif'),
		{
			lineHeight: '1.2em',
		}
	);
	t.end()
});

t('unquotes each font-family', (t) => {
	compare(t,
		parse('1rem/1.2em foo bar, "foo bar baz", \'foo\', bar, baz'),
		{
			family: ['foo bar', 'foo bar baz', 'foo', 'bar', 'baz'],
		}
	);
	t.end()
});

t('preserves functions with spaces and commas inside', (t) => {
	compare(t,
		parse('fn(a, b, c)/fn(x, y, z) serif'),
		{
			lineHeight: 'fn(x, y, z)',
			size: 'fn(a, b, c)',
		}
	);
	t.end()
});

t('preserves functions with slashes inside', (t) => {
	compare(t,
		parse('fn(a / b / c)/fn(x / y / z) serif'),
		{
			lineHeight: 'fn(x / y / z)',
			size: 'fn(a / b / c)',
		}
	);
	t.end()
});

fontWeightKeywords.forEach((weight) => {
	t('detects weight: ' + weight, (t) => {
		compare(t,
			parse(weight + ' 1rem serif'),
			{ weight }
		);
		t.end()
	});
});

fontStyleKeywords.forEach((style) => {
	t('detects style: ' + style, (t) => {
		compare(t,
			parse(style + ' 1rem serif'),
			{ style }
		);
		t.end()
	});
});

fontStretchKeywords.forEach((stretch) => {
	t('detects stretch: ' + stretch, (t) => {
		compare(t,
			parse(stretch + ' 1rem serif'),
			{ stretch }
		);
		t.end()
	});
});

t.skip('throws undetected variant property', (t) => {
	t.throws(() => parse('foo 1rem serif'))
	t.end()
});

t('throws with two undetected properties: foo bar', (t) => {
	t.throws(
		() => {
			parse('foo bar');
		},
		/Unknown or unsupported font token: foo/
	);
	t.end()
});

t('detects style, variant, weight, stretch, size, lineHeight and family', (t) => {
	[
		'italic small-caps 500 condensed',
		'condensed 500 small-caps italic',
	].forEach((font) => {
		t.deepEqual(
			parse(font + ' 1rem/1.2 serif'),
			{
				family: ['serif'],
				lineHeight: 1.2,
				size: '1rem',
				stretch: 'condensed',
				style: 'italic',
				variant: 'small-caps',
				weight: '500',
			}
		);
	});
	t.end()
});

t('overrides all props before size with normal when one prop is normal', (t) => {
	t.deepEqual(
		parse('normal italic foo 500 condensed 1rem/1.2 serif'),
		{
			family: ['serif'],
			lineHeight: 1.2,
			size: '1rem',
			stretch: 'normal',
			style: 'normal',
			variant: 'normal',
			weight: 'normal',
		}
	);
	t.end()
});

globalKeywords.forEach((value) => {
	t('overrides all props before size with ' + value + ' when one prop is ' + value, (t) => {
		t.deepEqual(
			parse('italic ' + value + ' 500 condensed 1rem/1.2 serif'),
			{
				family: ['serif'],
				lineHeight: 1.2,
				size: '1rem',
				stretch: value,
				style: value,
				variant: value,
				weight: value,
			}
		);
		t.end()
	});
});

t('returns defaults for style, variant, weight, stretch and lineHeight', (t) => {
	t.deepEqual(
		parse('1rem serif'),
		{
			family: ['serif'],
			// lineHeight: 'normal',
			size: '1rem',
			// stretch: 'normal',
			// style: 'normal',
			// variant: 'normal',
			// weight: 'normal',
		}
	);
	t.end()
});

function compare (t, o1, o2) {
	Object.keys(o2).forEach((key) => {
		t.deepEqual(o1[key], o2[key]);
	});
}
