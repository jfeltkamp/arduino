var Dn=Array.isArray,Rn=Array.from,Sn=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,Kt=Object.getOwnPropertyDescriptors,On=Object.prototype,xn=Array.prototype,$t=Object.getPrototypeOf;function gn(t){return typeof t=="function"}const Cn=()=>{};function Nn(t){return t()}function vt(t){for(var n=0;n<t.length;n++)t[n]()}const A=2,pt=4,M=8,rt=16,y=32,Z=64,S=128,U=256,p=512,I=1024,H=2048,N=4096,Y=8192,Zt=16384,ht=32768,bn=65536,zt=1<<18,dt=1<<19,it=Symbol("$state"),qn=Symbol("");function Et(t){return t===this.v}function Wt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function yt(t){return!Wt(t,this.v)}function Xt(t){throw new Error("effect_in_teardown")}function Jt(){throw new Error("effect_in_unowned_derived")}function Qt(t){throw new Error("effect_orphan")}function tn(){throw new Error("effect_update_depth_exceeded")}function Fn(){throw new Error("hydration_failed")}function Pn(t){throw new Error("props_invalid_value")}function Ln(){throw new Error("state_descriptors_fixed")}function Mn(){throw new Error("state_prototype_fixed")}function nn(){throw new Error("state_unsafe_local_read")}function rn(){throw new Error("state_unsafe_mutation")}function et(t){return{f:0,v:t,reactions:null,equals:Et,version:0}}function Hn(t){return wt(et(t))}function en(t,n=!1){var e;const r=et(t);return n||(r.equals=yt),f!==null&&f.l!==null&&((e=f.l).s??(e.s=[])).push(r),r}function Yn(t,n=!1){return wt(en(t,n))}function wt(t){return o!==null&&o.f&A&&(E===null?yn([t]):E.push(t)),t}function jn(t,n){return o!==null&&lt()&&o.f&(A|rt)&&(E===null||!E.includes(t))&&rn(),sn(t,n)}function sn(t,n){return t.equals(n)||(t.v=n,t.version=Yt(),Tt(t,I),lt()&&u!==null&&u.f&p&&!(u.f&y)&&(_!==null&&_.includes(t)?(w(u,I),W(u)):k===null?wn([t]):k.push(t))),n}function Tt(t,n){var r=t.reactions;if(r!==null)for(var e=lt(),s=r.length,a=0;a<s;a++){var l=r[a],i=l.f;i&I||!e&&l===u||(w(l,n),i&(p|S)&&(i&A?Tt(l,H):W(l)))}}const Bn=1,Un=2,Vn=4,Gn=8,Kn=16,$n=1,Zn=2,zn=4,Wn=8,Xn=16,Jn=1,Qn=2,an="[",ln="[!",un="]",At={},tr=Symbol();function mt(t){console.warn("hydration_mismatch")}let R=!1;function nr(t){R=t}let d;function F(t){if(t===null)throw mt(),At;return d=t}function rr(){return F(O(d))}function er(t){if(R){if(O(d)!==null)throw mt(),At;d=t}}function sr(t=1){if(R){for(var n=t,r=d;n--;)r=O(r);d=r}}function ar(){for(var t=0,n=d;;){if(n.nodeType===8){var r=n.data;if(r===un){if(t===0)return n;t-=1}else(r===an||r===ln)&&(t+=1)}var e=O(n);n.remove(),n=e}}var ft,kt,It;function lr(){if(ft===void 0){ft=window;var t=Element.prototype,n=Node.prototype;kt=ot(n,"firstChild").get,It=ot(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function X(t=""){return document.createTextNode(t)}function J(t){return kt.call(t)}function O(t){return It.call(t)}function ur(t,n){if(!R)return J(t);var r=J(d);if(r===null)r=d.appendChild(X());else if(n&&r.nodeType!==3){var e=X();return r==null||r.before(e),F(e),e}return F(r),r}function or(t,n){if(!R){var r=J(t);return r instanceof Comment&&r.data===""?O(r):r}return d}function ir(t,n=1,r=!1){let e=R?d:t;for(;n--;)e=O(e);if(!R)return e;var s=e.nodeType;if(r&&s!==3){var a=X();return e==null||e.before(a),F(a),a}return F(e),e}function fr(t){t.textContent=""}function on(t){var n=A|I;u===null?n|=S:u.f|=dt;const r={children:null,ctx:f,deps:null,equals:Et,f:n,fn:t,reactions:null,v:null,version:0,parent:u};if(o!==null&&o.f&A){var e=o;(e.children??(e.children=[])).push(r)}return r}function _r(t){const n=on(t);return n.equals=yt,n}function Dt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&A?st(e):q(e)}}}function Rt(t){var n,r=u;$(t.parent);try{Dt(t),n=jt(t)}finally{$(r)}return n}function St(t){var n=Rt(t),r=(x||t.f&S)&&t.deps!==null?H:p;w(t,r),t.equals(n)||(t.v=n,t.version=Yt())}function st(t){Dt(t),L(t,0),w(t,Y),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Ot(t){u===null&&o===null&&Qt(),o!==null&&o.f&S&&Jt(),at&&Xt()}function fn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function b(t,n,r,e=!0){var s=(t&Z)!==0,a=u,l={ctx:f,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|I,first:null,fn:n,last:null,next:null,parent:s?null:a,prev:null,teardown:null,transitions:null,version:0};if(r){var i=g;try{_t(!0),z(l),l.f|=Zt}catch(c){throw q(l),c}finally{_t(i)}}else n!==null&&W(l);var T=r&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&dt)===0;if(!T&&!s&&e&&(a!==null&&fn(l,a),o!==null&&o.f&A)){var m=o;(m.children??(m.children=[])).push(l)}return l}function cr(t){const n=b(M,null,!1);return w(n,p),n.teardown=t,n}function vr(t){Ot();var n=u!==null&&(u.f&y)!==0&&f!==null&&!f.m;if(n){var r=f;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=xt(t);return e}}function pr(t){return Ot(),_n(t)}function hr(t){const n=b(Z,t,!0);return()=>{q(n)}}function xt(t){return b(pt,t,!1)}function _n(t){return b(M,t,!0)}function dr(t){return cn(t)}function cn(t,n=0){return b(M|rt|n,t,!0)}function Er(t,n=!0){return b(M|y,t,!0,n)}function gt(t){var n=t.teardown;if(n!==null){const r=at,e=o;ct(!0),K(null);try{n.call(null)}finally{ct(r),K(e)}}}function Ct(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)st(n[r])}}function Nt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;q(r,n),r=e}}function vn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&y||q(n),n=r}}function q(t,n=!0){var r=!1;if((n||t.f&zt)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var a=e===s?null:O(e);e.remove(),e=a}r=!0}Nt(t,n&&!r),Ct(t),L(t,0),w(t,Y);var l=t.transitions;if(l!==null)for(const T of l)T.stop();gt(t);var i=t.parent;i!==null&&i.first!==null&&bt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function bt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function yr(t,n){var r=[];qt(t,r,!0),pn(r,()=>{q(t),n&&n()})}function pn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function qt(t,n,r){if(!(t.f&N)){if(t.f^=N,t.transitions!==null)for(const l of t.transitions)(l.is_global||r)&&n.push(l);for(var e=t.first;e!==null;){var s=e.next,a=(e.f&ht)!==0||(e.f&y)!==0;qt(e,n,a?r:!1),e=s}}}function wr(t){Ft(t,!0)}function Ft(t,n){if(t.f&N){j(t)&&z(t),t.f^=N;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&ht)!==0||(r.f&y)!==0;Ft(r,s?n:!1),r=e}if(t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&a.in()}}const hn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let V=!1,G=!1,Q=[],tt=[];function Pt(){V=!1;const t=Q.slice();Q=[],vt(t)}function Lt(){G=!1;const t=tt.slice();tt=[],vt(t)}function Tr(t){V||(V=!0,queueMicrotask(Pt)),Q.push(t)}function Ar(t){G||(G=!0,hn(Lt)),tt.push(t)}function dn(){V&&Pt(),G&&Lt()}const Mt=0,En=1;let B=Mt,P=!1,g=!1,at=!1;function _t(t){g=t}function ct(t){at=t}let D=[],C=0;let o=null;function K(t){o=t}let u=null;function $(t){u=t}let E=null;function yn(t){E=t}let _=null,h=0,k=null;function wn(t){k=t}let Ht=0,x=!1,f=null;function Yt(){return++Ht}function lt(){return f!==null&&f.l===null}function j(t){var l,i;var n=t.f;if(n&I)return!0;if(n&H){var r=t.deps,e=(n&S)!==0;if(r!==null){var s;if(n&U){for(s=0;s<r.length;s++)((l=r[s]).reactions??(l.reactions=[])).push(t);t.f^=U}for(s=0;s<r.length;s++){var a=r[s];if(j(a)&&St(a),e&&u!==null&&!x&&!((i=a==null?void 0:a.reactions)!=null&&i.includes(t))&&(a.reactions??(a.reactions=[])).push(t),a.version>t.version)return!0}}e||w(t,p)}return!1}function Tn(t,n,r){throw t}function jt(t){var ut;var n=_,r=h,e=k,s=o,a=x,l=E,i=f,T=t.f;_=null,h=0,k=null,o=T&(y|Z)?null:t,x=!g&&(T&S)!==0,E=null,f=t.ctx;try{var m=(0,t.fn)(),c=t.deps;if(_!==null){var v;if(L(t,h),c!==null&&h>0)for(c.length=h+_.length,v=0;v<_.length;v++)c[h+v]=_[v];else t.deps=c=_;if(!x)for(v=h;v<c.length;v++)((ut=c[v]).reactions??(ut.reactions=[])).push(t)}else c!==null&&h<c.length&&(L(t,h),c.length=h);return m}finally{_=n,h=r,k=e,o=s,x=a,E=l,f=i}}function An(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&A&&(_===null||!_.includes(n))&&(w(n,H),n.f&(S|U)||(n.f^=U),L(n,0))}function L(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)An(t,r[e])}function z(t){var n=t.f;if(!(n&Y)){w(t,p);var r=u;u=t;try{n&rt?vn(t):Nt(t),Ct(t),gt(t);var e=jt(t);t.teardown=typeof e=="function"?e:null,t.version=Ht}catch(s){Tn(s)}finally{u=r}}}function Bt(){C>1e3&&(C=0,tn()),C++}function Ut(t){var n=t.length;if(n!==0){Bt();var r=g;g=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&p||(s.f^=p);var a=[];Vt(s,a),mn(a)}}finally{g=r}}}function mn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];!(e.f&(Y|N))&&j(e)&&(z(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?bt(e):e.fn=null))}}function kn(){if(P=!1,C>1001)return;const t=D;D=[],Ut(t),P||(C=0)}function W(t){B===Mt&&(P||(P=!0,queueMicrotask(kn)));for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(Z|y)){if(!(r&p))return;n.f^=p}}D.push(n)}function Vt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,a=(s&y)!==0,l=a&&(s&p)!==0;if(!l&&!(s&N))if(s&M){a?r.f^=p:j(r)&&z(r);var i=r.first;if(i!==null){r=i;continue}}else s&pt&&e.push(r);var T=r.next;if(T===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var m=v.next;if(m!==null){r=m;continue t}v=v.parent}}r=T}for(var c=0;c<e.length;c++)i=e[c],n.push(i),Vt(i,n)}function Gt(t){var n=B,r=D;try{Bt();const s=[];B=En,D=s,P=!1,Ut(r);var e=t==null?void 0:t();return dn(),(D.length>0||s.length>0)&&Gt(),C=0,e}finally{B=n,D=r}}async function mr(){await Promise.resolve(),Gt()}function kr(t){var i;var n=t.f,r=(n&A)!==0;if(r&&n&Y){var e=Rt(t);return st(t),e}if(o!==null){E!==null&&E.includes(t)&&nn();var s=o.deps;_===null&&s!==null&&s[h]===t?h++:_===null?_=[t]:_.push(t),k!==null&&u!==null&&u.f&p&&!(u.f&y)&&k.includes(t)&&(w(u,I),W(u))}else if(r&&t.deps===null){var a=t,l=a.parent;l!==null&&!((i=l.deriveds)!=null&&i.includes(a))&&(l.deriveds??(l.deriveds=[])).push(a)}return r&&(a=t,j(a)&&St(a)),t.v}function Ir(t){const n=o;try{return o=null,t()}finally{o=n}}const In=~(I|H|p);function w(t,n){t.f=t.f&In|n}function Dr(t,n=!1,r){f={p:f,c:null,e:null,m:!1,s:t,x:null,l:null},n||(f.l={s:null,u:null,r1:[],r2:et(!1)})}function Rr(t){const n=f;if(n!==null){const l=n.e;if(l!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<l.length;s++){var a=l[s];$(a.effect),K(a.reaction),xt(a.fn)}}finally{$(r),K(e)}}f=n.p,n.m=!0}return{}}function Sr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(it in t)nt(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&it in r&&nt(r)}}}function nt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{nt(t[e],n)}catch{}const r=$t(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Kt(r);for(let s in e){const a=e[s].get;if(a)try{a.call(t)}catch{}}}}}export{$,Qn as A,F as B,rr as C,On as D,ht as E,xn as F,et as G,Ln as H,jn as I,ot as J,Mn as K,$t as L,Dn as M,wr as N,yr as O,ln as P,ar as Q,nr as R,it as S,Jn as T,tr as U,Pn as V,bn as W,zn as X,yt as Y,y as Z,Z as _,vr as a,$n as a0,Zn as a1,Wn as a2,_r as a3,en as a4,gn as a5,Xn as a6,Sn as a7,K as a8,o as a9,Ar as aA,qn as aB,Kt as aC,lt as aD,Yn as aE,sr as aF,lr as aa,an as ab,O as ac,At as ad,un as ae,mt as af,Fn as ag,fr as ah,Rn as ai,hr as aj,cr as ak,xt as al,_n as am,Tr as an,Gt as ao,mr as ap,Hn as aq,N as ar,Bn as as,sn as at,Un as au,Kn as av,qt as aw,pn as ax,Vn as ay,Gn as az,Ir as b,f as c,Nn as d,Sr as e,on as f,kr as g,cn as h,Er as i,q as j,R as k,d as l,or as m,Cn as n,Rr as o,Dr as p,ur as q,vt as r,Wt as s,dr as t,pr as u,er as v,ir as w,X as x,J as y,u as z};
