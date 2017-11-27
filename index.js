'use strict';

var DOMSplicer = function (cache, modules) {
  function require(i) {
    return cache[i] || get(i);
  }
  function get(i) {
    var exports = {},
        module = { exports: exports };
    modules[i].call(exports, window, require, module, exports);
    return cache[i] = module.exports;
  }
  require.E = function (exports) {
    return Object.defineProperty(exports, '__esModule', { value: true });
  };
  var main = require(0);
  return main.__esModule ? main["default"] : main;
}([], [function (global, require, module, exports) {
  // index.js
  'use strict';
  /*! (c) Andrea Giammarchi (ISC) */

  var isArray = Array.isArray;
  var min = Math.min,
      max = Math.max;

  var arraySplice = [].splice;

  var fragment = function fragment(target, item, list, i, length) {
    var f = target.ownerDocument.createDocumentFragment();
    while (i < length) {
      f.appendChild(item(list[i++]));
    }return f;
  };

  var identity = function identity(thing) {
    return thing;
  };

  var remove = function remove(target, item, list, i, length) {
    while (i < length--) {
      target.removeChild(item(list[length]));
    }
  };

  // not using a class to avoid Babel bloat
  function DOMSplicer(options) {
    var before = options.before,
        target = options.target;

    var item = options.item || identity;
    var childNodes = options.childNodes || (before ? [] : target.childNodes);
    this.item = item;
    this.target = target ? item(target) : null;
    this.before = before ? item(before) : null;
    this.childNodes = childNodes;
    this.applySplice = isArray(childNodes);
    this.placeHolder = (this.target || this.before).ownerDocument.createComment('');
  }

  DOMSplicer.prototype.splice = function splice(start, deleteCount) {
    var aLength = arguments.length;
    if (aLength < 1) return;
    var item = this.item;
    var before = this.before;
    var target = this.target || before.parentNode;
    var childNodes = this.childNodes;
    var placeHolder = this.placeHolder;
    var len = childNodes.length;
    var index = start < 0 ? max(len + start, 0) : min(start, len);
    var count = aLength < 2 ? len - index : min(max(deleteCount, 0), len - index);
    target.insertBefore(placeHolder, index < len ? item(childNodes[index]) : before);
    var copy = childNodes;
    var added = 1;
    if (this.applySplice) {
      added = 0;
      copy = copy.slice();
      arraySplice.apply(childNodes, arguments);
    }
    if (count) remove(target, item, copy, added + index, added + index + count);
    if (aLength > 2) {
      target.insertBefore(aLength > 3 ? fragment(target, item, arguments, 2, aLength) : item(arguments[2]), placeHolder);
    }
    target.removeChild(placeHolder);
  };

  require.E(exports)["default"] = DOMSplicer;
}]);

