/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('../types');

var _utils = require('../utils');

var FormattedTime = (function (_Component) {
    _inherits(FormattedTime, _Component);

    function FormattedTime(props, context) {
        _classCallCheck(this, FormattedTime);

        _Component.call(this, props, context);
        _utils.assertIntlContext(context);
    }

    FormattedTime.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    FormattedTime.prototype.render = function render() {
        var formatTime = this.context.intl.formatTime;

        var props = this.props;

        var formattedTime = formatTime(props.value, props);

        if (typeof props.children === 'function') {
            return props.children(formattedTime);
        }

        return _react2['default'].createElement(
            'span',
            null,
            formattedTime
        );
    };

    return FormattedTime;
})(_react.Component);

exports['default'] = FormattedTime;

FormattedTime.propTypes = _extends({}, _types.dateTimeFormatPropTypes, {
    format: _react.PropTypes.string,
    value: _react.PropTypes.any.isRequired
});

FormattedTime.contextTypes = {
    intl: _types.intlShape
};
module.exports = exports['default'];