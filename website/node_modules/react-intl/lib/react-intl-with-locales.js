/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _localeDataIndex = require('./locale-data/index');

var _localeDataIndex2 = _interopRequireDefault(_localeDataIndex);

var _reactIntl = require('./react-intl');

_defaults(exports, _interopExportWildcard(_reactIntl, _defaults));

_reactIntl.addLocaleData(_localeDataIndex2['default']);