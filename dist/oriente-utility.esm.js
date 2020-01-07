/**
 * Format price
 *
 * @param {number} number - price
 * @param {string} currency - PH, ID
 * @returns {string}
 */
const formatPrice = (number, currency, options = {}) => {
  const localeOptions = Object.assign(
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20
    },
    options
  );
  return Number(number).toLocaleString(currency, localeOptions)
};

/**
 * @typedef {Object} CurrencyOptions
 * @property {string} key - PH, ID
 * @property {string} currency - PHP, IDR
 * @property {string} symbol - ₱, Rp, $
 * @property {number} precision - fraction digits
 */

/**
 * Get currency options
 *
 * @param {string} currency - PH, ID
 * @returns {CurrencyOptions}
 */
const getCurrencyOpts = currency => {
  switch (currency) {
    case 'PH':
    case 'PHP':
      return {
        key: 'PH',
        currency: 'PHP',
        symbol: '₱',
        precision: 2
      }
    case 'ID':
    case 'IDR':
      return {
        key: 'ID',
        currency: 'IDR',
        symbol: 'Rp',
        precision: 0
      }
    default:
      return {
        currency,
        symbol: '$',
        precision: 0
      }
  }
};

/**
 * Format price with symbol
 *
 * @param {number} amount - price
 * @param {CurrencyOptions} options - definition of currency and fraction digit
 * @returns {string}
 */
const formatPriceWithSymbol = (amount, options = {}) => {
  const number = Number(amount);
  if (isNaN(number)) {
    return amount
  }
  const defaultOptions = getCurrencyOpts(options.currency);
  const { key, symbol, precision } = Object.assign({}, defaultOptions, options);

  const absNumber = Math.abs(number);
  const price = formatPrice(absNumber, key, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  });
  return `${number <= 0 ? '- ' : ''}${symbol}${price}`
};

var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

var decodeUriComponent = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

var splitOnFirst = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(',')];
			};

		default:
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
				const newValue = isArray ? value.split(',') : value;
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode$1(value, options) {
	if (options.decode) {
		return decodeUriComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : decode$1(value, options);
		formatter(decode$1(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

var extract_1 = extract;
var parse_1 = parse;

var stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none'
	}, options);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = Object.assign({}, object);
	if (options.skipNull) {
		for (const key of Object.keys(objectCopy)) {
			if (objectCopy[key] === undefined || objectCopy[key] === null) {
				delete objectCopy[key];
			}
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

var parseUrl = (input, options) => {
	return {
		url: removeHash(input).split('?')[0] || '',
		query: parse(extract(input), options)
	};
};

var queryString = {
	extract: extract_1,
	parse: parse_1,
	stringify: stringify,
	parseUrl: parseUrl
};

/**
 * Get queries from browser
 *
 * @returns {object}
 */
const getQueries = () => {
  if (typeof window !== 'object') return {}
  return queryString.parse(window.location.search)
};

/**
 * @typedef {Object} Query
 * @property {string} key - query key
 * @property {string} value - query value
 */

/**
 * Add queries
 *
 * @param {Query[]} queries
 * @returns {object}
 */
const addQueries = queries => {
  const parsed = getQueries();
  return queries.reduce((result, { key, value }) => {
    return Object.assign({}, result, { [key]: value })
  }, parsed)
};

/**
 * Remove queries
 *
 * @param {string[]} keys - query key names
 * @returns {object}
 */
const removeQueries = keys => {
  const parsed = getQueries();
  keys.forEach(key => delete parsed[key]);
  return parsed
};

/**
 * Uppercase the first character of string
 *
 * @param {string} input - string
 * @param {boolean} lowerRest - lowercase the rest characters
 * @returns {string}
 */
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * Left padding with zero
 *
 * @param {number} n - origin number
 * @param {number} length - expected length
 * @returns {string}
 */
const zeroStart = (n, length) => n.toString().padStart(length, '0');

/**
 * Format mobile numbers
 *
 * @example
 * formatMobile('+62-1234567890') // +62 1234567890
 * formatMobile('+886-987654321') // +886 987654321
 *
 * @param {string} mobile - mobile numbers
 * @returns {string}
 */
const formatMobile = mobile => {
  const match = mobile.match(/^(\+\d{2,3})-(\d+)$/);
  if (!match) return mobile
  return `${match[1]} ${match[2]}`
};

/**
 * Get GMT string in ID format
 *
 * @param {Date} iso - date object
 * @returns {string}
 */
const getIdGMTString = iso => {
  if (!iso) return ''
  const locale = 'id';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso
  const year = date.toLocaleDateString(locale, { year: 'numeric' });
  const month = date.toLocaleDateString(locale, { month: 'short' });
  const day = date.toLocaleDateString(locale, { day: '2-digit' });
  const hour = zeroStart(date.getHours(), 2);
  const minute = zeroStart(date.getMinutes(), 2);
  return `${day} ${month}, ${year} ${hour}:${minute}`
};

/**
 * Get parsed cookie
 *
 * @param {string} cookie - cookie string
 * @returns {object}
 */
const getParsedCookie = cookie => {
  if (!cookie) return {}
  const match = cookie.match(/[^\s]+?=([^;\s]+)/g);
  const obj = {};
  for (const str of match) {
    const m = str.match(/(.+)=(.+)/);
    obj[m[1]] = m[2];
  }
  return obj
};

/**
 * Validate string length
 *
 * @param {number} n - expected string length
 * @param {string} err - error message
 * @returns {boolean|string}
 */
const isLengthEqualTo = (n = 0, err = '') => value => {
  return String(value).length === n || err
};

/**
 * Validate input value is empty or not
 *
 * @param {object|Array} val - input value
 * @returns {boolean|null}
 */
const isEmpty = val => {
  if (typeof val !== 'object') {
    return null
  }
  return Object.keys(val).length === 0
};

var index = {
  formatPrice,
  formatSymbolPrice: formatPriceWithSymbol,
  getCurrencyOpts,

  getQueries,
  addQueries,
  removeQueries,

  capitalize,
  zeroStart,
  formatMobile,
  getIdGMTString,
  getParsedCookie,
  isLengthEqualTo,
  isEmpty
};

export default index;
export { addQueries, capitalize, formatMobile, formatPrice, formatPriceWithSymbol as formatSymbolPrice, getCurrencyOpts, getIdGMTString, getParsedCookie, getQueries, isEmpty, isLengthEqualTo, removeQueries, zeroStart };
