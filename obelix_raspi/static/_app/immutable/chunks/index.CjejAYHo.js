import{n as f,s as p}from"./runtime.CU1g5Zbl.js";import{s as a}from"./utils.D2aIMnbg.js";const r=[];function d(t,i=f){let e=null;const o=new Set;function u(n){if(p(t,n)&&(t=n,e)){const c=!r.length;for(const s of o)s[1](),r.push(s,t);if(c){for(let s=0;s<r.length;s+=2)r[s][0](r[s+1]);r.length=0}}}function b(n){u(n(t))}function l(n,c=f){const s=[n,c];return o.add(s),o.size===1&&(e=i(u,b)||f),n(t),()=>{o.delete(s),o.size===0&&e&&(e(),e=null)}}return{set:u,update:b,subscribe:l}}function h(t){let i;return a(t,e=>i=e)(),i}export{h as g,d as w};
