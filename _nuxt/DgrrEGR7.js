import{Q as u,g as r,c as t,o,n as c,j as l,N as p}from"./CI70Mbtq.js";import{_ as i}from"./rYGzWySG.js";/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=({size:e,strokeWidth:a=2,absoluteStrokeWidth:s,color:n,iconNode:m,name:f,class:C,..._},{slots:h})=>u("svg",{...d,width:e||d.width,height:e||d.height,stroke:n||d.stroke,"stroke-width":s?Number(a)*24/Number(e):a,class:["lucide",`lucide-${w(f??"icon")}`],..._},[...m.map(g=>u(...g)),...h.default?[h.default()]:[]]);/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,a)=>(s,{slots:n})=>u($,{...s,iconNode:a,name:e},n);/**
 * @license lucide-vue-next v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=k("ArrowRightIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),y=r({__name:"Card",props:{class:{}},setup(e){const a=e;return(s,n)=>(o(),t("div",{class:c(("cn"in s?s.cn:l(i))("rounded-xl border bg-card text-card-foreground shadow",a.class))},[p(s.$slots,"default")],2))}}),B=r({__name:"CardHeader",props:{class:{}},setup(e){const a=e;return(s,n)=>(o(),t("div",{class:c(("cn"in s?s.cn:l(i))("flex flex-col gap-y-1.5 p-6",a.class))},[p(s.$slots,"default")],2))}}),I=r({__name:"CardTitle",props:{class:{}},setup(e){const a=e;return(s,n)=>(o(),t("h3",{class:c(("cn"in s?s.cn:l(i))("font-semibold leading-none tracking-tight",a.class))},[p(s.$slots,"default")],2))}}),N=r({__name:"CardContent",props:{class:{}},setup(e){const a=e;return(s,n)=>(o(),t("div",{class:c(("cn"in s?s.cn:l(i))("p-6 pt-0",a.class))},[p(s.$slots,"default")],2))}}),j=r({__name:"CardFooter",props:{class:{}},setup(e){const a=e;return(s,n)=>(o(),t("div",{class:c(("cn"in s?s.cn:l(i))("flex items-center p-6 pt-0",a.class))},[p(s.$slots,"default")],2))}});export{A,y as _,B as a,I as b,k as c,N as d,j as e};
