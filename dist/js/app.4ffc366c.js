(function(t){function e(e){for(var n,s,i=e[0],l=e[1],c=e[2],d=0,p=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,i=1;i<a.length;i++){var l=a[i];0!==o[l]&&(n=!1)}n&&(r.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},o={app:0},r=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("85ec"),o=a.n(n);o.a},"56d7":function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),o=a("8c4f"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-row",{attrs:{dense:""}},t._l(t.cards,(function(e,n){return a("v-col",{key:n,staticClass:"v-application",attrs:{xs:"12",sm:"4",md:"3",lg:"2"}},[a("v-card",{staticStyle:{width:"100%"},on:{mouseenter:t.mouse_enter,mouseleave:t.mouse_leave}},[a("v-img",{staticClass:"white--text align-end purple",attrs:{src:e.img,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",height:"150px"}},[a("v-card-title",{staticStyle:{"word-break":"break-word"},domProps:{textContent:t._s(e.item_name)}})],1),a("div",{staticClass:"my-4 subtitle-1 black--text"},[t._v(" "+t._s(e.end-(new Date).getTime()>0?Math.floor((e.end-(new Date).getTime())/1e3/3600)>99?Math.floor((e.end-(new Date).getTime())/1e3/3600/24)+" days":(Math.floor((e.end-(new Date).getTime())/1e3/3600)?(""+Math.floor((e.end-(new Date).getTime())/1e3/3600)).padStart(2,"0")+"h":"")+(Math.floor((e.end-(new Date).getTime())/1e3/3600)||Math.floor((e.end-(new Date).getTime())/1e3/60%60)?(""+Math.floor((e.end-(new Date).getTime())/1e3/60%60)).padStart(2,"0")+"m":"")+(""+Math.floor((e.end-(new Date).getTime())/1e3%60)).padStart(2,"0")+"s":"Ended!")+" ")]),a("v-divider",{staticClass:"mx-4"}),a("v-card-actions",[t._v(" ₡"+t._s((""+(e.highest_bid_amount||e.starting_bid)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"))+" "),a("v-spacer"),a("v-btn",{attrs:{icon:""}},[a("v-icon",[t._v("mdi-heart")])],1)],1),a("div",{staticClass:"item_lore",staticStyle:{position:"fixed",visibility:"hidden"},domProps:{innerHTML:t._s(t.lore_converter(e.item_name,e.tier,e.item_lore))}})],1)],1)})),1)],1)},s=[],i={data:function(){return{auctions:[],sortMethod:this.sort_bid_amount_desc,limit:48}},computed:{cards:function(){return this.$data.auctions.filter((t,e)=>e<this.$data.limit)}},methods:{mergeData:async function(){let t=1,e=(await this.$axios.get("/api/v1/auctions/1")).data;t=e.totalPages,this.$data.auctions=this.merge(this.$data.auctions,e.auctions,"uuid"),this.$data.auctions.sort(this.sortMethod);for(let a=2;a<t;a++)e=(await this.$axios.get("/api/v1/auctions/"+a)).data,this.$data.auctions=this.merge(this.$data.auctions,e.auctions,"uuid"),this.$data.auctions.sort(this.sortMethod)},merge:function(t,e,a){return Object.values([...t,...e].reduce((t,e)=>{return t[e[a]]=e,t},{}))},sort_bid_amount_desc:function(t,e){return(e.highest_bid_amount||e.starting_bid)-(t.highest_bid_amount||t.starting_bid)},sort_bid_amount_asc:function(t,e){return(t.highest_bid_amount||t.starting_bid)-(e.highest_bid_amount||e.starting_bid)},mouse_enter:function(t){document.getElementById("item_lore").innerHTML=t.target.getElementsByClassName("item_lore")[0].innerHTML,document.getElementById("item_lore").style.visibility="visible"},mouse_leave:function(t){document.getElementById("item_lore").style.visibility="hidden"},lore_converter:function(t,e,a){let n="§r";switch(e.toLowerCase()){case"common":n="§f";break;case"uncommon":n="§2";break;case"rare":n="§9";break;case"epic":n="§5";break;case"legendary":n="§6";break;case"special":n="§d";break}return(n+t+"\n\n"+a).replace(/§k((?:(?!§[0-9a-f]).)*)/g,"<span>$1</span>").replace(/§l((?:(?!§[0-9a-z]).)*)/g,'<span style="font-weight: bold">$1</span>').replace(/§m((?:(?!§[0-9a-f]).)*)/g,'<span style="text-decoration: line-through">$1</span>').replace(/§n((?:(?!§[0-9a-f]).)*)/g,'<span style="text-decoration: underline">$1</span>').replace(/§o((?:(?!§[0-9a-f]).)*)/g,'<span style="font-style: italic">$1</span>').replace(/§r((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #ffffff; font-style: normal; font-weight: normal; text-decoration: none;">$1</span>').replace(/§0((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #000000">$1</span>').replace(/§1((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #0000aa">$1</span>').replace(/§2((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #00aa00">$1</span>').replace(/§3((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #00aaaa">$1</span>').replace(/§4((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #aa0000">$1</span>').replace(/§5((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #aa00aa">$1</span>').replace(/§6((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #ffaa00">$1</span>').replace(/§7((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #aaaaaa">$1</span>').replace(/§8((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #555555">$1</span>').replace(/§9((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #5555ff">$1</span>').replace(/§a((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #55ff55">$1</span>').replace(/§b((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #55ffff">$1</span>').replace(/§c((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #ff5555">$1</span>').replace(/§d((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #ff55ff">$1</span>').replace(/§e((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #ffff55">$1</span>').replace(/§f((?:(?!§[0-9a-f]).)*)/g,'<span style="color: #ffffff">$1</span>').replace(/\r?\n/g,"<br />")}},created:function(){this.mergeData(),setInterval(t=>{this.mergeData()},6e4)}},l=i,c=a("2877"),u=Object(c["a"])(l,r,s,!1,null,null,null),d=u.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto col-10"},[a("v-card-title",[t._v(" Login ")]),a("v-card-text",[a("v-text-field",{attrs:{"error-messages":t.errorMcid,label:"Minecraft ID",required:""},model:{value:t.mcid,callback:function(e){t.mcid=e},expression:"mcid"}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{text:"",large:""},on:{click:t.login}},[t._v("Login")])],1)],1)},f=[],m={data:function(){return{mcid:"",errorMcid:""}},methods:{login:async function(){let t=await this.$axios.get("/api/v1/auth/"+this.$data.mcid);if(console.log(t.data),0!==t.data.indexOf("success"))return alert("f"),!1;this.$store.commit({type:"login",mcid:t.data.match(/<<(?<mcid>(?:(?!<<|>>).)+)>>/).groups.mcid,uuid:t.data.match(/{{(?<uuid>(?:(?!{{|}}).)+)}}/).groups.uuid}),location.href="/"}}},g=m,h=Object(c["a"])(g,p,f,!1,null,null,null),v=h.exports,b=new o["a"]({mode:"history",routes:[{path:"/",name:"index",component:d},{path:"/login",name:"login",component:v},{path:"/register",name:"/register",component:null},{path:"/logout",name:"/logout",component:null},{path:"/home",name:"/home",component:null,meta:{requiresAuth:!0}}]}),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"app"}},[a("nav",{staticClass:"navbar navbar-expand-md navbar-light bg-white shadow-sm"},[a("div",{staticClass:"container"},[a("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[t._v(" Skyblock Auction ")]),a("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"navbar-toggler-icon"})]),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[a("ul",{staticClass:"navbar-nav ml-auto"},[!t.user||t.user&&t.user.length&&0===t.user.length?a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"/login"}},[t._v("Login")])]):t._e(),t.user&&t.user.length&&0!==t.user.length?a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("a",t._g({staticClass:"nav-link dropdown-toggle",attrs:{id:"navbarDropdown",href:"#",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},n),[t._v(" "+t._s(t.user)+" "),a("img",{attrs:{src:"https://avatar.minecraft.jp/"+t.user+"/minecraft/l.png",width:"20px",height:"20px"}}),a("span",{staticClass:"caret"})])]}}],null,!1,3663036367)},[a("v-list",[a("v-list-item",[a("v-list-item-title",{on:{click:t.logout}},[t._v("Logout")])],1)],1)],1):t._e()],1)])])]),a("main",{staticClass:"py-4"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row justify-content-center"},[a("router-view")],1)])])])},_=[],$={name:"app",components:{sbAuctions:d},data:function(){return{user:this.$mcid}},methods:{logout:function(){this.$store.commit({type:"logout"}),location.href="/"}},created:function(){let t=document.createElement("div");t.id="stalker",t.style.zIndex="9999",t.style.position="fixed",t.innerHTML='<div id="pointer"></div><div id="item_lore">ITEMLORE</div>',document.body.insertBefore(t,document.body.firstChild),document.addEventListener("mousemove",(function(e){t.style.transform=`translate(${e.clientX}px,${e.clientY}px)`}))}},w=$,x=(a("034f"),Object(c["a"])(w,y,_,!1,null,null,null)),k=x.exports,C=a("ce5b"),S=a.n(C),M=a("5f5b"),O=(a("bf40"),a("bc3a")),T=a.n(O),j=a("2f62"),D=a("0e44");const E={token:""},I={login(t,e){t.mcid=e.mcid,t.uuid=e.uuid},logout(t){t.mcid=null,t.uuid=null}};var L={state:E,mutations:I};n["default"].use(j["a"]);var P=new j["a"].Store({modules:{auth:L},strict:!0,plugins:[Object(D["a"])({key:"SkyblockAuction",paths:["auth.mcid","auth.uuid"],storage:window.sessionStorage})]});let A={loggedIn:!1,login:function(){this.loggedIn=!0},logout:function(){this.loggedIn=!1}};if(n["default"].config.productionTip=!1,n["default"].prototype.$axios=T.a,n["default"].use(o["a"]),n["default"].use(S.a),n["default"].use(M["a"]),b.beforeEach((t,e,a)=>{t.matched.some(t=>t.meta.requiresAuth)&&!A.loggedIn?a({path:"/login",query:{redirect:t.fullPath}}):a()}),sessionStorage.getItem("SkyblockAuction")){const t=JSON.parse(sessionStorage.getItem("SkyblockAuction"));t.auth.mcid&&(n["default"].prototype.$mcid=t.auth.mcid)}new n["default"]({router:b,store:P,vuetify:new S.a({}),render:function(t){return t(k)}}).$mount("#app")},"85ec":function(t,e,a){}});
//# sourceMappingURL=app.4ffc366c.js.map