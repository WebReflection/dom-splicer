# dom-splicer

[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/dom-splicer/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/dom-splicer?branch=master) [![Build Status](https://travis-ci.org/WebReflection/dom-splicer.svg?branch=master)](https://travis-ci.org/WebReflection/dom-splicer) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A minimalist, performance oriented, splicer able to mutate an element's `childNodes` directly, or indirectly.

### Alternative

If you need to diff without direct `.splice` calls, check [domdiff](https://github.com/WebReflection/domdiff) out.

### Configuration

The class constructor accepts an object with these properties:

  * `target`, the target element, or its wrap, to mutate on splice calls. If omitted, the `before.parentNode` will be used instead.
  * `childNodes`, _optional_ `Array` of zero, one, or more nodes (already childNodes of the target). It is possible to use this Array as facade for a range of elements. If omitted, and `target` is specified, but not the `before` node, its `childNodes` will be used instead.
  * `item`, _optional_ `Function` invoked per each item that is being removed or inserted. If the given `childNodes` contains nodes wraps, you can return their real content once the `item(wrap)` is invoked. Used to understand `target` and/or `before` too.
  * `before`, _optional_ `Node` to use as anchor for the range of `childNodes` to modify. If specified, and `target` is not, its `parentNode` will be used per each splice. This is handy when a node to use as anchor is created inside a fragment but moved, or appended, later on.

### Examples

Basic DOM manipulation.
```js
const mutator = new DOMSplicer({
  target: document.body
});

// unshift a, b
mutator.splice(
  0, 0,
  document.createTextNode('a'),
  document.createTextNode('b')
);

// push c, d
mutator.splice(
  mutator.childNodes.length, 0,
  document.createTextNode('d'),
  document.createTextNode('e')
);

// insert at index
mutator.splice(
  2, 0,
  document.createTextNode('c')
);
```

Using a range of node wraps.
```js
// demo purpose, two nodes on the body, a placeholder in between
document.body.innerHTML = '<b>1</b><!--ph--><b>5</b>';

// a generic node wrap
class Wrap {
  constructor(value) {
    this._node = document.createElement('b');
    this._node.textContent = value;
  }
  unwrap() {
    return this._node;
  }
}

// a splicer used as inner range
const range = new DOMSplicer({
  target: document.body,
  childNodes: [],
  item: wrap => wrap.unwrap(),
  before: document.body.childNodes[1]
});

// unshift/push 2 nodes
range.splice(
  0, 0,
  new Wrap(2), new Wrap(4)
);

// insert a node in beteen
range.splice(
  1, 0,
  new Wrap(3)
);

// verify the content
document.body.innerHTML;
// <b>1</b><b>2</b><b>3</b><b>4</b><!--ph--><b>5</b>

// revert all nodes
range.splice(
  0, range.childNodes.length,
  range.childNodes[2],
  range.childNodes[1],
  range.childNodes[0]
);

// verify the content
document.body.innerHTML;
// <b>1</b><b>4</b><b>3</b><b>2</b><!--ph--><b>5</b>

// drop all nodes
range.splice(0);

// verify the content
document.body.innerHTML;
// <b>1</b><!--ph--><b>5</b>
```
