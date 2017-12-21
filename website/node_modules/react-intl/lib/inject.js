/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = injectIntl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('./types');

var _utils = require('./utils');

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

function injectIntl(WrappedComponent) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var _options$intlPropName = options.intlPropName;
    var intlPropName = _options$intlPropName === undefined ? 'intl' : _options$intlPropName;

    var InjectIntl = (function (_Component) {
        _inherits(InjectIntl, _Component);

        function InjectIntl(props, context) {
            _classCallCheck(this, InjectIntl);

            _Component.call(this, props, context);
            _utils.assertIntlContext(context);
        }

        InjectIntl.prototype.render = function render() {
            return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, _defineProperty({}, intlPropName, this.context.intl), {
                ref: 'wrappedElement'
            }));
        };

        return InjectIntl;
    })(_react.Component);

    InjectIntl.displayName = 'IntjectIntl(' + getDisplayName(WrappedComponent) + ')';

    InjectIntl.contextTypes = {
        intl: _types.intlShape
    };

    return InjectIntl;
}

module.exports = exports['default'];