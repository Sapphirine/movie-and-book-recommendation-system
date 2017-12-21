/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;
exports.defineMessages = defineMessages;
exports.addLocaleData = addLocaleData;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _intlMessageformat = require('intl-messageformat');

var _intlRelativeformat = require('intl-relativeformat');

var _en = require('./en');

var _en2 = _interopRequireDefault(_en);

var _componentsIntl = require('./components/intl');

exports.IntlProvider = _interopRequire(_componentsIntl);

var _componentsGroup = require('./components/group');

exports.FormattedGroup = _interopRequire(_componentsGroup);

var _componentsDate = require('./components/date');

exports.FormattedDate = _interopRequire(_componentsDate);

var _componentsTime = require('./components/time');

exports.FormattedTime = _interopRequire(_componentsTime);

var _componentsRelative = require('./components/relative');

exports.FormattedRelative = _interopRequire(_componentsRelative);

var _componentsNumber = require('./components/number');

exports.FormattedNumber = _interopRequire(_componentsNumber);

var _componentsPlural = require('./components/plural');

exports.FormattedPlural = _interopRequire(_componentsPlural);

var _componentsMessage = require('./components/message');

exports.FormattedMessage = _interopRequire(_componentsMessage);

var _componentsHtmlMessage = require('./components/html-message');

exports.FormattedHTMLMessage = _interopRequire(_componentsHtmlMessage);

var _inject = require('./inject');

exports.injectIntl = _interopRequire(_inject);

var _types = require('./types');

exports.intlShape = _types.intlShape;

function defineMessages(messageDescriptors) {
    // TODO: Type check in dev? Return something different?
    return messageDescriptors;
}

function addLocaleData() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    var locales = Array.isArray(data) ? data : [data];

    locales.forEach(function (localeData) {
        _intlMessageformat.__addLocaleData(localeData);
        _intlRelativeformat.__addLocaleData(localeData);
    });
}

addLocaleData(_en2['default']);