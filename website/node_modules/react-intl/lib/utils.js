/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

'use strict';

exports.__esModule = true;
exports.escape = escape;
exports.shallowEquals = shallowEquals;
exports.assertIntlContext = assertIntlContext;
exports.shouldIntlComponentUpdate = shouldIntlComponentUpdate;
var ESCAPED_CHARS = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    '\'': '&#x27;'
};

var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
    return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
        return ESCAPED_CHARS[match];
    });
}

function shallowEquals(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

function assertIntlContext() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var intl = _ref.intl;

    if (process.env.NODE_ENV !== 'production') {
        if (!intl) {
            console.error('[React Intl] Could not find required `intl` object. ' + '`IntlProvider` needs to exist in the component ancestry.');
        }
    }
}

function shouldIntlComponentUpdate(instance, nextProps, nextState) {
    var nextContext = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    var context = instance.context || {};
    var intl = context.intl || {};
    var nextIntl = nextContext.intl || {};

    return !shallowEquals(nextProps, instance.props) || !shallowEquals(nextState, instance.state) || !shallowEquals(nextIntl, intl);
}