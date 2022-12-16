import e from"postcss-selector-parser";import{selectorSpecificity as r}from"@csstools/selector-specificity";const a="csstools-invalid-layer",t="csstools-layer-with-selector-rules",s="6efdb677-bb05-44e5-840f-29d2175862fd",n="b147acf6-11a6-4338-a4d0-80aef4cd1a2f",o=["media","supports"],l=["keyframes"],i=new Set(["layer","supports","media","container","scope"]);function u(e){if("atrule"!==e.type)return!1;if("layer"!==e.name.toLowerCase())return!1;let r=e.parent;for(;r;){if("rule"===r.type)return!1;if("atrule"===r.type&&!i.has(r.name.toLowerCase()))return!1;r=r.parent}return!0}class m{constructor(){this.anonymousLayerCount=0,this.layerCount=0,this.anonymousLayerCount=0,this.layerCount=0,this.layerOrder=new Map,this.layerParamsParsed=new Map,this.layerNameParts=new Map}createAnonymousLayerName(){const e=`anonymous-${this.anonymousLayerCount}-${s}`;return this.addLayerNameParts(e),this.layerParamsParsed.set(e,[e]),this.anonymousLayerCount++,e}createImplicitLayerName(e){const r=this.layerNameParts.get(e),a=`implicit-${r[r.length-1]}-${n}`;return this.addLayerNameParts([...r,a]),this.layerParamsParsed.set(a,[a]),a}addLayerParams(e,r){r?"string"!=typeof r?this.layerParamsParsed.set(e,r):this.layerParamsParsed.set(e,[r]):this.layerParamsParsed.set(e,[e])}addLayerNameParts(e){"string"!=typeof e?this.layerNameParts.set(e.join("."),e):this.layerNameParts.set(e,[e])}getLayerParams(e){const r=[...this.layerParamsParsed.get(e.params)];let a=e.parent;for(;a;)"atrule"===a.type?(u(a)&&r.push(...this.layerParamsParsed.get(a.params)),a=a.parent):a=a.parent;return r.reverse(),r.flatMap((e=>this.layerNameParts.get(e)))}getLayerNameList(e){const r=this.layerNameParts.get(e),a=[];for(let e=0;e<r.length;e++){const t=r.slice(0,e+1).join(".");this.layerParamsParsed.has(t)||this.layerParamsParsed.set(t,[t]),this.layerNameParts.has(t)||this.layerNameParts.set(t,r.slice(0,e+1)),a.push(r.slice(0,e+1).join("."))}return a}sortLayerNames(){for(const[e,r]of this.layerOrder){const a=this.layerNameParts.get(e);for(let e=1;e<a.length;e++){const t=a.slice(0,e).join(".");this.layerOrder.has(t)||this.layerOrder.set(t,r)}}let e=Array.from(this.layerOrder.entries());e=e.sort(((e,r)=>{const a=this.layerNameParts.get(e[0]),t=this.layerNameParts.get(r[0]);if(a[0]!==t[0])return this.layerOrder.get(a[0])-this.layerOrder.get(t[0]);const s=Math.max(a.length,t.length);for(let e=0;e<s;e++){const r=a[e],s=t[e];if(r!==s)return r?s?this.layerOrder.get(a.slice(0,e).join("."))-this.layerOrder.get(t.slice(0,e).join(".")):-1:1}})),this.layerOrder.clear(),e.forEach(((e,r)=>{this.layerOrder.set(e[0],r)}))}}function p(r,a){const t=e().astSync(r),s=e().astSync(function(e){if(0===e)return"";let r="";for(let a=0;a<e;a++)r+=":not(#\\#)";return r}(a));let n=!1;for(let r=0;r<t.nodes[0].nodes.length;r++)if("combinator"===t.nodes[0].nodes[r].type||e.isPseudoElement(t.nodes[0].nodes[r])){t.nodes[0].insertBefore(t.nodes[0].nodes[r],s),n=!0;break}return n||t.nodes[0].insertAfter(t.nodes[0].nodes[t.nodes[0].nodes.length-1],s),t.toString()}function y(e,r){let a=!1;return e.walk((e=>{if(r(e))return a=!0,!1})),a}function c(e,r){let a=!1;return e.walkAtRules((e=>{if(r(e))return a=!0,!1})),a}function d(e){let r=e.parent;for(;r;)if("atrule"===r.type){if(u(r))return r;r=r.parent}else r=r.parent;return null}function f(e){var r;e.walk((e=>{var r;("rule"===e.type||"atrule"===e.type&&["layer",...o].includes(e.name.toLowerCase()))&&(0===(null==(r=e.nodes)?void 0:r.length)&&e.remove())})),0===(null==(r=e.nodes)?void 0:r.length)&&e.remove()}function h(e){let r=e;for(;r;){if(void 0===r.nodes)return;if(r.nodes.length>0)return;const e=r.parent;r.remove(),r=e}}function w(e,r,{result:a,options:t}){e.walkAtRules((e=>{if(!u(e))return;const l=r.getLayerParams(e),i=l.join(".");r.layerOrder.has(i)||(t.onConditionalRulesChangingLayerOrder&&function(e){let r=e.parent;for(;r;)if("atrule"===r.type){if(o.includes(r.name.toLowerCase()))return r;r=r.parent}else r=r.parent;return null}(e)&&!e.params.endsWith(n)&&!e.params.endsWith(s)&&e.warn(a,"handling different layer orders in conditional rules is unsupported by this plugin and will cause style differences between browser versions."),r.layerParamsParsed.has(i)||r.layerParamsParsed.set(i,[i]),r.layerNameParts.has(i)||r.layerNameParts.set(i,[...l]),r.getLayerNameList(i).forEach((e=>{r.layerOrder.has(e)||(r.layerOrder.set(e,r.layerCount),r.layerCount+=1)}))),e.nodes&&0!==e.nodes.length||e.remove()}))}const g=s=>{const n=Object.assign({onRevertLayerKeyword:"warn",onConditionalRulesChangingLayerOrder:"warn",onImportLayerRule:"warn"},s);return{postcssPlugin:"postcss-cascade-layers",OnceExit(s,{result:i}){n.onRevertLayerKeyword&&s.walkDecls((e=>{"revert-layer"===e.value.toLowerCase()&&e.warn(i,'handling "revert-layer" is unsupported by this plugin and will cause style differences between browser versions.')})),n.onImportLayerRule&&s.walkAtRules((e=>{"import"===e.name.toLowerCase()&&e.params.toLowerCase().includes("layer")&&e.warn(i,"To use @import with layers, the postcss-import plugin is also required. This plugin alone will not support using the @import at-rule.")})),function(e){e.walkDecls((e=>{if(!e.important)return;const r=e.parent;if(r.parent&&"atrule"===r.parent.type&&l.includes(r.parent.name.toLowerCase()))return;const a=r.clone();a.each((e=>{"decl"===e.type&&e.important||e.remove()})),r.each((e=>{"decl"===e.type&&e.important&&e.remove()})),r.before(a),f(r)}))}(s);const g=new m;if(function(r,t){r.walkAtRules((r=>{if(!u(r))return;if(r.params){const s=[];let n=!1;if(e().astSync(r.params).each((e=>{const r=[];e.walk((e=>{switch(e.type){case"class":case"tag":r.push(e.value);break;default:n=!0}})),n||(s.push(r.join(".")),t.addLayerNameParts(r))})),t.addLayerParams(r.params,s),r.nodes&&s.length>1&&(n=!0),n)return void(r.name=a);if(!r.nodes||0===r.nodes.length){if(s.length<=1)return;return s.slice(0,-1).forEach((e=>{t.addLayerParams(e,e),r.cloneBefore({params:e})})),t.addLayerParams(s[s.length-1],s[s.length-1]),void(r.params=s[s.length-1])}}r.params||(r.raws.afterName=" ",r.params=t.createAnonymousLayerName());const s=c(r,(e=>u(e))),n=y(r,(e=>{if("rule"===e.type)return d(e)===r}));if(s&&n){const e=t.createImplicitLayerName(r.params),a=r.clone({params:e});a.walkAtRules((e=>{u(e)&&e.remove()})),r.walk((e=>{"atrule"===e.type&&u(e)||"atrule"===e.type&&o.includes(e.name.toLowerCase())||d(e)===r&&e.remove()})),r.append(a),f(r),h(r)}}))}(s,g),w(s,g,{result:i,options:n}),!g.layerCount)return void s.walkAtRules(a,(e=>{e.name="layer"}));let P=0;for(s.walkRules((a=>{a.selectors.forEach((a=>{const t=r(e().astSync(a));P=Math.max(P,t.a+1)}))})),s.walkRules((e=>{e.parent&&"atrule"===e.parent.type&&l.includes(e.parent.name.toLowerCase())||d(e)||e.some((e=>"decl"===e.type&&e.important))||(e.selectors=e.selectors.map((e=>p(e,g.layerCount*P))))})),g.sortLayerNames(),function(e,r){for(;c(e,(e=>e.nodes&&c(e,(e=>u(e)))));){let a=!1;if(e.walkAtRules((t=>{if(u(t)&&t.parent!==e){if("atrule"===t.parent.type&&u(t.parent)){const e=t.parent;return r.layerNameParts.set(`${e.params}.${t.params}`,[...r.layerNameParts.get(e.params),...r.layerNameParts.get(t.params)]),r.layerParamsParsed.set(`${e.params}.${t.params}`,[`${e.params}.${t.params}`]),t.params=`${e.params}.${t.params}`,e.before(t),f(e),void h(e)}if("atrule"===t.parent.type){const e=t.parent,r=e.clone(),a=t.clone();return r.removeAll(),a.removeAll(),r.append(t.nodes),a.append(r),e.before(a),t.remove(),f(e),void h(e)}a=!0}})),a)break}}(s,g),function(e,r){e.walkAtRules((e=>{if(!u(e))return;const r=e.clone(),a=e.clone();r.walkAtRules((e=>{if(l.includes(e.name.toLowerCase())){const r=e.parent;return e.remove(),f(r),void h(r)}if(y(e,(e=>"rule"===e.type)))return;const r=e.parent;e.remove(),f(r),h(r)})),a.walkRules((e=>{if(e.parent&&"atrule"===e.parent.type&&l.includes(e.parent.name.toLowerCase()))return;const r=e.parent;e.remove(),f(r),h(r)})),a.walkAtRules((e=>{if(o.includes(e.name.toLowerCase()))return f(e),void h(e)})),r.name=t,e.replaceWith(r,a),0===r.nodes.length&&r.remove(),0===a.nodes.length&&a.remove()})),e.nodes.sort(((e,a)=>{const t="atrule"===e.type&&"layer"===e.name.toLowerCase(),s="atrule"===a.type&&"layer"===a.name.toLowerCase();return t&&s?r.layerOrder.get(e.params)-r.layerOrder.get(a.params):t!==s?t?-1:1:0})),e.walkAtRules(t,(e=>{e.name="layer"}))}(s,g),s.walkRules((e=>{if(e.parent&&"atrule"===e.parent.type&&l.includes(e.parent.name.toLowerCase()))return;const r=d(e);if(!r)return;const a=g.getLayerParams(r).join(".");let t=g.layerOrder.get(a)*P;e.some((e=>"decl"===e.type&&e.important))&&(t=g.layerCount-t),e.selectors=e.selectors.map((e=>p(e,t)))}));c(s,(e=>u(e)));)s.walkAtRules((e=>{u(e)&&e.replaceWith(e.nodes)}));s.walkAtRules(a,(e=>{e.name="layer"}))}}};g.postcss=!0;export{g as default};
