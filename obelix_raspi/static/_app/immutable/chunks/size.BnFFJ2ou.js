var Ee=Object.defineProperty;var ee=r=>{throw TypeError(r)};var be=(r,e,a)=>e in r?Ee(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a;var re=(r,e,a)=>be(r,typeof e!="symbol"?e+"":e,a),V=(r,e,a)=>e.has(r)||ee("Cannot "+a);var w=(r,e,a)=>(V(r,e,"read from private field"),a?a.call(r):e.get(r)),y=(r,e,a)=>e.has(r)?ee("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(r):e.set(r,a),W=(r,e,a,s)=>(V(r,e,"write to private field"),s?s.call(r,a):e.set(r,a),a),ae=(r,e,a)=>(V(r,e,"access private method"),a);import{Q as we,A as Te,F as b,T as B,U as ke,V as xe,W as _e,X as Ie,Y as se,Z as F,G as D,_ as R,$ as de,C as ce,a0 as Ne,k as ne,a1 as ie,a2 as X,a3 as Ce,m as Me,a4 as fe,a5 as K,a6 as ye,a7 as De,a8 as Le,D as He,a9 as Re,aa as Se,ab as Oe,q as ze,ac as he,ad as qe,ae as Ye,af as P,ag as te,ah as Ve,ai as We,e as Be,u as Fe}from "./runtime.CdqqS4Bm.js";let G=null;function Je(r, e){return e}function Ge(r, e, a, s){for(var f=[],l=e.length,o=0; o<l; o++)ye(e[o].e,f,!0);var d=l>0&&f.length===0&&a!==null;if(d){var A=a.parentNode;De(A),A.append(a),s.clear(),x(r,e[0].prev,e[l-1].next)}Le(f,()=>{for(var h=0; h<l; h++){var v=e[h];d||(s.delete(v.k),x(r,v.prev,v.next)),He(v.e,!d)}})}function je(r, e, a, s, f, l=null){var o=r,d={flags:e,items:new Map,first:null},A=(e&he)!==0;if(A){var h=r;o=b?B(Re(h)):h.appendChild(we())}b&&ke();var v=null,N=!1;Te(()=>{var i=a(),_=xe(i)?i:i==null?[]:_e(i),n=_.length;if(N&&n===0)return;N=n===0;let T=!1;if(b){var g=o.data===Ie;g!==(n===0)&&(o=se(),B(o),F(!1),T=!0)}if(b){for(var p=null,E,c=0; c<n; c++){if(D.nodeType===8&&D.data===Se){o=D,T=!0,F(!1);break}var t=_[c],u=s(t,c);E=ge(D,d,p,null,t,u,c,f,e),d.items.set(u,E),p=E}n>0&&B(se())}if(!b){var z=Oe;Pe(_,d,o,f,e,(z.f&R)!==0,s)}l!==null&&(n===0?v?de(v):v=ce(()=>l(o)):v!==null&&Ne(v,()=>{v=null})),T&&F(!0),a()}),b&&(o=D)}function Pe(r, e, a, s, f, l, o){var Z,$,J,j;var d=(f&qe)!==0,A=(f&(X|K))!==0,h=r.length,v=e.items,N=e.first,i=N,_,n=null,T,g=[],p=[],E,c,t,u;if(d)for(u=0; u<h; u+=1)E=r[u],c=o(E,u),t=v.get(c),t!==void 0&&((Z=t.a)==null||Z.measure(),(T??(T=new Set)).add(t));for(u=0; u<h; u+=1){if(E=r[u],c=o(E,u),t=v.get(c),t===void 0){var z=i?i.e.nodes_start:a;n=ge(z,e,n,n===null?e.first:n.next,E,c,u,s,f),v.set(c,n),g=[],p=[],i=n.next;continue}if(A&&Ue(t,E,u,f),t.e.f&R&&(de(t.e),d&&(($=t.a)==null||$.unfix(),(T??(T=new Set)).delete(t))),t!==i){if(_!==void 0&&_.has(t)){if(g.length<p.length){var H=p[0],k;n=H.prev;var Q=g[0],q=g[g.length-1];for(k=0; k<g.length; k+=1)ue(g[k],H,a);for(k=0; k<p.length; k+=1)_.delete(p[k]);x(e,Q.prev,q.next),x(e,n,Q),x(e,q,H),i=H,n=q,u-=1,g=[],p=[]}else _.delete(t),ue(t,i,a),x(e,t.prev,t.next),x(e,t,n===null?e.first:n.next),x(e,n,t),n=t;continue}for(g=[],p=[]; i!==null&&i.k!==c;)(l||!(i.e.f&R))&&(_??(_=new Set)).add(i),p.push(i),i=i.next;if(i===null)continue;t=i}g.push(t),n=t,i=t.next}if(i!==null||_!==void 0){for(var M=_===void 0?[]:_e(_); i!==null;)(l||!(i.e.f&R))&&M.push(i),i=i.next;var Y=M.length;if(Y>0){var Ae=f&he&&h===0?a:null;if(d){for(u=0; u<Y; u+=1)(J=M[u].a)==null||J.measure();for(u=0; u<Y; u+=1)(j=M[u].a)==null||j.fix()}Ge(e,M,Ae,v)}}d&&ze(()=>{var m;if(T!==void 0)for(t of T)(m=t.a)==null||m.apply()}),ne.first=e.first&&e.first.e,ne.last=n&&n.e}function Ue(r, e, a, s){s&X&&ie(r.v,e),s&K?ie(r.i,a):r.i=a}function ge(r, e, a, s, f, l, o, d, A){var h=G;try{var v=(A&X)!==0,N=(A&Ce)===0,i=v?N?Me(f):fe(f):f,_=A&K?fe(o):o,n={i:_,v:i,k:l,a:null,e:null,prev:a,next:s};return G=n,n.e=ce(()=>d(r,i,_),b),n.e.prev=a&&a.e,n.e.next=s&&s.e,a===null?e.first=n:(a.next=n,a.e.next=n.e),s!==null&&(s.prev=n,s.e.prev=n.e),n}finally{G=h}}function ue(r, e, a){for(var s=r.next?r.next.e.nodes_start:a,f=e?e.e.nodes_start:a,l=r.e.nodes_start; l!==s;){var o=Ye(l);f.before(l),l=o}}function x(r, e, a){e===null?r.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}let le=!1;function Xe(){le||(le=!0,document.addEventListener("reset", r=>{Promise.resolve().then(()=>{var e;if(!r.defaultPrevented)for(const a of r.target.elements)(e=a.__on_r)==null||e.call(a)})},{capture:!0}))}function me(r){if(b){var e=!1,a=()=>{if(!e){if(e=!0,r.hasAttribute("value")){var s=r.value;oe(r,"value",null),r.value=s}if(r.hasAttribute("checked")){var f=r.checked;oe(r,"checked",null),r.checked=f}}};r.__on_r=a,We(a),Xe()}}function oe(r, e, a, s){var f=r.__attributes??(r.__attributes={});b&&(f[e]=r.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&r.nodeName==="LINK")||f[e]!==(f[e]=a)&&(e==="style"&&"__styles"in r&&(r.__styles={}),e==="loading"&&(r[P]=a),a==null?r.removeAttribute(e):typeof a!="string"&&Ke(r).includes(e)?r[e]=a:r.setAttribute(e,a))}var ve=new Map;function Ke(r){var e=ve.get(r.nodeName);if(e)return e;ve.set(r.nodeName,e=[]);for(var a,s=te(r),f=Element.prototype; f!==s;){a=Ve(s);for(var l in a)a[l].set&&e.push(l);s=te(s)}return e}function er(r){if(!b&&r.loading==="lazy"){var e=r.src;r[P]=null,r.loading="eager",r.removeAttribute("src"),requestAnimationFrame(()=>{r[P]!=="eager"&&(r.loading="lazy"),r.src=e})}}var I,C,L,S,pe;const O=class O{constructor(e){y(this,S);y(this,I,new WeakMap);y(this,C);y(this,L);W(this,L,e)}observe(e, a){var s=w(this,I).get(e)||new Set;return s.add(a),w(this,I).set(e,s),ae(this,S,pe).call(this).observe(e,w(this,L)),()=>{var f=w(this,I).get(e);f.delete(a),f.size===0&&(w(this,I).delete(e),w(this,C).unobserve(e))}}};I=new WeakMap,C=new WeakMap,L=new WeakMap,S=new WeakSet,pe=function(){return w(this,C)??W(this,C,new ResizeObserver(e=>{for(var a of e){O.entries.set(a.target,a);for(var s of w(this,I).get(a.target)||[])s(a)}}))},re(O,"entries",new WeakMap);let U=O;var Qe=new U({box:"border-box"});function rr(r, e, a){var s=Qe.observe(r,()=>a(r[e]));Be(()=>(Fe(()=>a(r[e])),s))}export{Xe as a,rr as b,je as e,er as h,Je as i,me as r,oe as s};
