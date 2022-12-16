"use strict";var e=require("postcss-selector-parser"),r=require("@csstools/selector-specificity");function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=a(e);const s="csstools-invalid-layer",n="csstools-layer-with-selector-rules",o="6efdb677-bb05-44e5-840f-29d2175862fd",l="b147acf6-11a6-4338-a4d0-80aef4cd1a2f",i=["media","supports"],u=["keyframes"],p=new Set(["layer","supports","media","container","scope"]);function y(e){if("atrule"!==e.type)return!1;if("layer"!==e.name.toLowerCase())return!1;let r=e.parent;for(;r;){if("rule"===r.type)return!1;if("atrule"===r.type&&!p.has(r.name.toLowerCase()))return!1;r=r.parent}return!0}class m{constructor(){this.anonymousLayerCount=0,this.layerCount=0,this.anonymousLayerCount=0,this.layerCount=0,this.layerOrder=new Map,this.layerParamsParsed=new Map,this.layerNameParts=new Map}createAnonymousLayerName(){const e=`anonymous-${this.anonymousLayerCount}-${o}`;return this.addLayerNameParts(e),this.layerParamsParsed.set(e,[e]),this.anonymousLayerCount++,e}createImplicitLayerName(e){const r=this.layerNameParts.get(e),a=`implicit-${r[r.length-1]}-${l}`;return this.addLayerNameParts([...r,a]),this.layerParamsParsed.set(a,[a]),a}addLayerParams(e,r){r?"string"!=typeof r?this.layerParamsParsed.set(e,r):this.layerParamsParsed.set(e,[r]):this.layerParamsParsed.set(e,[e])}addLayerNameParts(e){"string"!=typeof e?this.layerNameParts.set(e.join("."),e):this.layerNameParts.set(e,[e])}getLayerParams(e){const r=[...this.layerParamsParsed.get(e.params)];let a=e.parent;for(;a;)"atrule"===a.type?(y(a)&&r.push(...this.layerParamsParsed.get(a.params)),a=a.parent):a=a.parent;return r.reverse(),r.flatMap((e=>this.layerNameParts.get(e)))}getLayerNameList(e){const r=this.layerNameParts.get(e),a=[];for(let e=0;e<r.length;e++){const t=r.slice(0,e+1).join(".");this.layerParamsParsed.has(t)||this.layerParamsParsed.set(t,[t]),this.layerNameParts.has(t)||this.layerNameParts.set(t,r.slice(0,e+1)),a.push(r.slice(0,e+1).join("."))}return a}sortLayerNames(){for(const[e,r]of this.layerOrder){const a=this.layerNameParts.get(e);for(let e=1;e<a.length;e++){const t=a.slice(0,e).join(".");this.layerOrder.has(t)||this.layerOrder.set(t,r)}}let e=Array.from(this.layerOrder.entries());e=e.sort(((e,r)=>{const a=this.layerNameParts.get(e[0]),t=this.layerNameParts.get(r[0]);if(a[0]!==t[0])return this.layerOrder.get(a[0])-this.layerOrder.get(t[0]);const s=Math.max(a.length,t.length);for(let e=0;e<s;e++){const r=a[e],s=t[e];if(r!==s)return r?s?this.layerOrder.get(a.slice(0,e).join("."))-this.layerOrder.get(t.slice(0,e).join(".")):-1:1}})),this.layerOrder.clear(),e.forEach(((e,r)=>{this.layerOrder.set(e[0],r)}))}}function c(e,r){const a=t.default().astSync(e),s=t.default().astSync(function(e){if(0===e)return"";let r="";for(let a=0;a<e;a++)r+=":not(#\\#)";return r}(r));let n=!1;for(let e=0;e<a.nodes[0].nodes.length;e++)if("combinator"===a.nodes[0].nodes[e].type||t.default.isPseudoElement(a.nodes[0].nodes[e])){a.nodes[0].insertBefore(a.nodes[0].nodes[e],s),n=!0;break}return n||a.nodes[0].insertAfter(a.nodes[0].nodes[a.nodes[0].nodes.length-1],s),a.toString()}function d(e,r){let a=!1;return e.walk((e=>{if(r(e))return a=!0,!1})),a}function f(e,r){let a=!1;return e.walkAtRules((e=>{if(r(e))return a=!0,!1})),a}function h(e){let r=e.parent;for(;r;)if("atrule"===r.type){if(y(r))return r;r=r.parent}else r=r.parent;return null}function w(e){var r;e.walk((e=>{var r;("rule"===e.type||"atrule"===e.type&&["layer",...i].includes(e.name.toLowerCase()))&&(0===(null==(r=e.nodes)?void 0:r.length)&&e.remove())})),0===(null==(r=e.nodes)?void 0:r.length)&&e.remove()}function g(e){let r=e;for(;r;){if(void 0===r.nodes)return;if(r.nodes.length>0)return;const e=r.parent;r.remove(),r=e}}function P(e,r,{result:a,options:t}){e.walkAtRules((e=>{if(!y(e))return;const s=r.getLayerParams(e),n=s.join(".");r.layerOrder.has(n)||(t.onConditionalRulesChangingLayerOrder&&function(e){let r=e.parent;for(;r;)if("atrule"===r.type){if(i.includes(r.name.toLowerCase()))return r;r=r.parent}else r=r.parent;return null}(e)&&!e.params.endsWith(l)&&!e.params.endsWith(o)&&e.warn(a,"handling different layer orders in conditional rules is unsupported by this plugin and will cause style differences between browser versions."),r.layerParamsParsed.has(n)||r.layerParamsParsed.set(n,[n]),r.layerNameParts.has(n)||r.layerNameParts.set(n,[...s]),r.getLayerNameList(n).forEach((e=>{r.layerOrder.has(e)||(r.layerOrder.set(e,r.layerCount),r.layerCount+=1)}))),e.nodes&&0!==e.nodes.length||e.remove()}))}const L=e=>{const a=Object.assign({onRevertLayerKeyword:"warn",onConditionalRulesChangingLayerOrder:"warn",onImportLayerRule:"warn"},e);return{postcssPlugin:"postcss-cascade-layers",OnceExit(e,{result:o}){a.onRevertLayerKeyword&&e.walkDecls((e=>{"revert-layer"===e.value.toLowerCase()&&e.warn(o,'handling "revert-layer" is unsupported by this plugin and will cause style differences between browser versions.')})),a.onImportLayerRule&&e.walkAtRules((e=>{"import"===e.name.toLowerCase()&&e.params.toLowerCase().includes("layer")&&e.warn(o,"To use @import with layers, the postcss-import plugin is also required. This plugin alone will not support using the @import at-rule.")})),function(e){e.walkDecls((e=>{if(!e.important)return;const r=e.parent;if(r.parent&&"atrule"===r.parent.type&&u.includes(r.parent.name.toLowerCase()))return;const a=r.clone();a.each((e=>{"decl"===e.type&&e.important||e.remove()})),r.each((e=>{"decl"===e.type&&e.important&&e.remove()})),r.before(a),w(r)}))}(e);const l=new m;if(function(e,r){e.walkAtRules((e=>{if(!y(e))return;if(e.params){const a=[];let n=!1;if(t.default().astSync(e.params).each((e=>{const t=[];e.walk((e=>{switch(e.type){case"class":case"tag":t.push(e.value);break;default:n=!0}})),n||(a.push(t.join(".")),r.addLayerNameParts(t))})),r.addLayerParams(e.params,a),e.nodes&&a.length>1&&(n=!0),n)return void(e.name=s);if(!e.nodes||0===e.nodes.length){if(a.length<=1)return;return a.slice(0,-1).forEach((a=>{r.addLayerParams(a,a),e.cloneBefore({params:a})})),r.addLayerParams(a[a.length-1],a[a.length-1]),void(e.params=a[a.length-1])}}e.params||(e.raws.afterName=" ",e.params=r.createAnonymousLayerName());const a=f(e,(e=>y(e))),n=d(e,(r=>{if("rule"===r.type)return h(r)===e}));if(a&&n){const a=r.createImplicitLayerName(e.params),t=e.clone({params:a});t.walkAtRules((e=>{y(e)&&e.remove()})),e.walk((r=>{"atrule"===r.type&&y(r)||"atrule"===r.type&&i.includes(r.name.toLowerCase())||h(r)===e&&r.remove()})),e.append(t),w(e),g(e)}}))}(e,l),P(e,l,{result:o,options:a}),!l.layerCount)return void e.walkAtRules(s,(e=>{e.name="layer"}));let p=0;for(e.walkRules((e=>{e.selectors.forEach((e=>{const a=r.selectorSpecificity(t.default().astSync(e));p=Math.max(p,a.a+1)}))})),e.walkRules((e=>{e.parent&&"atrule"===e.parent.type&&u.includes(e.parent.name.toLowerCase())||h(e)||e.some((e=>"decl"===e.type&&e.important))||(e.selectors=e.selectors.map((e=>c(e,l.layerCount*p))))})),l.sortLayerNames(),function(e,r){for(;f(e,(e=>e.nodes&&f(e,(e=>y(e)))));){let a=!1;if(e.walkAtRules((t=>{if(y(t)&&t.parent!==e){if("atrule"===t.parent.type&&y(t.parent)){const e=t.parent;return r.layerNameParts.set(`${e.params}.${t.params}`,[...r.layerNameParts.get(e.params),...r.layerNameParts.get(t.params)]),r.layerParamsParsed.set(`${e.params}.${t.params}`,[`${e.params}.${t.params}`]),t.params=`${e.params}.${t.params}`,e.before(t),w(e),void g(e)}if("atrule"===t.parent.type){const e=t.parent,r=e.clone(),a=t.clone();return r.removeAll(),a.removeAll(),r.append(t.nodes),a.append(r),e.before(a),t.remove(),w(e),void g(e)}a=!0}})),a)break}}(e,l),function(e,r){e.walkAtRules((e=>{if(!y(e))return;const r=e.clone(),a=e.clone();r.walkAtRules((e=>{if(u.includes(e.name.toLowerCase())){const r=e.parent;return e.remove(),w(r),void g(r)}if(d(e,(e=>"rule"===e.type)))return;const r=e.parent;e.remove(),w(r),g(r)})),a.walkRules((e=>{if(e.parent&&"atrule"===e.parent.type&&u.includes(e.parent.name.toLowerCase()))return;const r=e.parent;e.remove(),w(r),g(r)})),a.walkAtRules((e=>{if(i.includes(e.name.toLowerCase()))return w(e),void g(e)})),r.name=n,e.replaceWith(r,a),0===r.nodes.length&&r.remove(),0===a.nodes.length&&a.remove()})),e.nodes.sort(((e,a)=>{const t="atrule"===e.type&&"layer"===e.name.toLowerCase(),s="atrule"===a.type&&"layer"===a.name.toLowerCase();return t&&s?r.layerOrder.get(e.params)-r.layerOrder.get(a.params):t!==s?t?-1:1:0})),e.walkAtRules(n,(e=>{e.name="layer"}))}(e,l),e.walkRules((e=>{if(e.parent&&"atrule"===e.parent.type&&u.includes(e.parent.name.toLowerCase()))return;const r=h(e);if(!r)return;const a=l.getLayerParams(r).join(".");let t=l.layerOrder.get(a)*p;e.some((e=>"decl"===e.type&&e.important))&&(t=l.layerCount-t),e.selectors=e.selectors.map((e=>c(e,t)))}));f(e,(e=>y(e)));)e.walkAtRules((e=>{y(e)&&e.replaceWith(e.nodes)}));e.walkAtRules(s,(e=>{e.name="layer"}))}}};L.postcss=!0,module.exports=L;
