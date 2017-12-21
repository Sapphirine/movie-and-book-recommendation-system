/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _intlMessageformat = require('intl-messageformat');

var _intlMessageformat2 = _interopRequireDefault(_intlMessageformat);

var _intlRelativeformat = require('intl-relativeformat');

var _intlRelativeformat2 = _interopRequireDefault(_intlRelativeformat);

var _plural = require('../plural');

var _plural2 = _interopRequireDefault(_plural);

var _intlFormatCache = require('intl-format-cache');

var _intlFormatCache2 = _interopRequireDefault(_intlFormatCache);

var _utils = require('../utils');

var _types = require('../types');

var _format = require('../format');

var format = _interopRequireWildcard(_format);

var intlPropNames = Object.keys(_types.intlPropTypes);
var intlFormatPropNames = Object.keys(_types.intlFormatPropTypes);

var IntlProvider = (function (_Component) {
    _inherits(IntlProvider, _Component);

    function IntlProvider(props) {
        _classCallCheck(this, IntlProvider);

        _Component.call(this, props);

        // Creating `Intl*` formatters is expensive so these format caches
        // memoize the `Intl*` constructors and have the same lifecycle as this
        // IntlProvider instance.
        this.state = {
            getDateTimeFormat: _intlFormatCache2['default'](Intl.DateTimeFormat),
            getNumberFormat: _intlFormatCache2['default'](Intl.NumberFormat),
            getMessageFormat: _intlFormatCache2['default'](_intlMessageformat2['default']),
            getRelativeFormat: _intlFormatCache2['default'](_intlRelativeformat2['default']),
            getPluralFormat: _intlFormatCache2['default'](_plural2['default'])
        };
    }

    IntlProvider.prototype.getConfig = function getConfig() {
        var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

        return intlPropNames.reduce(function (config, name) {
            config[name] = props[name];
            return config;
        }, {});
    };

    IntlProvider.prototype.getBoundFormatFns = function getBoundFormatFns(intl, config) {
        return intlFormatPropNames.reduce(function (boundFormatFns, name) {
            boundFormatFns[name] = format[name].bind(null, intl, config);
            return boundFormatFns;
        }, {});
    };

    IntlProvider.prototype.getChildContext = function getChildContext() {
        var intl = this.state;
        var config = this.getConfig();

        // Bind intl factories and current config to the format functions.
        var boundFormatFns = this.getBoundFormatFns(intl, config);

        return {
            intl: _extends({}, config, boundFormatFns)
        };
    };

    IntlProvider.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    IntlProvider.prototype.render = function render() {
        var children = this.props.children;

        if (typeof children === 'function') {
            // TODO: Pass the result of `this.getChildContext()` to the child fn?
            // Or just `{...this.props, ...this.state}`? Or nothing!? Passing
            // stuff would expose the underlying info and make it part of the
            // public API.
            return children();
        }

        return children;
    };

    return IntlProvider;
})(_react.Component);

exports['default'] = IntlProvider;

IntlProvider.propTypes = _types.intlPropTypes;

IntlProvider.defaultProps = {
    // TODO: Should `locale` default to 'en'? Or would that cause issues with
    // the meaning of no-locale, which means the user's default.
    formats: {},
    messages: {},

    defaultLocale: 'en',
    defaultFormats: {}
};

IntlProvider.childContextTypes = {
    intl: _types.intlShape.isRequired
};
module.exports = exports['default'];