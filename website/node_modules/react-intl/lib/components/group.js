/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var Group = (function (_Component) {
    _inherits(Group, _Component);

    function Group() {
        _classCallCheck(this, Group);

        _Component.apply(this, arguments);
    }

    Group.prototype.render = function render() {
        var props = this.props;

        var renderDelegate = Object.keys(props).filter(function (prop) {
            return _react.isValidElement(props[prop]);
        }).reduceRight(function (renderDelegate, prop) {
            return function () {
                var nodes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                return _react.cloneElement(props[prop], null, function (node) {
                    nodes[prop] = node;
                    return renderDelegate(nodes);
                });
            };
        }, props.children);

        return renderDelegate();
    };

    return Group;
})(_react.Component);

exports['default'] = Group;

Group.propTypes = {
    children: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];