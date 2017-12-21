/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;
exports.formatDate = formatDate;
exports.formatTime = formatTime;
exports.formatRelative = formatRelative;
exports.formatNumber = formatNumber;
exports.formatPlural = formatPlural;
exports.formatMessage = formatMessage;
exports.formatHTMLMessage = formatHTMLMessage;

var _types = require('./types');

var _utils = require('./utils');

var DATE_TIME_FORMAT_OPTIONS = Object.keys(_types.dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(_types.numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(_types.relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(_types.pluralFormatPropTypes);

function filterFormatOptions(whitelist, obj) {
    var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return whitelist.reduce(function (opts, name) {
        if (obj.hasOwnProperty(name)) {
            opts[name] = obj[name];
        } else if (defaults.hasOwnProperty(name)) {
            opts[name] = defaults[name];
        }

        return opts;
    }, {});
}

function getNamedFormat(formats, type, name) {
    var format = formats && formats[type] && formats[type][name];
    if (format) {
        return format;
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error('[React Intl] No ' + type + ' format named: ' + name);
    }
}

function formatDate(intl, config, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var format = options.format;

    var date = new Date(value);
    var defaults = format && getNamedFormat(formats, 'date', format);

    var filteredOptions = filterFormatOptions(DATE_TIME_FORMAT_OPTIONS, options, defaults);

    return intl.getDateTimeFormat(locale, filteredOptions).format(date);
}

function formatTime(intl, config, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var format = options.format;

    var date = new Date(value);
    var defaults = format && getNamedFormat(formats, 'time', format);

    var filteredOptions = filterFormatOptions(DATE_TIME_FORMAT_OPTIONS, options, defaults);

    return intl.getDateTimeFormat(locale, filteredOptions).format(date);
}

function formatRelative(intl, config, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var now = options.now;
    var format = options.format;

    var date = new Date(value);
    var defaults = format && getNamedFormat(formats, 'relative', format);

    var filteredOptions = filterFormatOptions(RELATIVE_FORMAT_OPTIONS, options, defaults);

    return intl.getRelativeFormat(locale, filteredOptions).format(date, { now: now });
}

function formatNumber(intl, config, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var format = options.format;

    var defaults = format && getNamedFormat(formats, 'number', format);

    var filteredOptions = filterFormatOptions(NUMBER_FORMAT_OPTIONS, options, defaults);

    return intl.getNumberFormat(locale, filteredOptions).format(value);
}

function formatPlural(intl, config, value) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;

    var filteredOptions = filterFormatOptions(PLURAL_FORMAT_OPTIONS, options);
    return intl.getPluralFormat(locale, filteredOptions).format(value);
}

function formatMessage(intl, config, messageDescriptor) {
    var values = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var locale = config.locale;
    var formats = config.formats;
    var messages = config.messages;
    var defaultLocale = config.defaultLocale;
    var defaultFormats = config.defaultFormats;
    var id = messageDescriptor.id;
    var defaultMessage = messageDescriptor.defaultMessage;

    // TODO: What should we do when the message descriptor doesn't have an `id`?
    // Should we return some placeholder value, not care, or throw?

    var message = messages && messages[id];

    if (!(message || defaultMessage)) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('[React Intl] Cannot format message. ' + ('Missing message: "' + id + '" for locale: "' + locale + '", ') + 'and no default message was provided.');
        }

        return id;
    }

    var formattedMessage = undefined;

    if (message) {
        try {
            var formatter = intl.getMessageFormat(message, locale, formats);

            formattedMessage = formatter.format(values);
        } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('[React Intl] Error formatting message: "' + id + '"\n' + e);
            }
        }
    }

    if (!formattedMessage && defaultMessage) {
        try {
            var formatter = intl.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

            formattedMessage = formatter.format(values);
        } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('[React Intl] Error formatting the default message for: ' + ('"' + id + '"\n' + e));
            }
        }
    }

    if (!formattedMessage) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('[React Intl] Using source fallback for message: "' + id + '"');
        }
    }

    // TODO: Should the string first be trimmed? This will support strings
    // defined using template literals. <pre> rendering would be the counter.
    return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(intl, config, messageDescriptor) {
    var rawValues = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    // Process all the values before they are used when formatting the ICU
    // Message string. Since the formatted message might be injected via
    // `innerHTML`, all String-based values need to be HTML-escaped.
    var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
        var value = rawValues[name];
        escaped[name] = typeof value === 'string' ? _utils.escape(value) : value;
        return escaped;
    }, {});

    return formatMessage(intl, config, messageDescriptor, escapedValues);
}