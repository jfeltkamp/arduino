const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.FXIwL0GV.js","../chunks/disclose-version.CVdQhuh4.js","../chunks/runtime.CdqqS4Bm.js","../nodes/1.CvgyCZfr.js","../chunks/store.D6nl9me4.js","../chunks/utils.DEODT1V9.js","../chunks/lifecycle.Tf9ZFBZr.js","../chunks/entry.BUh-U2B4.js","../nodes/2.DGEQw40w.js","../chunks/Tasks.CngnjHnT.js","../chunks/index-client.DBmkXexQ.js","../assets/Tasks.C8ajKlTm.css","../chunks/size.BnFFJ2ou.js","../chunks/this.DSTkaCEA.js","../chunks/props.DaeUU8jY.js","../assets/2.CtoQfhrB.css","../nodes/3.HIe-f0aR.js","../assets/3.CZVRLvsO.css","../nodes/4.CY-YxSyP.js","../assets/4.BBll7vxp.css"])))=>i.map(i=>d[i]);
var F=n=>{throw TypeError(n)};var U=(n,t,r)=>t.has(n)||F("Cannot "+r);var l=(n,t,r)=>(U(n,t,"read from private field"),r?r.call(n):t.get(n)),O=(n,t,r)=>t.has(n)?F("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,r),T=(n,t,r,a)=>(U(n,t,"write to private field"),a?a.call(n,r):t.set(n,r),r);import{F as q,U as K,A as W,E as M,C as Q,G as X,a0 as Y,a as v,b as x,az as Z,ao as $,m as tt,H as et,o as rt,t as st,aA as nt,I as k,J as at,aB as C,O as ot,M as it,K as ct,N as lt,i as S}from"../chunks/runtime.CdqqS4Bm.js";import{h as ut,m as ft,u as mt,a as dt}from"../chunks/store.D6nl9me4.js";import{c as I,a as P,t as z,d as ht}from"../chunks/disclose-version.CVdQhuh4.js";import{o as _t,p as vt,i as D}from"../chunks/index-client.DBmkXexQ.js";import{b as V}from"../chunks/this.DSTkaCEA.js";import{p}from"../chunks/props.DaeUU8jY.js";function B(n,t,r){q&&K();var a=n,o,c;W(()=>{o!==(o=t())&&(c&&(Y(c),c=null),o&&(c=Q(()=>r(a,o))))},M),q&&(a=X)}function gt(n){return class extends yt{constructor(t){super({component:n,...t})}}}var g,f;class yt{constructor(t){O(this,g);O(this,f);var c;var r=new Map,a=(s,e)=>{var m=tt(e);return r.set(s,m),m};const o=new Proxy({...t.props||{},$$events:{}},{get(s,e){return v(r.get(e)??a(e,Reflect.get(s,e)))},has(s,e){return v(r.get(e)??a(e,Reflect.get(s,e))),Reflect.has(s,e)},set(s,e,m){return x(r.get(e)??a(e,m),m),Reflect.set(s,e,m)}});T(this,f,(t.hydrate?ut:ft)(t.component,{target:t.target,anchor:t.anchor,props:o,context:t.context,intro:t.intro??!1,recover:t.recover})),(!((c=t==null?void 0:t.props)!=null&&c.$$host)||t.sync===!1)&&Z(),T(this,g,o.$$events);for(const s of Object.keys(l(this,f)))s==="$set"||s==="$destroy"||s==="$on"||$(this,s,{get(){return l(this,f)[s]},set(e){l(this,f)[s]=e},enumerable:!0});l(this,f).$set=s=>{Object.assign(o,s)},l(this,f).$destroy=()=>{mt(l(this,f))}}$set(t){l(this,f).$set(t)}$on(t,r){l(this,g)[t]=l(this,g)[t]||[];const a=(...o)=>r.call(this,...o);return l(this,g)[t].push(a),()=>{l(this,g)[t]=l(this,g)[t].filter(o=>o!==a)}}$destroy(){l(this,f).$destroy()}}g=new WeakMap,f=new WeakMap;const Et="modulepreload",bt=function(n,t){return new URL(n,t).href},N={},R=function(t,r,a){let o=Promise.resolve();if(r&&r.length>0){const s=document.getElementsByTagName("link"),e=document.querySelector("meta[property=csp-nonce]"),m=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));o=Promise.allSettled(r.map(u=>{if(u=bt(u,a),u in N)return;N[u]=!0;const y=u.endsWith(".css"),A=y?'[rel="stylesheet"]':"";if(!!a)for(let d=s.length-1;d>=0;d--){const _=s[d];if(_.href===u&&(!y||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${A}`))return;const i=document.createElement("link");if(i.rel=y?"stylesheet":Et,y||(i.as="script"),i.crossOrigin="",i.href=u,m&&i.setAttribute("nonce",m),document.head.appendChild(i),y)return new Promise((d,_)=>{i.addEventListener("load",d),i.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function c(s){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=s,window.dispatchEvent(e),!e.defaultPrevented)throw s}return o.then(s=>{for(const e of s||[])e.status==="rejected"&&c(e.reason);return t().catch(c)})},It={};var Pt=z('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),Rt=z("<!> <!>",1);function wt(n,t){et(t,!0);let r=p(t,"components",23,()=>[]),a=p(t,"data_0",3,null),o=p(t,"data_1",3,null);rt(()=>t.stores.page.set(t.page)),st(()=>{t.stores,t.page,t.constructors,r(),t.form,a(),o(),t.stores.page.notify()});let c=C(!1),s=C(!1),e=C(null);_t(()=>{const E=t.stores.page.subscribe(()=>{v(c)&&(x(s,!0),nt().then(()=>{x(e,vt(document.title||"untitled page"))}))});return x(c,!0),E});const m=S(()=>t.constructors[1]);var u=Rt(),y=k(u);D(y,()=>t.constructors[1],E=>{var i=I();const d=S(()=>t.constructors[0]);var _=k(i);B(_,()=>v(d),(b,L)=>{V(L(b,{get data(){return a()},get form(){return t.form},children:(h,kt)=>{var j=I(),G=k(j);B(G,()=>v(m),(H,J)=>{V(J(H,{get data(){return o()},get form(){return t.form}}),w=>r()[1]=w,()=>{var w;return(w=r())==null?void 0:w[1]})}),P(h,j)},$$slots:{default:!0}}),h=>r()[0]=h,()=>{var h;return(h=r())==null?void 0:h[0]})}),P(E,i)},E=>{var i=I();const d=S(()=>t.constructors[0]);var _=k(i);B(_,()=>v(d),(b,L)=>{V(L(b,{get data(){return a()},get form(){return t.form}}),h=>r()[0]=h,()=>{var h;return(h=r())==null?void 0:h[0]})}),P(E,i)});var A=ot(y,2);D(A,()=>v(c),E=>{var i=Pt(),d=it(i);D(d,()=>v(s),_=>{var b=ht();ct(()=>dt(b,v(e))),P(_,b)}),lt(i),P(E,i)}),P(n,u),at()}const Dt=gt(wt),Vt=[()=>R(()=>import("../nodes/0.FXIwL0GV.js"),__vite__mapDeps([0,1,2]),import.meta.url),()=>R(()=>import("../nodes/1.CvgyCZfr.js"),__vite__mapDeps([3,1,2,4,5,6,7]),import.meta.url),()=>R(()=>import("../nodes/2.DGEQw40w.js"),__vite__mapDeps([8,1,2,9,4,5,10,7,6,11,12,13,14,15]),import.meta.url),()=>R(()=>import("../nodes/3.HIe-f0aR.js"),__vite__mapDeps([16,1,2,9,4,5,10,7,6,11,12,14,17]),import.meta.url),()=>R(()=>import("../nodes/4.CY-YxSyP.js"),__vite__mapDeps([18,1,2,4,5,9,10,7,6,11,19]),import.meta.url)],pt=[],Bt={"/":[2],"/images":[3],"/system":[4]},jt={handleError:({error:n})=>{console.error(n)},reroute:()=>{}};export{Bt as dictionary,jt as hooks,It as matchers,Vt as nodes,Dt as root,pt as server_loads};
