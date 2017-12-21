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

var FormattedPlural = (function (_Component) {
    _inherits(FormattedPlural, _Component);

    function FormattedPlural(props, context) {
        _classCallCheck(this, FormattedPlural);

        _Component.call(this, props, context);
        _utils.assertIntlContext(context);
    }

    FormattedPlural.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
            next[_key] = arguments[_key];
        }

        return _utils.shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    };

    FormattedPlural.prototype.render = function render() {
        var formatPlural = this.context.intl.formatPlural;

        var props = this.props;

        var pluralCategory = formatPlural(props.value, props);
        var formattedPlural = props[pluralCategory] || props.other;

        if (typeof props.children === 'function') {
            return props.children(formattedPlural);
        }

        return _react2['default'].createElement(
            'span',
            null,
            formattedPlural
        );
    };

    return FormattedPlural;
})(_react.Component);

exports['default'] = FormattedPlural;

FormattedPlural.propTypes = _extends({}, _types.pluralFormatPropTypes, {
    value: _react.PropTypes.any.isRequired,

    // TODO: Should these be functions instead nodes (or?), so that complex
    // nested elements don't have to incur the cost of rendering when they are
    // not used?
    other: _react.PropTypes.node.isRequired,
    zero: _react.PropTypes.node,
    one: _react.PropTypes.node,
    two: _react.PropTypes.node,
    few: _react.PropTypes.node,
    many: _react.PropTypes.node
});

FormattedPlural.defaultProps = {
    style: 'cardinal'
};

FormattedPlural.contextTypes = {
    intl: _types.intlShape
};
module.exports = exports['default'];