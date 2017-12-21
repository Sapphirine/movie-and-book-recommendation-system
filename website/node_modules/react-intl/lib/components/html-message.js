/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _types = require('../types');

var _utils = require('../utils');

var FormattedHTMLMessage = (function (_Component) {
    _inherits(FormattedHTMLMessage, _Component);

    function FormattedHTMLMessage(props, context) {
        _classCallCheck(this, FormattedHTMLMessage);

        _Component.call(this, props, context);
        _utils.assertIntlContext(context);
    }

    FormattedHTMLMessage.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
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

    FormattedHTMLMessage.prototype.render = function render() {
        var formatHTMLMessage = this.context.intl.formatHTMLMessage;

        var props = this.props;

        var id = props.id;
        var description = props.description;
        var defaultMessage = props.defaultMessage;
        var values = props.values;
        var tagName = props.tagName;

        var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
        var formattedHTMLMessage = formatHTMLMessage(descriptor, values);

        if (typeof props.children === 'function') {
            return props.children(formattedHTMLMessage);
        }

        // Since the message presumably has HTML in it, we need to set
        // `innerHTML` in order for it to be rendered and not escaped by React.
        // To be safe, all string prop values were escaped before formatting the
        // message. It is assumed that the message is not UGC, and came from the
        // developer making it more like a template.
        //
        // Note: There's a perf impact of using this component since there's no
        // way for React to do its virtual DOM diffing.
        return _react.createElement(tagName, {
            dangerouslySetInnerHTML: {
                __html: formattedHTMLMessage
            }
        });
    };

    return FormattedHTMLMessage;
})(_react.Component);

exports['default'] = FormattedHTMLMessage;

FormattedHTMLMessage.propTypes = {
    id: _react.PropTypes.string,
    description: _react.PropTypes.string,
    defaultMessage: _react.PropTypes.string,

    values: _react.PropTypes.object,
    tagName: _react.PropTypes.string
};

FormattedHTMLMessage.contextTypes = {
    intl: _types.intlShape
};

FormattedHTMLMessage.defaultProps = {
    tagName: 'span',
    values: {}
};
module.exports = exports['default'];