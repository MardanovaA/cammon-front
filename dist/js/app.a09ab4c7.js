(function(e){function n(n){for(var r,a,c=n[0],i=n[1],d=n[2],l=0,f=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&f.push(u[a][0]),u[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(n);while(f.length)f.shift()();return o.push.apply(o,d||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==u[c]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},u={app:0},o=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-1060c64f":"d25b712d","chunk-2d0bdcfc":"c2fe4db2","chunk-2d0cfa15":"dbd588f8","chunk-2d2219ca":"f60098e6","chunk-2d231226":"b70de8e2","chunk-2e35d50c":"d6e68771","chunk-5ca8a612":"18fb68bb"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-1060c64f":1,"chunk-2e35d50c":1,"chunk-5ca8a612":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-1060c64f":"6e6c98ab","chunk-2d0bdcfc":"31d6cfe0","chunk-2d0cfa15":"31d6cfe0","chunk-2d2219ca":"31d6cfe0","chunk-2d231226":"31d6cfe0","chunk-2e35d50c":"d745f82b","chunk-5ca8a612":"f540229e"}[e]+".css",u=i.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var d=o[c],l=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(l===r||l===u))return n()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){d=f[c],l=d.getAttribute("data-href");if(l===r||l===u)return n()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=n,s.onerror=function(n){var r=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],s.parentNode.removeChild(s),t(o)},s.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(s)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)n.push(r[2]);else{var o=new Promise((function(n,t){r=u[e]=[n,t]}));n.push(r[2]=o);var d,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var f=new Error;d=function(n){l.onerror=l.onload=null,clearTimeout(s);var t=u[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,t[1](f)}u[e]=void 0}};var s=setTimeout((function(){d({type:"timeout",target:l})}),12e4);l.onerror=l.onload=d,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=n,d=d.slice();for(var f=0;f<d.length;f++)n(d[f]);var s=l;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";t("85ec")},"56d7":function(e,n,t){"use strict";t.r(n);var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("div",[t("b-navbar",{attrs:{type:"dark",variant:"dark"}},[t("b-navbar-nav",[t("b-nav-item",[t("router-link",{attrs:{to:"/cameras",tag:"li"}},[e._v("Камеры")])],1),t("b-nav-item",[t("router-link",{attrs:{to:"/simulator",tag:"li"}},[e._v("Симулятор")])],1),t("b-nav-item",[t("router-link",{attrs:{to:"/plan",tag:"li"}},[e._v("План склада")])],1)],1)],1)],1),t("router-view",{staticClass:"p-2"})],1)},u=[],o={name:"App"},c=o,i=(t("034f"),t("2877")),d=Object(i["a"])(c,a,u,!1,null,null,null),l=d.exports,f=t("8c4f");r["default"].use(f["a"]);const s=[{path:"/",name:"Home",component:function(){return t.e("chunk-2d0cfa15").then(t.bind(null,"6511"))}},{path:"/cameras",name:"cameras",component:function(){return t.e("chunk-2e35d50c").then(t.bind(null,"acd9"))}},{path:"/cameras/:id",name:"CameraPage",component:function(){return t.e("chunk-5ca8a612").then(t.bind(null,"c8c5"))},props:!0},{path:"/addController/:id",name:"addController",component:function(){return t.e("chunk-2d0bdcfc").then(t.bind(null,"2e1d"))},props:!0},{path:"/addCamera",name:"addCamera",component:function(){return t.e("chunk-2d2219ca").then(t.bind(null,"caa7"))}},{path:"/plan",name:"plan",component:function(){return t.e("chunk-2d231226").then(t.bind(null,"eef6"))}},{path:"/simulator",name:"simulator",component:function(){return t.e("chunk-1060c64f").then(t.bind(null,"eb13"))}}],p=new f["a"]({mode:"history",base:"/",routes:s});var h=p,m=t("7591"),b=t.n(m),v=t("5f5b"),k=(t("f9e3"),t("2dd8"),t("f9bc")),g=t("b1e0"),y=t("c143"),w=(t("3c32"),t("038a"));r["default"].use(b.a),r["default"].use(v["a"]),r["default"].use(k["a"]),r["default"].use(g["a"]),r["default"].use(y["a"]),r["default"].use(w,{classPrefix:"AppIcon-"}),r["default"].config.productionTip=!1,new r["default"]({router:h,render:function(e){return e(l)}}).$mount("#app")},"85ec":function(e,n,t){}});
//# sourceMappingURL=app.a09ab4c7.js.map