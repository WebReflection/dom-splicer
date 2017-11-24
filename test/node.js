const {Document} = require('basichtml');

global.document = new Document;
global.DOMSplicer = require('../cjs').default;

require('./test');