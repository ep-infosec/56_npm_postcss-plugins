"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=e(require("postcss-value-parser"));const s=e=>{const s=Object.assign({preserve:!1},e);return{postcssPlugin:"postcss-color-hex-alpha",Declaration(e){if(!/#([0-9A-Fa-f]{4}(?:[0-9A-Fa-f]{4})?)\b/.test(e.value))return;const{value:r}=e,n=t.default(r);n.walk((e=>{if("function"===e.type&&"url"===e.value)return!1;(function(e){return"word"===e.type&&/^#([0-9A-Fa-f]{4}(?:[0-9A-Fa-f]{4})?)$/.test(e.value)})(e)&&a(e)}));const l=n.toString();l!==r&&(e.cloneBefore({value:l}),s.preserve||e.remove())}}};s.postcss=!0;const r=1e5,a=e=>{const t=e.value,s=`0x${5===t.length?t.slice(1).replace(/[0-9A-Fa-f]/g,"$&$&"):t.slice(1)}`,[a,n,l,c]=[parseInt(s.slice(2,4),16),parseInt(s.slice(4,6),16),parseInt(s.slice(6,8),16),Math.round(parseInt(s.slice(8,10),16)/255*r)/r];e.value=`rgba(${a},${n},${l},${c})`};module.exports=s;
