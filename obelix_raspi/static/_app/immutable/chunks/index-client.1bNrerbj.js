import{S as F,D as z,F as G,G as w,H as V,I as g,U as y,J as I,g as m,z as C,K as J,L as Q,M as W,h as X,N as q,i as U,O as Y,k as B,C as ee,E as re,P as ne,Q as te,B as ae,R as j,l as ie,V as fe,W as se,X as ue,Y as le,b as D,Z as oe,_ as _e,$ as K,a0 as ce,a1 as de,a2 as ve,f as H,a3 as ye,a4 as he,a5 as T,a6 as be,c as A,a as ge}from"./runtime.CsVrN9MV.js";import{c as me}from"./store.cAIb9KtG.js";function R(r,t=null,s){if(typeof r!="object"||r===null||F in r)return r;const f=Q(r);if(f!==z&&f!==G)return r;var a=new Map,o=W(r),v=w(0);o&&a.set("length",w(r.length));var d;return new Proxy(r,{defineProperty(u,e,n){(!("value"in n)||n.configurable===!1||n.enumerable===!1||n.writable===!1)&&V();var i=a.get(e);return i===void 0?(i=w(n.value),a.set(e,i)):g(i,R(n.value,d)),!0},deleteProperty(u,e){var n=a.get(e);if(n===void 0)e in u&&a.set(e,w(y));else{if(o&&typeof e=="string"){var i=a.get("length"),l=Number(e);Number.isInteger(l)&&l<i.v&&g(i,l)}g(n,y),Z(v)}return!0},get(u,e,n){var h;if(e===F)return r;var i=a.get(e),l=e in u;if(i===void 0&&(!l||(h=I(u,e))!=null&&h.writable)&&(i=w(R(l?u[e]:y,d)),a.set(e,i)),i!==void 0){var _=m(i);return _===y?void 0:_}return Reflect.get(u,e,n)},getOwnPropertyDescriptor(u,e){var n=Reflect.getOwnPropertyDescriptor(u,e);if(n&&"value"in n){var i=a.get(e);i&&(n.value=m(i))}else if(n===void 0){var l=a.get(e),_=l==null?void 0:l.v;if(l!==void 0&&_!==y)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return n},has(u,e){var _;if(e===F)return!0;var n=a.get(e),i=n!==void 0&&n.v!==y||Reflect.has(u,e);if(n!==void 0||C!==null&&(!i||(_=I(u,e))!=null&&_.writable)){n===void 0&&(n=w(i?R(u[e],d):y),a.set(e,n));var l=m(n);if(l===y)return!1}return i},set(u,e,n,i){var S;var l=a.get(e),_=e in u;if(o&&e==="length")for(var h=n;h<l.v;h+=1){var b=a.get(h+"");b!==void 0?g(b,y):h in u&&(b=w(y),a.set(h+"",b))}l===void 0?(!_||(S=I(u,e))!=null&&S.writable)&&(l=w(void 0),g(l,R(n,d)),a.set(e,l)):(_=l.v!==y,g(l,R(n,d)));var P=Reflect.getOwnPropertyDescriptor(u,e);if(P!=null&&P.set&&P.set.call(i,n),!_){if(o&&typeof e=="string"){var N=a.get("length"),p=Number(e);Number.isInteger(p)&&p>=N.v&&g(N,p+1)}Z(v)}return!0},ownKeys(u){m(v);var e=Reflect.ownKeys(u).filter(l=>{var _=a.get(l);return _===void 0||_.v!==y});for(var[n,i]of a)i.v!==y&&!(n in u)&&e.push(n);return e},setPrototypeOf(){J()}})}function Z(r,t=1){g(r,r.v+t)}function k(r){throw new Error("lifecycle_outside_component")}function Ie(r,t,s,f=null,a=!1){B&&ee();var o=r,v=null,d=null,u=null,e=a?re:0;X(()=>{if(u===(u=!!t()))return;let n=!1;if(B){const i=o.data===ne;u===i&&(o=te(),ae(o),j(!1),n=!0)}u?(v?q(v):v=U(()=>s(o)),d&&Y(d,()=>{d=null})):(d?q(d):f&&(d=U(()=>f(o))),v&&Y(v,()=>{v=null})),n&&j(!0)},e),B&&(o=ie)}const we={get(r,t){let s=r.props.length;for(;s--;){let f=r.props[s];if(T(f)&&(f=f()),typeof f=="object"&&f!==null&&t in f)return f[t]}},set(r,t,s){let f=r.props.length;for(;f--;){let a=r.props[f];T(a)&&(a=a());const o=I(a,t);if(o&&o.set)return o.set(s),!0}return!1},getOwnPropertyDescriptor(r,t){let s=r.props.length;for(;s--;){let f=r.props[s];if(T(f)&&(f=f()),typeof f=="object"&&f!==null&&t in f){const a=I(f,t);return a&&!a.configurable&&(a.configurable=!0),a}}},has(r,t){for(let s of r.props)if(T(s)&&(s=s()),s!=null&&t in s)return!0;return!1},ownKeys(r){const t=[];for(let s of r.props){T(s)&&(s=s());for(const f in s)t.includes(f)||t.push(f)}return t}};function Se(...r){return new Proxy({props:r},we)}function $(r){for(var t=C,s=C;t!==null&&!(t.f&(oe|_e));)t=t.parent;try{return K(t),r()}finally{K(s)}}function Oe(r,t,s,f){var M;var a=(s&ce)!==0,o=(s&de)!==0,v=(s&ve)!==0,d=(s&be)!==0,u=!1,e;v?[e,u]=me(()=>r[t]):e=r[t];var n=(M=I(r,t))==null?void 0:M.set,i=f,l=!0,_=!1,h=()=>(_=!0,l&&(l=!1,d?i=D(f):i=f),i);e===void 0&&f!==void 0&&(n&&o&&fe(),e=h(),n&&n(e));var b;if(o)b=()=>{var c=r[t];return c===void 0?h():(l=!0,_=!1,c)};else{var P=$(()=>(a?H:ye)(()=>r[t]));P.f|=se,b=()=>{var c=m(P);return c!==void 0&&(i=void 0),c===void 0?i:c}}if(!(s&ue))return b;if(n){var N=r.$$legacy;return function(c,E){return arguments.length>0?((!o||!E||N||u)&&n(E?b():c),c):b()}}var p=!1,S=!1,x=he(e),O=$(()=>H(()=>{var c=b(),E=m(x);return p?(p=!1,S=!0,E):(S=!1,x.v=c)}));return a||(O.equals=le),function(c,E){if(arguments.length>0){const L=E?m(O):o&&v?R(c):c;return O.equals(L)||(p=!0,g(x,L),_&&i!==void 0&&(i=L),D(()=>m(O))),c}return m(O)}}function Pe(r){A===null&&k(),A.l!==null?pe(A).m.push(r):ge(()=>{const t=D(r);if(typeof t=="function")return t})}function Te(r){A===null&&k(),Pe(()=>()=>D(r))}function pe(r){var t=r.l;return t.u??(t.u={a:[],b:[],m:[]})}export{R as a,Te as b,Ie as i,Pe as o,Oe as p,Se as s};
