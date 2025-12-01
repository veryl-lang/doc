/*!
  Highlight.js v11.11.1 (git: 08cb242e7d)
  (c) 2006-2025 Josh Goebel <hello@joshgoebel.com> and other contributors
  License: BSD-3-Clause
 */
var hljs=function(){"use strict";function e(n){
return n instanceof Map?n.clear=n.delete=n.set=()=>{
throw Error("map is read-only")}:n instanceof Set&&(n.add=n.clear=n.delete=()=>{
throw Error("set is read-only")
}),Object.freeze(n),Object.getOwnPropertyNames(n).forEach((t=>{
const i=n[t],s=typeof i;"object"!==s&&"function"!==s||Object.isFrozen(i)||e(i)
})),n}class n{constructor(e){
void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}
ignoreMatch(){this.isMatchIgnored=!0}}function t(e){
return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")
}function i(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n]
;return n.forEach((e=>{for(const n in e)t[n]=e[n]})),t}const s=e=>!!e.scope
;class a{constructor(e,n){
this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){
this.buffer+=t(e)}openNode(e){if(!s(e))return;const n=((e,{prefix:n})=>{
if(e.startsWith("language:"))return e.replace("language:","language-")
;if(e.includes(".")){const t=e.split(".")
;return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")
}return`${n}${e}`})(e.scope,{prefix:this.classPrefix});this.span(n)}
closeNode(e){s(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){
this.buffer+=`<span class="${e}">`}}const r=(e={})=>{const n={children:[]}
;return Object.assign(n,e),n};class o{constructor(){
this.rootNode=r(),this.stack=[this.rootNode]}get top(){
return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){
this.top.children.push(e)}openNode(e){const n=r({scope:e})
;this.add(n),this.stack.push(n)}closeNode(){
if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){
for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}
walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){
return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),
n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){
"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{
o._collapse(e)})))}}class c extends o{constructor(e){super(),this.options=e}
addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){
this.closeNode()}__addSublanguage(e,n){const t=e.root
;n&&(t.scope="language:"+n),this.add(t)}toHTML(){
return new a(this,this.options).value()}finalize(){
return this.closeAllNodes(),!0}}function l(e){
return e?"string"==typeof e?e:e.source:null}function d(e){return h("(?=",e,")")}
function g(e){return h("(?:",e,")*")}function u(e){return h("(?:",e,")?")}
function h(...e){return e.map((e=>l(e))).join("")}function b(...e){const n=(e=>{
const n=e[e.length-1]
;return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}
})(e);return"("+(n.capture?"":"?:")+e.map((e=>l(e))).join("|")+")"}
function p(e){return RegExp(e.toString()+"|").exec("").length-1}
const f=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
;function m(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t
;let i=l(e),s="";for(;i.length>0;){const e=f.exec(i);if(!e){s+=i;break}
s+=i.substring(0,e.index),
i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?s+="\\"+(Number(e[1])+n):(s+=e[0],
"("===e[0]&&t++)}return s})).map((e=>`(${e})`)).join(n)}
const _="[a-zA-Z]\\w*",$="[a-zA-Z_]\\w*",y="\\b\\d+(\\.\\d+)?",w="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",E="\\b(0b[01]+)",v={
begin:"\\\\[\\s\\S]",relevance:0},x={scope:"string",begin:"'",end:"'",
illegal:"\\n",contains:[v]},N={scope:"string",begin:'"',end:'"',illegal:"\\n",
contains:[v]},k=(e,n,t={})=>{const s=i({scope:"comment",begin:e,end:n,
contains:[]},t);s.contains.push({scope:"doctag",
begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0})
;const a=b("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/)
;return s.contains.push({begin:h(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),s
},O=k("//","$"),M=k("/\\*","\\*/"),S=k("#","$");var A=Object.freeze({
__proto__:null,APOS_STRING_MODE:x,BACKSLASH_ESCAPE:v,BINARY_NUMBER_MODE:{
scope:"number",begin:E,relevance:0},BINARY_NUMBER_RE:E,COMMENT:k,
C_BLOCK_COMMENT_MODE:M,C_LINE_COMMENT_MODE:O,C_NUMBER_MODE:{scope:"number",
begin:w,relevance:0},C_NUMBER_RE:w,END_SAME_AS_BEGIN:e=>Object.assign(e,{
"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{
n.data._beginMatch!==e[1]&&n.ignoreMatch()}}),HASH_COMMENT_MODE:S,IDENT_RE:_,
MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:{begin:"\\.\\s*"+$,relevance:0},
NUMBER_MODE:{scope:"number",begin:y,relevance:0},NUMBER_RE:y,
PHRASAL_WORDS_MODE:{
begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
},QUOTE_STRING_MODE:N,REGEXP_MODE:{scope:"regexp",begin:/\/(?=[^/\n]*\/)/,
end:/\/[gimuy]*/,contains:[v,{begin:/\[/,end:/\]/,relevance:0,contains:[v]}]},
RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
SHEBANG:(e={})=>{const n=/^#![ ]*\//
;return e.binary&&(e.begin=h(n,/.*\b/,e.binary,/\b.*/)),i({scope:"meta",begin:n,
end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},
TITLE_MODE:{scope:"title",begin:_,relevance:0},UNDERSCORE_IDENT_RE:$,
UNDERSCORE_TITLE_MODE:{scope:"title",begin:$,relevance:0}});function R(e,n){
"."===e.input[e.index-1]&&n.ignoreMatch()}function T(e,n){
void 0!==e.className&&(e.scope=e.className,delete e.className)}function B(e,n){
n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",
e.__beforeBegin=R,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,
void 0===e.relevance&&(e.relevance=0))}function I(e,n){
Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}function j(e,n){
if(e.match){
if(e.begin||e.end)throw Error("begin & end are not supported with match")
;e.begin=e.match,delete e.match}}function C(e,n){
void 0===e.relevance&&(e.relevance=1)}const L=(e,n)=>{if(!e.beforeMatch)return
;if(e.starts)throw Error("beforeMatch cannot be used with starts")
;const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]
})),e.keywords=t.keywords,e.begin=h(t.beforeMatch,d(t.begin)),e.starts={
relevance:0,contains:[Object.assign(t,{endsParent:!0})]
},e.relevance=0,delete t.beforeMatch
},D=["of","and","for","in","not","or","if","then","parent","list","value"]
;function H(e,n,t="keyword"){const i=Object.create(null)
;return"string"==typeof e?s(t,e.split(" ")):Array.isArray(e)?s(t,e):Object.keys(e).forEach((t=>{
Object.assign(i,H(e[t],n,t))})),i;function s(e,t){
n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((n=>{const t=n.split("|")
;i[t[0]]=[e,P(t[0],t[1])]}))}}function P(e,n){
return n?Number(n):(e=>D.includes(e.toLowerCase()))(e)?0:1}const z={},U=e=>{
console.error(e)},q=(e,...n)=>{console.log("WARN: "+e,...n)},W=(e,n)=>{
z[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),z[`${e}/${n}`]=!0)
},Z=Error();function K(e,n,{key:t}){let i=0;const s=e[t],a={},r={}
;for(let e=1;e<=n.length;e++)r[e+i]=s[e],a[e+i]=!0,i+=p(n[e-1])
;e[t]=r,e[t]._emit=a,e[t]._multi=!0}function F(e){(e=>{
e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,
delete e.scope)})(e),"string"==typeof e.beginScope&&(e.beginScope={
_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope
}),(e=>{if(Array.isArray(e.begin)){
if(e.skip||e.excludeBegin||e.returnBegin)throw U("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
Z
;if("object"!=typeof e.beginScope||null===e.beginScope)throw U("beginScope must be object"),
Z;K(e,e.begin,{key:"beginScope"}),e.begin=m(e.begin,{joinWith:""})}})(e),(e=>{
if(Array.isArray(e.end)){
if(e.skip||e.excludeEnd||e.returnEnd)throw U("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
Z
;if("object"!=typeof e.endScope||null===e.endScope)throw U("endScope must be object"),
Z;K(e,e.end,{key:"endScope"}),e.end=m(e.end,{joinWith:""})}})(e)}function G(e){
function n(n,t){
return RegExp(l(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))
}class t{constructor(){
this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}
addRule(e,n){
n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),
this.matchAt+=p(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null)
;const e=this.regexes.map((e=>e[1]));this.matcherRe=n(m(e,{joinWith:"|"
}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex
;const n=this.matcherRe.exec(e);if(!n)return null
;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t]
;return n.splice(0,t),Object.assign(n,i)}}class s{constructor(){
this.rules=[],this.multiRegexes=[],
this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){
if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t
;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),
n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){
return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){
this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){
const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex
;let t=n.exec(e)
;if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{
const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}
return t&&(this.regexIndex+=t.position+1,
this.regexIndex===this.count&&this.considerAll()),t}}
if(e.compilerExtensions||(e.compilerExtensions=[]),
e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
;return e.classNameAliases=i(e.classNameAliases||{}),function t(a,r){const o=a
;if(a.isCompiled)return o
;[T,j,F,L].forEach((e=>e(a,r))),e.compilerExtensions.forEach((e=>e(a,r))),
a.__beforeBegin=null,[B,I,C].forEach((e=>e(a,r))),a.isCompiled=!0;let c=null
;return"object"==typeof a.keywords&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),
c=a.keywords.$pattern,
delete a.keywords.$pattern),c=c||/\w+/,a.keywords&&(a.keywords=H(a.keywords,e.case_insensitive)),
o.keywordPatternRe=n(c,!0),
r&&(a.begin||(a.begin=/\B|\b/),o.beginRe=n(o.begin),a.end||a.endsWithParent||(a.end=/\B|\b/),
a.end&&(o.endRe=n(o.end)),
o.terminatorEnd=l(o.end)||"",a.endsWithParent&&r.terminatorEnd&&(o.terminatorEnd+=(a.end?"|":"")+r.terminatorEnd)),
a.illegal&&(o.illegalRe=n(a.illegal)),
a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map((e=>(e=>(e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((n=>i(e,{
variants:null},n)))),e.cachedVariants?e.cachedVariants:X(e)?i(e,{
starts:e.starts?i(e.starts):null
}):Object.isFrozen(e)?i(e):e))("self"===e?a:e)))),a.contains.forEach((e=>{t(e,o)
})),a.starts&&t(a.starts,r),o.matcher=(e=>{const n=new s
;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"
}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"
}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n})(o),o}(e)}function X(e){
return!!e&&(e.endsWithParent||X(e.starts))}class Q extends Error{
constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}
const V=t,Y=i,J=Symbol("nomatch"),ee=t=>{
const i=Object.create(null),s=Object.create(null),a=[];let r=!0
;const o="Could not find the language '{}', did you forget to load/include a language module?",l={
disableAutodetect:!0,name:"Plain text",contains:[]};let p={
ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",
cssSelector:"pre code",languages:null,__emitter:c};function f(e){
return p.noHighlightRe.test(e)}function m(e,n,t){let i="",s=""
;"object"==typeof n?(i=e,
t=n.ignoreIllegals,s=n.language):(W("10.7.0","highlight(lang, code, ...args) has been deprecated."),
W("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
s=e,i=n),void 0===t&&(t=!0);const a={code:i,language:s};k("before:highlight",a)
;const r=a.result?a.result:_(a.language,a.code,t)
;return r.code=a.code,k("after:highlight",r),r}function _(e,t,s,a){
const c=Object.create(null);function l(){if(!k.keywords)return void M.addText(S)
;let e=0;k.keywordPatternRe.lastIndex=0;let n=k.keywordPatternRe.exec(S),t=""
;for(;n;){t+=S.substring(e,n.index)
;const s=E.case_insensitive?n[0].toLowerCase():n[0],a=(i=s,k.keywords[i]);if(a){
const[e,i]=a
;if(M.addText(t),t="",c[s]=(c[s]||0)+1,c[s]<=7&&(A+=i),e.startsWith("_"))t+=n[0];else{
const t=E.classNameAliases[e]||e;g(n[0],t)}}else t+=n[0]
;e=k.keywordPatternRe.lastIndex,n=k.keywordPatternRe.exec(S)}var i
;t+=S.substring(e),M.addText(t)}function d(){null!=k.subLanguage?(()=>{
if(""===S)return;let e=null;if("string"==typeof k.subLanguage){
if(!i[k.subLanguage])return void M.addText(S)
;e=_(k.subLanguage,S,!0,O[k.subLanguage]),O[k.subLanguage]=e._top
}else e=$(S,k.subLanguage.length?k.subLanguage:null)
;k.relevance>0&&(A+=e.relevance),M.__addSublanguage(e._emitter,e.language)
})():l(),S=""}function g(e,n){
""!==e&&(M.startScope(n),M.addText(e),M.endScope())}function u(e,n){let t=1
;const i=n.length-1;for(;t<=i;){if(!e._emit[t]){t++;continue}
const i=E.classNameAliases[e[t]]||e[t],s=n[t];i?g(s,i):(S=s,l(),S=""),t++}}
function h(e,n){
return e.scope&&"string"==typeof e.scope&&M.openNode(E.classNameAliases[e.scope]||e.scope),
e.beginScope&&(e.beginScope._wrap?(g(S,E.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),
S=""):e.beginScope._multi&&(u(e.beginScope,n),S="")),k=Object.create(e,{parent:{
value:k}}),k}function b(e,t,i){let s=((e,n)=>{const t=e&&e.exec(n)
;return t&&0===t.index})(e.endRe,i);if(s){if(e["on:end"]){const i=new n(e)
;e["on:end"](t,i),i.isMatchIgnored&&(s=!1)}if(s){
for(;e.endsParent&&e.parent;)e=e.parent;return e}}
if(e.endsWithParent)return b(e.parent,t,i)}function f(e){
return 0===k.matcher.regexIndex?(S+=e[0],1):(B=!0,0)}function m(e){
const n=e[0],i=t.substring(e.index),s=b(k,e,i);if(!s)return J;const a=k
;k.endScope&&k.endScope._wrap?(d(),
g(n,k.endScope._wrap)):k.endScope&&k.endScope._multi?(d(),
u(k.endScope,e)):a.skip?S+=n:(a.returnEnd||a.excludeEnd||(S+=n),
d(),a.excludeEnd&&(S=n));do{
k.scope&&M.closeNode(),k.skip||k.subLanguage||(A+=k.relevance),k=k.parent
}while(k!==s.parent);return s.starts&&h(s.starts,e),a.returnEnd?0:n.length}
let y={};function w(i,a){const o=a&&a[0];if(S+=i,null==o)return d(),0
;if("begin"===y.type&&"end"===a.type&&y.index===a.index&&""===o){
if(S+=t.slice(a.index,a.index+1),!r){const n=Error(`0 width match regex (${e})`)
;throw n.languageName=e,n.badRule=y.rule,n}return 1}
if(y=a,"begin"===a.type)return(e=>{
const t=e[0],i=e.rule,s=new n(i),a=[i.__beforeBegin,i["on:begin"]]
;for(const n of a)if(n&&(n(e,s),s.isMatchIgnored))return f(t)
;return i.skip?S+=t:(i.excludeBegin&&(S+=t),
d(),i.returnBegin||i.excludeBegin||(S=t)),h(i,e),i.returnBegin?0:t.length})(a)
;if("illegal"===a.type&&!s){
const e=Error('Illegal lexeme "'+o+'" for mode "'+(k.scope||"<unnamed>")+'"')
;throw e.mode=k,e}if("end"===a.type){const e=m(a);if(e!==J)return e}
if("illegal"===a.type&&""===o)return S+="\n",1
;if(T>1e5&&T>3*a.index)throw Error("potential infinite loop, way more iterations than matches")
;return S+=o,o.length}const E=v(e)
;if(!E)throw U(o.replace("{}",e)),Error('Unknown language: "'+e+'"')
;const x=G(E);let N="",k=a||x;const O={},M=new p.__emitter(p);(()=>{const e=[]
;for(let n=k;n!==E;n=n.parent)n.scope&&e.unshift(n.scope)
;e.forEach((e=>M.openNode(e)))})();let S="",A=0,R=0,T=0,B=!1;try{
if(E.__emitTokens)E.__emitTokens(t,M);else{for(k.matcher.considerAll();;){
T++,B?B=!1:k.matcher.considerAll(),k.matcher.lastIndex=R
;const e=k.matcher.exec(t);if(!e)break;const n=w(t.substring(R,e.index),e)
;R=e.index+n}w(t.substring(R))}return M.finalize(),N=M.toHTML(),{language:e,
value:N,relevance:A,illegal:!1,_emitter:M,_top:k}}catch(n){
if(n.message&&n.message.includes("Illegal"))return{language:e,value:V(t),
illegal:!0,relevance:0,_illegalBy:{message:n.message,index:R,
context:t.slice(R-100,R+100),mode:n.mode,resultSoFar:N},_emitter:M};if(r)return{
language:e,value:V(t),illegal:!1,relevance:0,errorRaised:n,_emitter:M,_top:k}
;throw n}}function $(e,n){n=n||p.languages||Object.keys(i);const t=(e=>{
const n={value:V(e),illegal:!1,relevance:0,_top:l,_emitter:new p.__emitter(p)}
;return n._emitter.addText(e),n})(e),s=n.filter(v).filter(N).map((n=>_(n,e,!1)))
;s.unshift(t);const a=s.sort(((e,n)=>{
if(e.relevance!==n.relevance)return n.relevance-e.relevance
;if(e.language&&n.language){if(v(e.language).supersetOf===n.language)return 1
;if(v(n.language).supersetOf===e.language)return-1}return 0})),[r,o]=a,c=r
;return c.secondBest=o,c}function y(e){let n=null;const t=(e=>{
let n=e.className+" ";n+=e.parentNode?e.parentNode.className:""
;const t=p.languageDetectRe.exec(n);if(t){const n=v(t[1])
;return n||(q(o.replace("{}",t[1])),
q("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}
return n.split(/\s+/).find((e=>f(e)||v(e)))})(e);if(f(t))return
;if(k("before:highlightElement",{el:e,language:t
}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e)
;if(e.children.length>0&&(p.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),
console.warn("The element with unescaped HTML:"),
console.warn(e)),p.throwUnescapedHTML))throw new Q("One of your code blocks includes unescaped HTML.",e.innerHTML)
;n=e;const i=n.textContent,a=t?m(i,{language:t,ignoreIllegals:!0}):$(i)
;e.innerHTML=a.value,e.dataset.highlighted="yes",((e,n,t)=>{const i=n&&s[n]||t
;e.classList.add("hljs"),e.classList.add("language-"+i)
})(e,t,a.language),e.result={language:a.language,re:a.relevance,
relevance:a.relevance},a.secondBest&&(e.secondBest={
language:a.secondBest.language,relevance:a.secondBest.relevance
}),k("after:highlightElement",{el:e,result:a,text:i})}let w=!1;function E(){
if("loading"===document.readyState)return w||window.addEventListener("DOMContentLoaded",(()=>{
E()}),!1),void(w=!0);document.querySelectorAll(p.cssSelector).forEach(y)}
function v(e){return e=(e||"").toLowerCase(),i[e]||i[s[e]]}
function x(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{
s[e.toLowerCase()]=n}))}function N(e){const n=v(e)
;return n&&!n.disableAutodetect}function k(e,n){const t=e;a.forEach((e=>{
e[t]&&e[t](n)}))}Object.assign(t,{highlight:m,highlightAuto:$,highlightAll:E,
highlightElement:y,
highlightBlock:e=>(W("10.7.0","highlightBlock will be removed entirely in v12.0"),
W("10.7.0","Please use highlightElement now."),y(e)),configure:e=>{p=Y(p,e)},
initHighlighting:()=>{
E(),W("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},
initHighlightingOnLoad:()=>{
E(),W("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
},registerLanguage:(e,n)=>{let s=null;try{s=n(t)}catch(n){
if(U("Language definition for '{}' could not be registered.".replace("{}",e)),
!r)throw n;U(n),s=l}
s.name||(s.name=e),i[e]=s,s.rawDefinition=n.bind(null,t),s.aliases&&x(s.aliases,{
languageName:e})},unregisterLanguage:e=>{delete i[e]
;for(const n of Object.keys(s))s[n]===e&&delete s[n]},
listLanguages:()=>Object.keys(i),getLanguage:v,registerAliases:x,
autoDetection:N,inherit:Y,addPlugin:e=>{(e=>{
e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{
e["before:highlightBlock"](Object.assign({block:n.el},n))
}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{
e["after:highlightBlock"](Object.assign({block:n.el},n))})})(e),a.push(e)},
removePlugin:e=>{const n=a.indexOf(e);-1!==n&&a.splice(n,1)}}),t.debugMode=()=>{
r=!1},t.safeMode=()=>{r=!0},t.versionString="11.11.1",t.regex={concat:h,
lookahead:d,either:b,optional:u,anyNumberOfTimes:g}
;for(const n in A)"object"==typeof A[n]&&e(A[n]);return Object.assign(t,A),t
},ne=ee({});function te(e){
return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e
}var ie,se;ne.newInstance=()=>ee({});var ae=(se||(se=1,ie=e=>({name:"Veryl",
aliases:["veryl"],case_insensitive:!1,keywords:{
keyword:"case default else if_reset if inside outside switch converse inout input output same false lsb msb true for in repeat rev step alias always_comb always_ff assign as bind connect const final import initial inst let param return break type var embed enum function include interface modport module package proto pub struct union unsafe bit bool clock clock_posedge clock_negedge f32 f64 i8 i16 i32 i64 logic reset reset_async_high reset_async_low reset_sync_high reset_sync_low signed string tri u8 u16 u32 u64",
literal:""},
contains:[e.QUOTE_STRING_MODE,e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE,{
scope:"number",contains:[e.BACKSLASH_ESCAPE],variants:[{
begin:/\b((\d+'([bhodBHOD]))[0-9xzXZa-fA-F_]+)/},{
begin:/\B(('([bhodBHOD]))[0-9xzXZa-fA-F_]+)/},{begin:/\b[0-9][0-9_]*/,
relevance:0}]}]})),ie),re=Object.freeze({__proto__:null,grmr_ini:e=>{
const n=e.regex,t={className:"number",relevance:0,variants:[{
begin:/([+-]+)?[\d]+_[\d_]+/},{begin:e.NUMBER_RE}]},i=e.COMMENT();i.variants=[{
begin:/;/,end:/$/},{begin:/#/,end:/$/}];const s={className:"variable",
variants:[{begin:/\$[\w\d"][\w\d_]*/},{begin:/\$\{(.*?)\}/}]},a={
className:"literal",begin:/\bon|off|true|false|yes|no\b/},r={className:"string",
contains:[e.BACKSLASH_ESCAPE],variants:[{begin:"'''",end:"'''",relevance:10},{
begin:'"""',end:'"""',relevance:10},{begin:'"',end:'"'},{begin:"'",end:"'"}]
},o={begin:/\[/,end:/\]/,contains:[i,a,s,r,t,"self"],relevance:0
},c=n.either(/[A-Za-z0-9_-]+/,/"(\\"|[^"])*"/,/'[^']*'/);return{
name:"TOML, also INI",aliases:["toml"],case_insensitive:!0,illegal:/\S/,
contains:[i,{className:"section",begin:/\[+/,end:/\]+/},{
begin:n.concat(c,"(\\s*\\.\\s*",c,")*",n.lookahead(/\s*=\s*[^#\s]/)),
className:"attr",starts:{end:/$/,contains:[i,o,a,s,r,t]}}]}},grmr_ruby:e=>{
const n=e.regex,t="([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)",i=n.either(/\b([A-Z]+[a-z0-9]+)+/,/\b([A-Z]+[a-z0-9]+)+[A-Z]+/),s=n.concat(i,/(::\w+)*/),a={
"variable.constant":["__FILE__","__LINE__","__ENCODING__"],
"variable.language":["self","super"],
keyword:["alias","and","begin","BEGIN","break","case","class","defined","do","else","elsif","end","END","ensure","for","if","in","module","next","not","or","redo","require","rescue","retry","return","then","undef","unless","until","when","while","yield","include","extend","prepend","public","private","protected","raise","throw"],
built_in:["proc","lambda","attr_accessor","attr_reader","attr_writer","define_method","private_constant","module_function"],
literal:["true","false","nil"]},r={className:"doctag",begin:"@[A-Za-z]+"},o={
begin:"#<",end:">"},c=[e.COMMENT("#","$",{contains:[r]
}),e.COMMENT("^=begin","^=end",{contains:[r],relevance:10
}),e.COMMENT("^__END__",e.MATCH_NOTHING_RE)],l={className:"subst",begin:/#\{/,
end:/\}/,keywords:a},d={className:"string",contains:[e.BACKSLASH_ESCAPE,l],
variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/`/,end:/`/},{
begin:/%[qQwWx]?\(/,end:/\)/},{begin:/%[qQwWx]?\[/,end:/\]/},{
begin:/%[qQwWx]?\{/,end:/\}/},{begin:/%[qQwWx]?</,end:/>/},{begin:/%[qQwWx]?\//,
end:/\//},{begin:/%[qQwWx]?%/,end:/%/},{begin:/%[qQwWx]?-/,end:/-/},{
begin:/%[qQwWx]?\|/,end:/\|/},{begin:/\B\?(\\\d{1,3})/},{
begin:/\B\?(\\x[A-Fa-f0-9]{1,2})/},{begin:/\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/},{
begin:/\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/},{
begin:/\B\?\\(c|C-)[\x20-\x7e]/},{begin:/\B\?\\?\S/},{
begin:n.concat(/<<[-~]?'?/,n.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),
contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,
contains:[e.BACKSLASH_ESCAPE,l]})]}]},g="[0-9](_?[0-9])*",u={className:"number",
relevance:0,variants:[{
begin:`\\b([1-9](_?[0-9])*|0)(\\.(${g}))?([eE][+-]?(${g})|r)?i?\\b`},{
begin:"\\b0[dD][0-9](_?[0-9])*r?i?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*r?i?\\b"
},{begin:"\\b0[oO][0-7](_?[0-7])*r?i?\\b"},{
begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"},{
begin:"\\b0(_?[0-7])+r?i?\\b"}]},h={variants:[{match:/\(\)/},{
className:"params",begin:/\(/,end:/(?=\))/,excludeBegin:!0,endsParent:!0,
keywords:a}]},b=[d,{variants:[{match:[/class\s+/,s,/\s+<\s+/,s]},{
match:[/\b(class|module)\s+/,s]}],scope:{2:"title.class",
4:"title.class.inherited"},keywords:a},{match:[/(include|extend)\s+/,s],scope:{
2:"title.class"},keywords:a},{relevance:0,match:[s,/\.new[. (]/],scope:{
1:"title.class"}},{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,
className:"variable.constant"},{relevance:0,match:i,scope:"title.class"},{
match:[/def/,/\s+/,t],scope:{1:"keyword",3:"title.function"},contains:[h]},{
begin:e.IDENT_RE+"::"},{className:"symbol",
begin:e.UNDERSCORE_IDENT_RE+"(!|\\?)?:",relevance:0},{className:"symbol",
begin:":(?!\\s)",contains:[d,{begin:t}],relevance:0},u,{className:"variable",
begin:"(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"},{
className:"params",begin:/\|(?!=)/,end:/\|/,excludeBegin:!0,excludeEnd:!0,
relevance:0,keywords:a},{begin:"("+e.RE_STARTERS_RE+"|unless)\\s*",
keywords:"unless",contains:[{className:"regexp",contains:[e.BACKSLASH_ESCAPE,l],
illegal:/\n/,variants:[{begin:"/",end:"/[a-z]*"},{begin:/%r\{/,end:/\}[a-z]*/},{
begin:"%r\\(",end:"\\)[a-z]*"},{begin:"%r!",end:"![a-z]*"},{begin:"%r\\[",
end:"\\][a-z]*"}]}].concat(o,c),relevance:0}].concat(o,c)
;l.contains=b,h.contains=b;const p=[{begin:/^\s*=>/,starts:{end:"$",contains:b}
},{className:"meta.prompt",
begin:"^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
starts:{end:"$",keywords:a,contains:b}}];return c.unshift(o),{name:"Ruby",
aliases:["rb","gemspec","podspec","thor","irb"],keywords:a,illegal:/\/\*/,
contains:[e.SHEBANG({binary:"ruby"})].concat(p).concat(c).concat(b)}},
grmr_verilog:e=>{
const n=e.regex,t=["begin_keywords","celldefine","default_nettype","default_decay_time","default_trireg_strength","define","delay_mode_distributed","delay_mode_path","delay_mode_unit","delay_mode_zero","else","elsif","end_keywords","endcelldefine","endif","ifdef","ifndef","include","line","nounconnected_drive","pragma","resetall","timescale","unconnected_drive","undef","undefineall"]
;return{name:"Verilog",aliases:["v","sv","svh"],case_insensitive:!1,keywords:{
$pattern:/\$?[\w]+(\$[\w]+)*/,
keyword:["accept_on","alias","always","always_comb","always_ff","always_latch","and","assert","assign","assume","automatic","before","begin","bind","bins","binsof","bit","break","buf|0","bufif0","bufif1","byte","case","casex","casez","cell","chandle","checker","class","clocking","cmos","config","const","constraint","context","continue","cover","covergroup","coverpoint","cross","deassign","default","defparam","design","disable","dist","do","edge","else","end","endcase","endchecker","endclass","endclocking","endconfig","endfunction","endgenerate","endgroup","endinterface","endmodule","endpackage","endprimitive","endprogram","endproperty","endspecify","endsequence","endtable","endtask","enum","event","eventually","expect","export","extends","extern","final","first_match","for","force","foreach","forever","fork","forkjoin","function","generate|5","genvar","global","highz0","highz1","if","iff","ifnone","ignore_bins","illegal_bins","implements","implies","import","incdir","include","initial","inout","input","inside","instance","int","integer","interconnect","interface","intersect","join","join_any","join_none","large","let","liblist","library","local","localparam","logic","longint","macromodule","matches","medium","modport","module","nand","negedge","nettype","new","nexttime","nmos","nor","noshowcancelled","not","notif0","notif1","or","output","package","packed","parameter","pmos","posedge","primitive","priority","program","property","protected","pull0","pull1","pulldown","pullup","pulsestyle_ondetect","pulsestyle_onevent","pure","rand","randc","randcase","randsequence","rcmos","real","realtime","ref","reg","reject_on","release","repeat","restrict","return","rnmos","rpmos","rtran","rtranif0","rtranif1","s_always","s_eventually","s_nexttime","s_until","s_until_with","scalared","sequence","shortint","shortreal","showcancelled","signed","small","soft","solve","specify","specparam","static","string","strong","strong0","strong1","struct","super","supply0","supply1","sync_accept_on","sync_reject_on","table","tagged","task","this","throughout","time","timeprecision","timeunit","tran","tranif0","tranif1","tri","tri0","tri1","triand","trior","trireg","type","typedef","union","unique","unique0","unsigned","until","until_with","untyped","use","uwire","var","vectored","virtual","void","wait","wait_order","wand","weak","weak0","weak1","while","wildcard","wire","with","within","wor","xnor","xor"],
literal:["null"],
built_in:["$finish","$stop","$exit","$fatal","$error","$warning","$info","$realtime","$time","$printtimescale","$bitstoreal","$bitstoshortreal","$itor","$signed","$cast","$bits","$stime","$timeformat","$realtobits","$shortrealtobits","$rtoi","$unsigned","$asserton","$assertkill","$assertpasson","$assertfailon","$assertnonvacuouson","$assertoff","$assertcontrol","$assertpassoff","$assertfailoff","$assertvacuousoff","$isunbounded","$sampled","$fell","$changed","$past_gclk","$fell_gclk","$changed_gclk","$rising_gclk","$steady_gclk","$coverage_control","$coverage_get","$coverage_save","$set_coverage_db_name","$rose","$stable","$past","$rose_gclk","$stable_gclk","$future_gclk","$falling_gclk","$changing_gclk","$display","$coverage_get_max","$coverage_merge","$get_coverage","$load_coverage_db","$typename","$unpacked_dimensions","$left","$low","$increment","$clog2","$ln","$log10","$exp","$sqrt","$pow","$floor","$ceil","$sin","$cos","$tan","$countbits","$onehot","$isunknown","$fatal","$warning","$dimensions","$right","$high","$size","$asin","$acos","$atan","$atan2","$hypot","$sinh","$cosh","$tanh","$asinh","$acosh","$atanh","$countones","$onehot0","$error","$info","$random","$dist_chi_square","$dist_erlang","$dist_exponential","$dist_normal","$dist_poisson","$dist_t","$dist_uniform","$q_initialize","$q_remove","$q_exam","$async$and$array","$async$nand$array","$async$or$array","$async$nor$array","$sync$and$array","$sync$nand$array","$sync$or$array","$sync$nor$array","$q_add","$q_full","$psprintf","$async$and$plane","$async$nand$plane","$async$or$plane","$async$nor$plane","$sync$and$plane","$sync$nand$plane","$sync$or$plane","$sync$nor$plane","$system","$display","$displayb","$displayh","$displayo","$strobe","$strobeb","$strobeh","$strobeo","$write","$readmemb","$readmemh","$writememh","$value$plusargs","$dumpvars","$dumpon","$dumplimit","$dumpports","$dumpportson","$dumpportslimit","$writeb","$writeh","$writeo","$monitor","$monitorb","$monitorh","$monitoro","$writememb","$dumpfile","$dumpoff","$dumpall","$dumpflush","$dumpportsoff","$dumpportsall","$dumpportsflush","$fclose","$fdisplay","$fdisplayb","$fdisplayh","$fdisplayo","$fstrobe","$fstrobeb","$fstrobeh","$fstrobeo","$swrite","$swriteb","$swriteh","$swriteo","$fscanf","$fread","$fseek","$fflush","$feof","$fopen","$fwrite","$fwriteb","$fwriteh","$fwriteo","$fmonitor","$fmonitorb","$fmonitorh","$fmonitoro","$sformat","$sformatf","$fgetc","$ungetc","$fgets","$sscanf","$rewind","$ftell","$ferror"]
},contains:[e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE,e.QUOTE_STRING_MODE,{
scope:"number",contains:[e.BACKSLASH_ESCAPE],variants:[{
begin:/\b((\d+'([bhodBHOD]))[0-9xzXZa-fA-F_]+)/},{
begin:/\B(('([bhodBHOD]))[0-9xzXZa-fA-F_]+)/},{begin:/\b[0-9][0-9_]*/,
relevance:0}]},{scope:"variable",variants:[{begin:"#\\((?!parameter).+\\)"},{
begin:"\\.\\w+",relevance:0}]},{scope:"variable.constant",
match:n.concat(/`/,n.either("__FILE__","__LINE__"))},{scope:"meta",
begin:n.concat(/`/,n.either(...t)),end:/$|\/\/|\/\*/,returnEnd:!0,keywords:t}]}
},grmr_veryl:te(ae),grmr_yaml:e=>{
const n="true false yes no null",t="[\\w#;/?:@&=+$,.~*'()[\\]]+",i={
className:"string",relevance:0,variants:[{begin:/"/,end:/"/},{begin:/\S+/}],
contains:[e.BACKSLASH_ESCAPE,{className:"template-variable",variants:[{
begin:/\{\{/,end:/\}\}/},{begin:/%\{/,end:/\}/}]}]},s=e.inherit(i,{variants:[{
begin:/'/,end:/'/,contains:[{begin:/''/,relevance:0}]},{begin:/"/,end:/"/},{
begin:/[^\s,{}[\]]+/}]}),a={end:",",endsWithParent:!0,excludeEnd:!0,keywords:n,
relevance:0},r={begin:/\{/,end:/\}/,contains:[a],illegal:"\\n",relevance:0},o={
begin:"\\[",end:"\\]",contains:[a],illegal:"\\n",relevance:0},c=[{
className:"attr",variants:[{begin:/[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/},{
begin:/"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/},{
begin:/'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/}]},{className:"meta",
begin:"^---\\s*$",relevance:10},{className:"string",
begin:"[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"},{
begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,
relevance:0},{className:"type",begin:"!\\w+!"+t},{className:"type",
begin:"!<"+t+">"},{className:"type",begin:"!"+t},{className:"type",begin:"!!"+t
},{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",
begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"-(?=[ ]|$)",
relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:n,keywords:{literal:n}},{
className:"number",
begin:"\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
},{className:"number",begin:e.C_NUMBER_RE+"\\b",relevance:0},r,o,{
className:"string",relevance:0,begin:/'/,end:/'/,contains:[{match:/''/,
scope:"char.escape",relevance:0}]},i],l=[...c]
;return l.pop(),l.push(s),a.contains=l,{name:"YAML",case_insensitive:!0,
aliases:["yml"],contains:c}}});const oe=ne;for(const e of Object.keys(re)){
const n=e.replace("grmr_","").replace("_","-");oe.registerLanguage(n,re[e])}
return oe}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs);