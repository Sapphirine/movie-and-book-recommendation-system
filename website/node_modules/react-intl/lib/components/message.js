/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _types = require('../types');

var _utils = require('../utils');

var FormattedMessage = (function (_Component) {
    _inherits(FormattedMessage, _Component);

    function FormattedMessage(props, context) {
        _classCallCheck(this, FormattedMessage);

        _Component.call(this, props, context);
        _utils.assertIntlContext(context);
    }

    FormattedMessage.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var values = this.props.values;
        var nextValues = nextProps.values;

        if (!_utils.shallowEquals(nextValues, values)) {
            return true;
        }

        var nextPropsToCheck = _extends({}, nextProps, {
            values: null
        });

        for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            next[_key - 1] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    };

    FormattedMessage.prototype.render = function render() {
        var formatMessage = this.context.intl.formatMessage;

        var props = this.props;

        var id = props.id;
        var description = props.description;
        var defaultMessage = props.defaultMessage;
        var values = props.values;
        var tagName = props.tagName;

        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);
        var tokenRegexp = new RegExp('(@__ELEMENT-' + uid + '-\\d+__@)', 'g');

        var generateToken = (function () {
            var counter = 0;
            return function () {
                return '@__ELEMENT-' + uid + '-' + (counter += 1) + '__@';
            };
        })();

        var tokenizedValues = {};
        var elements = {};

        // Iterates over the `props` to keep track of any React Element values
        // so they can be represented by the `token` as a placeholder when the
        // `message` is formatted. This allows the formatted message to then be
        // broken-up into parts with references to the React Elements inserted
        // back in.
        Object.keys(values).forEach(function (name) {
            var value = values[name];

            if (_react.isValidElement(value)) {
                var token = generateToken();
                tokenizedValues[name] = token;
                elements[token] = value;
            } else {
                tokenizedValues[name] = value;
            }
        });

        var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
        var formattedMessage = formatMessage(descriptor, tokenizedValues);

        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This approach
        // allows messages to render with React Elements while keeping React's
        // virtual diffing working properly.
        var nodes = formattedMessage.split(tokenRegexp).filter(function (part) {
            return !!part;
        }).map(function (part) {
            return elements[part] || part;
        });

        if (typeof props.children === 'function') {
            return props.children.apply(props, _toConsumableArray(nodes));
        }

        return _react.createElement.apply(undefined, [tagName, null].concat(_toConsumableArray(nodes)));
    };

    return FormattedMessage;
})(_react.Component);

exports['default'] = FormattedMessage;

FormattedMessage.propTypes = {
    id: _react.PropTypes.string.isRequired,
    description: _react.PropTypes.string,
    defaultMessage: _react.PropTypes.string,

    values: _react.PropTypes.object,
    tagName: _react.PropTypes.string
};

FormattedMessage.contextTypes = {
    intl: _types.intlShape
};

FormattedMessage.defaultProps = {
    tagName: 'span',
    values: {}
};
module.exports = exports['default'];