"use strict";var DOMSplicer=function(e,t){function r(i){return e[i]||function(i){var n={},o={exports:n};return t[i].call(n,window,r,o,n),e[i]=o.exports}(i)}r.E=function(e){return Object.defineProperty(e,"__esModule",{value:!0})};var i=r(0);return i.__esModule?i["default"]:i}([],[function(e,t,r,i){function n(e){var t=e.target,r=e.childNodes||t.childNodes;this.target=t,this.childNodes=r,this.item=e.item||a,this.applySplice=r!==t.childNodes,this.before=e.before||null,this.placeHolder=t.ownerDocument.createComment("")}/*! (c) Andrea Giammarchi (ISC) */
var o=Math.min,l=Math.max,c=[].splice,a=function(e){return e};n.prototype.splice=function(e,t){var r=arguments.length;if(r<1)return[];var i=this.item,n=this.target,a=this.childNodes,s=this.placeHolder,u=a.length,h=e<0?l(u+e,0):o(e,u),d=r<2?u-h:o(l(t,0),u-h);n.insertBefore(s,h<u?i(a[h]):this.before);var f=a,p=1;this.applySplice&&(p=0,f=f.slice(),c.apply(a,arguments)),d&&function(e,t,r,i,n){for(;i<n--;)e.removeChild(t(r[n]))}(n,i,f,p+h,p+h+d),r>2&&n.insertBefore(r>3?function(e,t,r,i,n){for(var o=e.ownerDocument.createDocumentFragment();i<n;)o.appendChild(t(r[i++]));return o}(n,i,arguments,2,r):i(arguments[2]),s),n.removeChild(s)},t.E(i)["default"]=n}]);