import{A as Se,B as Lt,C as F,E as Qt,F as ot,G as bt,H as I,I as _e,b as yt,c as ct,d as ge,h as fe,j as Ft,l as ut,m as Gt,n as me,o as ye,p as qt,q as ve,s as vt,t as Ce,u as Ct,v as xe,w as $t,x as At,y as pt,z as we}from"./chunk-KTFLTU7Q.js";import{i as be,k as Nt,l as he,m as Mt,s as H,w as dt,x as Ut}from"./chunk-LPQDDNBY.js";import{$ as O,Ba as oe,Ca as y,Cc as S,Ea as it,Fb as M,Fc as Rt,Hb as ft,Ja as It,Jb as mt,Ob as b,Pb as rt,Qb as st,Qc as R,Rb as et,Sb as G,Sc as g,Tb as nt,Ub as jt,Uc as Wt,Vb as at,Vc as ue,Wb as lt,Xb as re,Za as ie,Zb as Et,Zc as v,_ as P,_c as pe,a as p,ab as h,ac as se,b as St,ba as B,c as te,cc as C,da as d,dc as q,ec as Q,fc as Bt,hc as Z,ib as Pt,ic as X,jb as Vt,jc as ae,ka as _t,lc as le,ma as ee,na as Tt,nc as de,oc as Dt,pb as E,pc as ce,qa as kt,qb as z,qc as w,ra as ne,rb as D,rc as j,sc as Y,tb as V,tc as Ht,ub as x,va as gt,vb as N,ya as k}from"./chunk-TJAOO2MX.js";function K(...n){if(n){let s=[];for(let t=0;t<n.length;t++){let e=n[t];if(!e)continue;let o=typeof e;if(o==="string"||o==="number")s.push(e);else if(o==="object"){let i=Array.isArray(e)?[K(...e)]:Object.entries(e).map(([r,a])=>a?r:void 0);s=i.length?s.concat(i.filter(r=>!!r)):s}}return s.join(" ").trim()}}var rn=Object.defineProperty,Te=Object.getOwnPropertySymbols,sn=Object.prototype.hasOwnProperty,an=Object.prototype.propertyIsEnumerable,ke=(n,s,t)=>s in n?rn(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t,Ie=(n,s)=>{for(var t in s||(s={}))sn.call(s,t)&&ke(n,t,s[t]);if(Te)for(var t of Te(s))an.call(s,t)&&ke(n,t,s[t]);return n};function Pe(...n){if(n){let s=[];for(let t=0;t<n.length;t++){let e=n[t];if(!e)continue;let o=typeof e;if(o==="string"||o==="number")s.push(e);else if(o==="object"){let i=Array.isArray(e)?[Pe(...e)]:Object.entries(e).map(([r,a])=>a?r:void 0);s=i.length?s.concat(i.filter(r=>!!r)):s}}return s.join(" ").trim()}}function ln(n){return typeof n=="function"&&"call"in n&&"apply"in n}function dn({skipUndefined:n=!1},...s){return s?.reduce((t,e={})=>{for(let o in e){let i=e[o];if(!(n&&i===void 0))if(o==="style")t.style=Ie(Ie({},t.style),e.style);else if(o==="class"||o==="className")t[o]=Pe(t[o],e[o]);else if(ln(i)){let r=t[o];t[o]=r?(...a)=>{r(...a),i(...a)}:i}else t[o]=i}return t},{})}function Zt(...n){return dn({skipUndefined:!1},...n)}var Ot={};function xt(n="pui_id_"){return Object.hasOwn(Ot,n)||(Ot[n]=0),Ot[n]++,`${n}${Ot[n]}`}var Ee=(()=>{class n extends I{name="common";static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),$=new B("PARENT_INSTANCE"),_=(()=>{class n{document=d(Tt);platformId=d(It);el=d(it);injector=d(ee);cd=d(ue);renderer=d(Pt);config=d(_e);$parentInstance=d($,{optional:!0,skipSelf:!0})??void 0;baseComponentStyle=d(Ee);baseStyle=d(I);scopedStyleEl;parent=this.$params.parent;cn=K;_themeScopedListener;themeChangeListenerMap=new Map;dt=g();unstyled=g();pt=g();ptOptions=g();$attrSelector=xt("pc");get $name(){return this.componentName||"UnknownComponent"}get $hostName(){return this.hostName}get $el(){return this.el?.nativeElement}directivePT=gt(void 0);directiveUnstyled=gt(void 0);$unstyled=R(()=>this.unstyled()??this.directiveUnstyled()??this.config?.unstyled()??!1);$pt=R(()=>$t(this.pt()||this.directivePT(),this.$params));get $globalPT(){return this._getPT(this.config?.pt(),void 0,t=>$t(t,this.$params))}get $defaultPT(){return this._getPT(this.config?.pt(),void 0,t=>this._getOptionValue(t,this.$hostName||this.$name,this.$params)||$t(t,this.$params))}get $style(){return p(p({theme:void 0,css:void 0,classes:void 0,inlineStyles:void 0},(this._getHostInstance(this)||{}).$style),this._componentStyle)}get $styleOptions(){return{nonce:this.config?.csp().nonce}}get $params(){let t=this._getHostInstance(this)||this.$parentInstance;return{instance:this,parent:{instance:t}}}onInit(){}onChanges(t){}onDoCheck(){}onAfterContentInit(){}onAfterContentChecked(){}onAfterViewInit(){}onAfterViewChecked(){}onDestroy(){}constructor(){k(t=>{this.document&&!Ut(this.platformId)&&(this.dt()?(this._loadScopedThemeStyles(this.dt()),this._themeScopedListener=()=>this._loadScopedThemeStyles(this.dt()),this._themeChangeListener("_themeScopedListener",this._themeScopedListener)):this._unloadScopedThemeStyles()),t(()=>{this._offThemeChangeListener("_themeScopedListener")})}),k(t=>{this.document&&!Ut(this.platformId)&&(this.$unstyled()||(this._loadCoreStyles(),this._themeChangeListener("_loadCoreStyles",this._loadCoreStyles))),t(()=>{this._offThemeChangeListener("_loadCoreStyles")})}),this._hook("onBeforeInit")}ngOnInit(){this._loadCoreStyles(),this._loadStyles(),this.onInit(),this._hook("onInit")}ngOnChanges(t){this.onChanges(t),this._hook("onChanges",t)}ngDoCheck(){this.onDoCheck(),this._hook("onDoCheck")}ngAfterContentInit(){this.onAfterContentInit(),this._hook("onAfterContentInit")}ngAfterContentChecked(){this.onAfterContentChecked(),this._hook("onAfterContentChecked")}ngAfterViewInit(){this.$el?.setAttribute(this.$attrSelector,""),this.onAfterViewInit(),this._hook("onAfterViewInit")}ngAfterViewChecked(){this.onAfterViewChecked(),this._hook("onAfterViewChecked")}ngOnDestroy(){this._removeThemeListeners(),this._unloadScopedThemeStyles(),this.onDestroy(),this._hook("onDestroy")}_mergeProps(t,...e){return Ce(t)?t(...e):Zt(...e)}_getHostInstance(t){return t?this.$hostName?this.$name===this.$hostName?t:this._getHostInstance(t.$parentInstance):t.$parentInstance:void 0}_getPropValue(t){return this[t]||this._getHostInstance(this)?.[t]}_getOptionValue(t,e="",o={}){return we(t,e,o)}_hook(t,...e){if(!this.$hostName){let o=this._usePT(this._getPT(this.$pt(),this.$name),this._getOptionValue,`hooks.${t}`),i=this._useDefaultPT(this._getOptionValue,`hooks.${t}`);o?.(...e),i?.(...e)}}_load(){bt.isStyleNameLoaded("base")||(this.baseStyle.loadBaseCSS(this.$styleOptions),this._loadGlobalStyles(),bt.setLoadedStyleName("base")),this._loadThemeStyles()}_loadStyles(){this._load(),this._themeChangeListener("_load",()=>this._load())}_loadGlobalStyles(){let t=this._useGlobalPT(this._getOptionValue,"global.css",this.$params);Ct(t)&&this.baseStyle.load(t,p({name:"global"},this.$styleOptions))}_loadCoreStyles(){!bt.isStyleNameLoaded(this.$style?.name)&&this.$style?.name&&(this.baseComponentStyle.loadCSS(this.$styleOptions),this.$style.loadCSS(this.$styleOptions),bt.setLoadedStyleName(this.$style.name))}_loadThemeStyles(){if(!(this.$unstyled()||this.config?.theme()==="none")){if(!ot.isStyleNameLoaded("common")){let{primitive:t,semantic:e,global:o,style:i}=this.$style?.getCommonTheme?.()||{};this.baseStyle.load(t?.css,p({name:"primitive-variables"},this.$styleOptions)),this.baseStyle.load(e?.css,p({name:"semantic-variables"},this.$styleOptions)),this.baseStyle.load(o?.css,p({name:"global-variables"},this.$styleOptions)),this.baseStyle.loadBaseStyle(p({name:"global-style"},this.$styleOptions),i),ot.setLoadedStyleName("common")}if(!ot.isStyleNameLoaded(this.$style?.name)&&this.$style?.name){let{css:t,style:e}=this.$style?.getComponentTheme?.()||{};this.$style?.load(t,p({name:`${this.$style?.name}-variables`},this.$styleOptions)),this.$style?.loadStyle(p({name:`${this.$style?.name}-style`},this.$styleOptions),e),ot.setLoadedStyleName(this.$style?.name)}if(!ot.isStyleNameLoaded("layer-order")){let t=this.$style?.getLayerOrderThemeCSS?.();this.baseStyle.load(t,p({name:"layer-order",first:!0},this.$styleOptions)),ot.setLoadedStyleName("layer-order")}}}_loadScopedThemeStyles(t){let{css:e}=this.$style?.getPresetTheme?.(t,`[${this.$attrSelector}]`)||{},o=this.$style?.load(e,p({name:`${this.$attrSelector}-${this.$style?.name}`},this.$styleOptions));this.scopedStyleEl=o?.el}_unloadScopedThemeStyles(){this.scopedStyleEl?.remove()}_themeChangeListener(t,e=()=>{}){this._offThemeChangeListener(t),bt.clearLoadedStyleNames();let o=e.bind(this);this.themeChangeListenerMap.set(t,o),Qt.on("theme:change",o)}_removeThemeListeners(){this._offThemeChangeListener("_themeScopedListener"),this._offThemeChangeListener("_loadCoreStyles"),this._offThemeChangeListener("_load")}_offThemeChangeListener(t){this.themeChangeListenerMap.has(t)&&(Qt.off("theme:change",this.themeChangeListenerMap.get(t)),this.themeChangeListenerMap.delete(t))}_getPTValue(t={},e="",o={},i=!0){let r=/./g.test(e)&&!!o[e.split(".")[0]],{mergeSections:a=!0,mergeProps:l=!1}=this._getPropValue("ptOptions")?.()||this.config?.ptOptions?.()||{},u=i?r?this._useGlobalPT(this._getPTClassValue,e,o):this._useDefaultPT(this._getPTClassValue,e,o):void 0,c=r?void 0:this._usePT(this._getPT(t,this.$hostName||this.$name),this._getPTClassValue,e,St(p({},o),{global:u||{}})),f=this._getPTDatasets(e);return a||!a&&c?l?this._mergeProps(l,u,c,f):p(p(p({},u),c),f):p(p({},c),f)}_getPTDatasets(t=""){let e="data-pc-",o=t==="root"&&Ct(this.$pt()?.["data-pc-section"]);return t!=="transition"&&St(p({},t==="root"&&St(p({[`${e}name`]:pt(o?this.$pt()?.["data-pc-section"]:this.$name)},o&&{[`${e}extend`]:pt(this.$name)}),{[`${this.$attrSelector}`]:""})),{[`${e}section`]:pt(t.includes(".")?t.split(".").at(-1)??"":t)})}_getPTClassValue(t,e,o){let i=this._getOptionValue(t,e,o);return At(i)||Se(i)?{class:i}:i}_getPT(t,e="",o){let i=(r,a=!1)=>{let l=o?o(r):r,u=pt(e),c=pt(this.$hostName||this.$name);return(a?u!==c?l?.[u]:void 0:l?.[u])??l};return t?.hasOwnProperty("_usept")?{_usept:t._usept,originalValue:i(t.originalValue),value:i(t.value)}:i(t,!0)}_usePT(t,e,o,i){let r=a=>e?.call(this,a,o,i);if(t?.hasOwnProperty("_usept")){let{mergeSections:a=!0,mergeProps:l=!1}=t._usept||this.config?.ptOptions()||{},u=r(t.originalValue),c=r(t.value);return u===void 0&&c===void 0?void 0:At(c)?c:At(u)?u:a||!a&&c?l?this._mergeProps(l,u,c):p(p({},u),c):c}return r(t)}_useGlobalPT(t,e,o){return this._usePT(this.$globalPT,t,e,o)}_useDefaultPT(t,e,o){return this._usePT(this.$defaultPT,t,e,o)}ptm(t="",e={}){return this._getPTValue(this.$pt(),t,p(p({},this.$params),e))}ptms(t,e={}){return t.reduce((o,i)=>(o=Zt(o,this.ptm(i,e))||{},o),{})}ptmo(t={},e="",o={}){return this._getPTValue(t,e,p({instance:this},o),!1)}cx(t,e={}){return this.$unstyled()?void 0:K(this._getOptionValue(this.$style.classes,t,p(p({},this.$params),e)))}sx(t="",e=!0,o={}){if(e){let i=this._getOptionValue(this.$style.inlineStyles,t,p(p({},this.$params),o)),r=this._getOptionValue(this.baseComponentStyle.inlineStyles,t,p(p({},this.$params),o));return p(p({},r),i)}}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,inputs:{dt:[1,"dt"],unstyled:[1,"unstyled"],pt:[1,"pt"],ptOptions:[1,"ptOptions"]},features:[S([Ee,I]),oe]})}return n})();var m=(()=>{class n{el;renderer;pBind=g(void 0);_attrs=gt(void 0);attrs=R(()=>this._attrs()||this.pBind());styles=R(()=>this.attrs()?.style);classes=R(()=>K(this.attrs()?.class));listeners=[];constructor(t,e){this.el=t,this.renderer=e,k(()=>{let a=this.attrs()||{},{style:o,class:i}=a,r=te(a,["style","class"]);for(let[l,u]of Object.entries(r))if(l.startsWith("on")&&typeof u=="function"){let c=l.slice(2).toLowerCase();if(!this.listeners.some(f=>f.eventName===c)){let f=this.renderer.listen(this.el.nativeElement,c,u);this.listeners.push({eventName:c,unlisten:f})}}else u==null?this.renderer.removeAttribute(this.el.nativeElement,l):(this.renderer.setAttribute(this.el.nativeElement,l,u.toString()),l in this.el.nativeElement&&(this.el.nativeElement[l]=u))})}ngOnDestroy(){this.clearListeners()}setAttrs(t){xe(this._attrs(),t)||this._attrs.set(t)}clearListeners(){this.listeners.forEach(({unlisten:t})=>t()),this.listeners=[]}static \u0275fac=function(e){return new(e||n)(Vt(it),Vt(Pt))};static \u0275dir=D({type:n,selectors:[["","pBind",""]],hostVars:4,hostBindings:function(e,o){e&2&&(ce(o.styles()),w(o.classes()))},inputs:{pBind:[1,"pBind"]}})}return n})(),Be=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=z({type:n});static \u0275inj=O({})}return n})();var De=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var un=["icon"],pn=["*"];function bn(n,s){if(n&1&&et(0,"span",4),n&2){let t=C(2);w(t.cx("icon")),b("ngClass",t.icon)("pBind",t.ptm("icon"))}}function hn(n,s){if(n&1&&(at(0),N(1,bn,1,4,"span",3),lt()),n&2){let t=C();h(),b("ngIf",t.icon)}}function gn(n,s){}function fn(n,s){n&1&&N(0,gn,0,0,"ng-template")}function mn(n,s){if(n&1&&(rt(0,"span",2),N(1,fn,1,0,null,5),st()),n&2){let t=C();w(t.cx("icon")),b("pBind",t.ptm("icon")),h(),b("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var yn={root:({instance:n})=>["p-tag p-component",{"p-tag-info":n.severity==="info","p-tag-success":n.severity==="success","p-tag-warn":n.severity==="warn","p-tag-danger":n.severity==="danger","p-tag-secondary":n.severity==="secondary","p-tag-contrast":n.severity==="contrast","p-tag-rounded":n.rounded}],icon:"p-tag-icon",label:"p-tag-label"},Ne=(()=>{class n extends I{name="tag";style=De;classes=yn;static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var Me=new B("TAG_INSTANCE"),vn=(()=>{class n extends _{componentName="Tag";$pcTag=d(Me,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(m,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=d(Ne);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275cmp=E({type:n,selectors:[["p-tag"]],contentQueries:function(e,o,i){if(e&1&&Bt(i,un,4)(i,Lt,4),e&2){let r;Z(r=X())&&(o.iconTemplate=r.first),Z(r=X())&&(o.templates=r)}},hostVars:3,hostBindings:function(e,o){e&2&&(M("data-p",o.dataP),w(o.cn(o.cx("root"),o.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",v]},features:[S([Ne,{provide:Me,useExisting:n},{provide:$,useExisting:n}]),V([m]),x],ngContentSelectors:pn,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(e,o){e&1&&(q(),Q(0),N(1,hn,2,1,"ng-container",0)(2,mn,2,4,"span",1),rt(3,"span",2),j(4),st()),e&2&&(h(),b("ngIf",!o.iconTemplate&&!o._iconTemplate),h(),b("ngIf",o.iconTemplate||o._iconTemplate),h(),w(o.cx("label")),b("pBind",o.ptm("label")),h(),Y(o.value))},dependencies:[H,be,Nt,Mt,F,m],encapsulation:2,changeDetection:0})}return n})(),$o=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=z({type:n});static \u0275inj=O({imports:[vn,F,F]})}return n})();var Xt=(()=>{class n{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(t,e){t&&e&&(t.classList?t.classList.add(e):t.className+=" "+e)}static addMultipleClasses(t,e){if(t&&e)if(t.classList){let o=e.trim().split(" ");for(let i=0;i<o.length;i++)t.classList.add(o[i])}else{let o=e.split(" ");for(let i=0;i<o.length;i++)t.className+=" "+o[i]}}static removeClass(t,e){t&&e&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(t,e){t&&e&&[e].flat().filter(Boolean).forEach(o=>o.split(" ").forEach(i=>this.removeClass(t,i)))}static hasClass(t,e){return t&&e?t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className):!1}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(e){return e!==t})}static find(t,e){return Array.from(t.querySelectorAll(e))}static findSingle(t,e){return this.isElement(t)?t.querySelector(e):null}static index(t){let e=t.parentNode.childNodes,o=0;for(var i=0;i<e.length;i++){if(e[i]==t)return o;e[i].nodeType==1&&o++}return-1}static indexWithinGroup(t,e){let o=t.parentNode?t.parentNode.childNodes:[],i=0;for(var r=0;r<o.length;r++){if(o[r]==t)return i;o[r].attributes&&o[r].attributes[e]&&o[r].nodeType==1&&i++}return-1}static appendOverlay(t,e,o="self"){o!=="self"&&t&&e&&this.appendChild(t,e)}static alignOverlay(t,e,o="self",i=!0){t&&e&&(i&&(t.style.minWidth=`${n.getOuterWidth(e)}px`),o==="self"?this.relativePosition(t,e):this.absolutePosition(t,e))}static relativePosition(t,e,o=!0){let i=tt=>{if(tt)return getComputedStyle(tt).getPropertyValue("position")==="relative"?tt:i(tt.parentElement)},r=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),a=e.offsetHeight,l=e.getBoundingClientRect(),u=this.getWindowScrollTop(),c=this.getWindowScrollLeft(),f=this.getViewport(),T=i(t)?.getBoundingClientRect()||{top:-1*u,left:-1*c},L,U,wt="top";l.top+a+r.height>f.height?(L=l.top-T.top-r.height,wt="bottom",l.top+L<0&&(L=-1*l.top)):(L=a+l.top-T.top,wt="top");let Jt=l.left+r.width-f.width,on=l.left-T.left;if(r.width>f.width?U=(l.left-T.left)*-1:Jt>0?U=on-Jt:U=l.left-T.left,t.style.top=L+"px",t.style.left=U+"px",t.style.transformOrigin=wt,o){let tt=ge(/-anchor-gutter$/)?.value;t.style.marginTop=wt==="bottom"?`calc(${tt??"2px"} * -1)`:tt??""}}static absolutePosition(t,e,o=!0){let i=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),r=i.height,a=i.width,l=e.offsetHeight,u=e.offsetWidth,c=e.getBoundingClientRect(),f=this.getWindowScrollTop(),A=this.getWindowScrollLeft(),T=this.getViewport(),L,U;c.top+l+r>T.height?(L=c.top+f-r,t.style.transformOrigin="bottom",L<0&&(L=f)):(L=l+c.top+f,t.style.transformOrigin="top"),c.left+a>T.width?U=Math.max(0,c.left+A+u-a):U=c.left+A,t.style.top=L+"px",t.style.left=U+"px",o&&(t.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(t,e=[]){return t.parentNode===null?e:this.getParents(t.parentNode,e.concat([t.parentNode]))}static getScrollableParents(t){let e=[];if(t){let o=this.getParents(t),i=/(auto|scroll)/,r=a=>{let l=window.getComputedStyle(a,null);return i.test(l.getPropertyValue("overflow"))||i.test(l.getPropertyValue("overflowX"))||i.test(l.getPropertyValue("overflowY"))};for(let a of o){let l=a.nodeType===1&&a.dataset.scrollselectors;if(l){let u=l.split(",");for(let c of u){let f=this.findSingle(a,c);f&&r(f)&&e.push(f)}}a.nodeType!==9&&r(a)&&e.push(a)}}return e}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementDimensions(t){let e={};return t.style.visibility="hidden",t.style.display="block",e.width=t.offsetWidth,e.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",e}static scrollInView(t,e){let o=getComputedStyle(t).getPropertyValue("borderTopWidth"),i=o?parseFloat(o):0,r=getComputedStyle(t).getPropertyValue("paddingTop"),a=r?parseFloat(r):0,l=t.getBoundingClientRect(),c=e.getBoundingClientRect().top+document.body.scrollTop-(l.top+document.body.scrollTop)-i-a,f=t.scrollTop,A=t.clientHeight,T=this.getOuterHeight(e);c<0?t.scrollTop=f+c:c+T>A&&(t.scrollTop=f+c-A+T)}static fadeIn(t,e){t.style.opacity=0;let o=+new Date,i=0,r=function(){i=+t.style.opacity.replace(",",".")+(new Date().getTime()-o)/e,t.style.opacity=i,o=+new Date,+i<1&&(window.requestAnimationFrame?window.requestAnimationFrame(r):setTimeout(r,16))};r()}static fadeOut(t,e){var o=1,i=50,r=e,a=i/r;let l=setInterval(()=>{o=o-a,o<=0&&(o=0,clearInterval(l)),t.style.opacity=o},i)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,e){var o=Element.prototype,i=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||function(r){return[].indexOf.call(document.querySelectorAll(r),this)!==-1};return i.call(t,e)}static getOuterWidth(t,e){let o=t.offsetWidth;if(e){let i=getComputedStyle(t);o+=parseFloat(i.marginLeft)+parseFloat(i.marginRight)}return o}static getHorizontalPadding(t){let e=getComputedStyle(t);return parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)}static getHorizontalMargin(t){let e=getComputedStyle(t);return parseFloat(e.marginLeft)+parseFloat(e.marginRight)}static innerWidth(t){let e=t.offsetWidth,o=getComputedStyle(t);return e+=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),e}static width(t){let e=t.offsetWidth,o=getComputedStyle(t);return e-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),e}static getInnerHeight(t){let e=t.offsetHeight,o=getComputedStyle(t);return e+=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom),e}static getOuterHeight(t,e){let o=t.offsetHeight;if(e){let i=getComputedStyle(t);o+=parseFloat(i.marginTop)+parseFloat(i.marginBottom)}return o}static getHeight(t){let e=t.offsetHeight,o=getComputedStyle(t);return e-=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth),e}static getWidth(t){let e=t.offsetWidth,o=getComputedStyle(t);return e-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight)+parseFloat(o.borderLeftWidth)+parseFloat(o.borderRightWidth),e}static getViewport(){let t=window,e=document,o=e.documentElement,i=e.getElementsByTagName("body")[0],r=t.innerWidth||o.clientWidth||i.clientWidth,a=t.innerHeight||o.clientHeight||i.clientHeight;return{width:r,height:a}}static getOffset(t){var e=t.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:e.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,e){let o=t.parentNode;if(!o)throw"Can't replace element";return o.replaceChild(e,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return!0;var o=t.indexOf("Trident/");if(o>0){var i=t.indexOf("rv:");return!0}var r=t.indexOf("Edge/");return r>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,e){if(this.isElement(e))e.appendChild(t);else if(e&&e.el&&e.el.nativeElement)e.el.nativeElement.appendChild(t);else throw"Cannot append "+e+" to "+t}static removeChild(t,e){if(this.isElement(e))e.removeChild(t);else if(e.el&&e.el.nativeElement)e.el.nativeElement.removeChild(t);else throw"Cannot remove "+t+" from "+e}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode?.removeChild(t)}static isElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}static calculateScrollbarWidth(t){if(t){let e=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(e.borderLeftWidth)-parseFloat(e.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let o=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),this.calculatedScrollbarWidth=o,o}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let e=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=e,e}static invokeElementMethod(t,e,o){t[e].apply(t,o)}static clearSelection(){if(window.getSelection&&window.getSelection())window.getSelection()?.empty?window.getSelection()?.empty():window.getSelection()?.removeAllRanges&&(window.getSelection()?.rangeCount||0)>0&&(window.getSelection()?.getRangeAt(0)?.getClientRects()?.length||0)>0&&window.getSelection()?.removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),e=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):typeof t=="number"&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||t.offsetParent===null}static isVisible(t){return t&&t.offsetParent!=null}static isExist(t){return t!==null&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,e){t&&document.activeElement!==t&&t.focus(e)}static getFocusableSelectorString(t=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`}static getFocusableElements(t,e=""){let o=this.find(t,this.getFocusableSelectorString(e)),i=[];for(let r of o){let a=getComputedStyle(r);this.isVisible(r)&&a.display!="none"&&a.visibility!="hidden"&&i.push(r)}return i}static getFocusableElement(t,e=""){let o=this.findSingle(t,this.getFocusableSelectorString(e));if(o){let i=getComputedStyle(o);if(this.isVisible(o)&&i.display!="none"&&i.visibility!="hidden")return o}return null}static getFirstFocusableElement(t,e=""){let o=this.getFocusableElements(t,e);return o.length>0?o[0]:null}static getLastFocusableElement(t,e){let o=this.getFocusableElements(t,e);return o.length>0?o[o.length-1]:null}static getNextFocusableElement(t,e=!1){let o=n.getFocusableElements(t),i=0;if(o&&o.length>0){let r=o.indexOf(o[0].ownerDocument.activeElement);e?r==-1||r===0?i=o.length-1:i=r-1:r!=-1&&r!==o.length-1&&(i=r+1)}return o[i]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection()?.toString():document.getSelection?document.getSelection()?.toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,e){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return e?.nextElementSibling;case"@prev":return e?.previousElementSibling;case"@parent":return e?.parentElement;case"@grandparent":return e?.parentElement?.parentElement;default:let o=typeof t;if(o==="string")return document.querySelector(t);if(o==="object"&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;let r=(a=>!!(a&&a.constructor&&a.call&&a.apply))(t)?t():t;return r&&r.nodeType===9||this.isExist(r)?r:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(t,e){if(t){let o=t.getAttribute(e);return isNaN(o)?o==="true"||o==="false"?o==="true":o:+o}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(t="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,t)}static unblockBodyScroll(t="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,t)}static createElement(t,e={},...o){if(t){let i=document.createElement(t);return this.setAttributes(i,e),i.append(...o),i}}static setAttribute(t,e="",o){this.isElement(t)&&o!==null&&o!==void 0&&t.setAttribute(e,o)}static setAttributes(t,e={}){if(this.isElement(t)){let o=(i,r)=>{let a=t?.$attrs?.[i]?[t?.$attrs?.[i]]:[];return[r].flat().reduce((l,u)=>{if(u!=null){let c=typeof u;if(c==="string"||c==="number")l.push(u);else if(c==="object"){let f=Array.isArray(u)?o(i,u):Object.entries(u).map(([A,T])=>i==="style"&&(T||T===0)?`${A.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${T}`:T?A:void 0);l=f.length?l.concat(f.filter(A=>!!A)):l}}return l},a)};Object.entries(e).forEach(([i,r])=>{if(r!=null){let a=i.match(/^on(.+)/);a?t.addEventListener(a[1].toLowerCase(),r):i==="pBind"?this.setAttributes(t,r):(r=i==="class"?[...new Set(o("class",r))].join(" ").trim():i==="style"?o("style",r).join(";").trim():r,(t.$attrs=t.$attrs||{})&&(t.$attrs[i]=r),t.setAttribute(i,r))}})}}static isFocusableElement(t,e=""){return this.isElement(t)?t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`):!1}}return n})();var Fe=class{element;listener;scrollableParents;constructor(s,t=()=>{}){this.element=s,this.listener=t}bindScrollListener(){this.scrollableParents=Xt.getScrollableParents(this.element);for(let s=0;s<this.scrollableParents.length;s++)this.scrollableParents[s].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let s=0;s<this.scrollableParents.length;s++)this.scrollableParents[s].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var $e=(()=>{class n extends _{autofocus=!1;focused=!1;platformId=d(It);document=d(Tt);host=d(it);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){dt(this.platformId)&&this.autofocus&&setTimeout(()=>{let t=Xt.getFocusableElements(this.host?.nativeElement);t.length===0&&this.host.nativeElement.focus(),t.length>0&&t[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275dir=D({type:n,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[x]})}return n})();var Ae=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var Cn=`
    ${Ae}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,xn={root:({instance:n})=>{let s=typeof n.value=="function"?n.value():n.value,t=typeof n.size=="function"?n.size():n.size,e=typeof n.badgeSize=="function"?n.badgeSize():n.badgeSize,o=typeof n.severity=="function"?n.severity():n.severity;return["p-badge p-component",{"p-badge-circle":Ct(s)&&String(s).length===1,"p-badge-dot":vt(s),"p-badge-sm":t==="small"||e==="small","p-badge-lg":t==="large"||e==="large","p-badge-xl":t==="xlarge"||e==="xlarge","p-badge-info":o==="info","p-badge-success":o==="success","p-badge-warn":o==="warn","p-badge-danger":o==="danger","p-badge-secondary":o==="secondary","p-badge-contrast":o==="contrast"}]}},Le=(()=>{class n extends I{name="badge";style=Cn;classes=xn;static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var Oe=new B("BADGE_INSTANCE");var Yt=(()=>{class n extends _{componentName="Badge";$pcBadge=d(Oe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(m,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=g();badgeSize=g();size=g();severity=g();value=g();badgeDisabled=g(!1,{transform:v});_componentStyle=d(Le);get dataP(){return this.cn({circle:this.value()!=null&&String(this.value()).length===1,empty:this.value()==null,disabled:this.badgeDisabled(),[this.severity()]:this.severity(),[this.size()]:this.size()})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275cmp=E({type:n,selectors:[["p-badge"]],hostVars:5,hostBindings:function(e,o){e&2&&(M("data-p",o.dataP),w(o.cn(o.cx("root"),o.styleClass())),de("display",o.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[S([Le,{provide:Oe,useExisting:n},{provide:$,useExisting:n}]),V([m]),x],decls:1,vars:1,template:function(e,o){e&1&&j(0),e&2&&Y(o.value())},dependencies:[H,F,Be],encapsulation:2,changeDetection:0})}return n})(),ze=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=z({type:n});static \u0275inj=O({imports:[Yt,F,F]})}return n})();var Sn=["*"],_n={root:"p-fluid"},Ve=(()=>{class n extends I{name="fluid";classes=_n;static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var je=new B("FLUID_INSTANCE"),Kt=(()=>{class n extends _{componentName="Fluid";$pcFluid=d(je,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(m,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=d(Ve);static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275cmp=E({type:n,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(e,o){e&2&&w(o.cx("root"))},features:[S([Ve,{provide:je,useExisting:n},{provide:$,useExisting:n}]),V([m]),x],ngContentSelectors:Sn,decls:1,vars:0,template:function(e,o){e&1&&(q(),Q(0))},dependencies:[H],encapsulation:2,changeDetection:0})}return n})();var Tn=["*"],kn=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,He=(()=>{class n extends I{name="baseicon";css=kn;static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Re=(()=>{class n extends _{spin=!1;_componentStyle=d(He);getClassNames(){return K("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275cmp=E({type:n,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(e,o){e&2&&w(o.getClassNames())},inputs:{spin:[2,"spin","spin",v]},features:[S([He]),x],ngContentSelectors:Tn,decls:1,vars:0,template:function(e,o){e&1&&(q(),Q(0))},encapsulation:2,changeDetection:0})}return n})();var In=["data-p-icon","spinner"],We=(()=>{class n extends Re{pathId;onInit(){this.pathId="url(#"+xt()+")"}static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275cmp=E({type:n,selectors:[["","data-p-icon","spinner"]],features:[x],attrs:In,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(e,o){e&1&&(_t(),G(0,"g"),jt(1,"path",0),nt(),G(2,"defs")(3,"clipPath",1),jt(4,"rect",2),nt()()),e&2&&(M("clip-path",o.pathId),h(3),Et("id",o.pathId))},encapsulation:2})}return n})();var Ue=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var Pn=`
    ${Ue}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,En={root:"p-ink"},Ge=(()=>{class n extends I{name="ripple";style=Pn;classes=En;static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var qe=(()=>{class n extends _{componentName="Ripple";zone=d(ne);_componentStyle=d(Ge);animationListener;mouseDownListener;timeout;constructor(){super(),k(()=>{dt(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(t){let e=this.getInk();if(!e||this.document.defaultView?.getComputedStyle(e,null).display==="none")return;if(!this.$unstyled()&&ct(e,"p-ink-active"),e.setAttribute("data-p-ink-active","false"),!Gt(e)&&!qt(e)){let a=Math.max(fe(this.el.nativeElement),ye(this.el.nativeElement));e.style.height=a+"px",e.style.width=a+"px"}let o=me(this.el.nativeElement),i=t.pageX-o.left+this.document.body.scrollTop-qt(e)/2,r=t.pageY-o.top+this.document.body.scrollLeft-Gt(e)/2;this.renderer.setStyle(e,"top",r+"px"),this.renderer.setStyle(e,"left",i+"px"),!this.$unstyled()&&yt(e,"p-ink-active"),e.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let a=this.getInk();a&&(!this.$unstyled()&&ct(a,"p-ink-active"),a.setAttribute("data-p-ink-active","false"))},401)}getInk(){let t=this.el.nativeElement.children;for(let e=0;e<t.length;e++)if(typeof t[e].className=="string"&&t[e].className.indexOf("p-ink")!==-1)return t[e];return null}resetInk(){let t=this.getInk();t&&(!this.$unstyled()&&ct(t,"p-ink-active"),t.setAttribute("data-p-ink-active","false"))}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&ct(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"data-p-ink","true"),this.renderer.setAttribute(t,"data-p-ink-active","false"),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,ve(t))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[S([Ge]),x]})}return n})();var Qe=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\xA0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var Bn=["content"],Dn=["loadingicon"],Nn=["icon"],Mn=["*"],en=(n,s)=>({class:n,pt:s});function Fn(n,s){n&1&&re(0)}function $n(n,s){if(n&1&&et(0,"span",7),n&2){let t=C(3);w(t.cn(t.cx("loadingIcon"),"pi-spin",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon))),b("pBind",t.ptm("loadingIcon")),M("aria-hidden",!0)}}function An(n,s){if(n&1&&(_t(),et(0,"svg",8)),n&2){let t=C(3);w(t.cn(t.cx("loadingIcon"),t.cx("spinnerIcon"))),b("pBind",t.ptm("loadingIcon"))("spin",!0),M("aria-hidden",!0)}}function Ln(n,s){if(n&1&&(at(0),N(1,$n,1,4,"span",3)(2,An,1,5,"svg",6),lt()),n&2){let t=C(2);h(),b("ngIf",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon)),h(),b("ngIf",!(t.loadingIcon||t.buttonProps!=null&&t.buttonProps.loadingIcon))}}function On(n,s){}function zn(n,s){if(n&1&&N(0,On,0,0,"ng-template",9),n&2){let t=C(2);b("ngIf",t.loadingIconTemplate||t._loadingIconTemplate)}}function Vn(n,s){if(n&1&&(at(0),N(1,Ln,3,2,"ng-container",2)(2,zn,1,1,null,5),lt()),n&2){let t=C();h(),b("ngIf",!t.loadingIconTemplate&&!t._loadingIconTemplate),h(),b("ngTemplateOutlet",t.loadingIconTemplate||t._loadingIconTemplate)("ngTemplateOutletContext",Rt(3,en,t.cx("loadingIcon"),t.ptm("loadingIcon")))}}function jn(n,s){if(n&1&&et(0,"span",7),n&2){let t=C(2);w(t.cn(t.cx("icon"),t.icon||(t.buttonProps==null?null:t.buttonProps.icon))),b("pBind",t.ptm("icon")),M("data-p",t.dataIconP)}}function Hn(n,s){}function Rn(n,s){if(n&1&&N(0,Hn,0,0,"ng-template",9),n&2){let t=C(2);b("ngIf",!t.icon&&(t.iconTemplate||t._iconTemplate))}}function Wn(n,s){if(n&1&&(at(0),N(1,jn,1,4,"span",3)(2,Rn,1,1,null,5),lt()),n&2){let t=C();h(),b("ngIf",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!t.iconTemplate&&!t._iconTemplate),h(),b("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",Rt(3,en,t.cx("icon"),t.ptm("icon")))}}function Un(n,s){if(n&1&&(rt(0,"span",7),j(1),st()),n&2){let t=C();w(t.cx("label")),b("pBind",t.ptm("label")),M("aria-hidden",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!(t.label||t.buttonProps!=null&&t.buttonProps.label))("data-p",t.dataLabelP),h(),Y(t.label||(t.buttonProps==null?null:t.buttonProps.label))}}function Gn(n,s){if(n&1&&et(0,"p-badge",10),n&2){let t=C();b("value",t.badge||(t.buttonProps==null?null:t.buttonProps.badge))("severity",t.badgeSeverity||(t.buttonProps==null?null:t.buttonProps.badgeSeverity))("pt",t.ptm("pcBadge"))("unstyled",t.unstyled())}}var qn={root:({instance:n})=>["p-button p-component",{"p-button-icon-only":n.hasIcon&&!n.label&&!n.buttonProps?.label&&!n.badge,"p-button-vertical":(n.iconPos==="top"||n.iconPos==="bottom")&&n.label,"p-button-loading":n.loading||n.buttonProps?.loading,"p-button-link":n.link||n.buttonProps?.link,[`p-button-${n.severity||n.buttonProps?.severity}`]:n.severity||n.buttonProps?.severity,"p-button-raised":n.raised||n.buttonProps?.raised,"p-button-rounded":n.rounded||n.buttonProps?.rounded,"p-button-text":n.text||n.variant==="text"||n.buttonProps?.text||n.buttonProps?.variant==="text","p-button-outlined":n.outlined||n.variant==="outlined"||n.buttonProps?.outlined||n.buttonProps?.variant==="outlined","p-button-sm":n.size==="small"||n.buttonProps?.size==="small","p-button-lg":n.size==="large"||n.buttonProps?.size==="large","p-button-plain":n.plain||n.buttonProps?.plain,"p-button-fluid":n.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:n})=>["p-button-icon",{[`p-button-icon-${n.iconPos||n.buttonProps?.iconPos}`]:n.label||n.buttonProps?.label,"p-button-icon-left":(n.iconPos==="left"||n.buttonProps?.iconPos==="left")&&n.label||n.buttonProps?.label,"p-button-icon-right":(n.iconPos==="right"||n.buttonProps?.iconPos==="right")&&n.label||n.buttonProps?.label,"p-button-icon-top":(n.iconPos==="top"||n.buttonProps?.iconPos==="top")&&n.label||n.buttonProps?.label,"p-button-icon-bottom":(n.iconPos==="bottom"||n.buttonProps?.iconPos==="bottom")&&n.label||n.buttonProps?.label},n.icon,n.buttonProps?.icon],spinnerIcon:({instance:n})=>Object.entries(n.cx("icon")).filter(([,s])=>!!s).reduce((s,[t])=>s+` ${t}`,"p-button-loading-icon"),label:"p-button-label"},ht=(()=>{class n extends I{name="button";style=Qe;classes=qn;static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var Ze=new B("BUTTON_INSTANCE"),Xe=new B("BUTTON_DIRECTIVE_INSTANCE"),Ye=new B("BUTTON_LABEL_INSTANCE"),Ke=new B("BUTTON_ICON_INSTANCE"),J={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},Je=(()=>{class n extends _{componentName="ButtonLabel";ptButtonLabel=g();pButtonLabelPT=g();pButtonLabelUnstyled=g();$pcButtonLabel=d(Ye,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(m,{self:!0});constructor(){super(),k(()=>{let t=this.ptButtonLabel()||this.pButtonLabelPT();t&&this.directivePT.set(t)}),k(()=>{this.pButtonLabelUnstyled()&&this.directiveUnstyled.set(this.pButtonLabelUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(e,o){e&2&&Dt("p-button-label",!o.$unstyled()&&!0)},inputs:{ptButtonLabel:[1,"ptButtonLabel"],pButtonLabelPT:[1,"pButtonLabelPT"],pButtonLabelUnstyled:[1,"pButtonLabelUnstyled"]},features:[S([ht,{provide:Ye,useExisting:n},{provide:$,useExisting:n}]),V([m]),x]})}return n})(),tn=(()=>{class n extends _{componentName="ButtonIcon";ptButtonIcon=g();pButtonIconPT=g();pButtonUnstyled=g();$pcButtonIcon=d(Ke,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(m,{self:!0});constructor(){super(),k(()=>{let t=this.ptButtonIcon()||this.pButtonIconPT();t&&this.directivePT.set(t)}),k(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(e,o){e&2&&Dt("p-button-icon",!o.$unstyled()&&!0)},inputs:{ptButtonIcon:[1,"ptButtonIcon"],pButtonIconPT:[1,"pButtonIconPT"],pButtonUnstyled:[1,"pButtonUnstyled"]},features:[S([ht,{provide:Ke,useExisting:n},{provide:$,useExisting:n}]),V([m]),x]})}return n})(),mr=(()=>{class n extends _{componentName="Button";$pcButtonDirective=d(Xe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(m,{self:!0});_componentStyle=d(ht);ptButtonDirective=g();pButtonPT=g();pButtonUnstyled=g();hostName="";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}constructor(){super(),k(()=>{let t=this.ptButtonDirective()||this.pButtonPT();t&&this.directivePT.set(t)}),k(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())}),k(()=>{let t=this.$unstyled();this.initialized&&t&&this.setStyleClass()})}text=!1;plain=!1;raised=!1;size;outlined=!1;rounded=!1;iconPos="left";loadingIcon;fluid=g(void 0,{transform:v});iconSignal=Wt(tn);labelSignal=Wt(Je);isIconOnly=R(()=>!!(!this.labelSignal()&&this.iconSignal()));_label;_icon;_loading=!1;_severity;_buttonProps;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(J);pcFluid=d(Kt,{optional:!0,host:!0,skipSelf:!0});isTextButton=R(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}set label(t){this._label=t,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}get icon(){return this._icon}set icon(t){this._icon=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(t){this._loading=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get buttonProps(){return this._buttonProps}set buttonProps(t){this._buttonProps=t,t&&typeof t=="object"&&Object.entries(t).forEach(([e,o])=>this[`_${e}`]!==o&&(this[`_${e}`]=o))}get severity(){return this._severity}set severity(t){this._severity=t,this.initialized&&this.setStyleClass()}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;onAfterViewInit(){!this.$unstyled()&&yt(this.htmlElement,this.getStyleClass().join(" ")),dt(this.platformId)&&(this.createIcon(),this.createLabel(),this.initialized=!0)}getStyleClass(){let t=[J.button,J.component];return this.icon&&!this.label&&vt(this.htmlElement.textContent)&&t.push(J.iconOnly),this.loading&&(t.push(J.disabled,J.loading),!this.icon&&this.label&&t.push(J.labelOnly),this.icon&&!this.label&&!vt(this.htmlElement.textContent)&&t.push(J.iconOnly)),this.text&&t.push("p-button-text"),this.severity&&t.push(`p-button-${this.severity}`),this.plain&&t.push("p-button-plain"),this.raised&&t.push("p-button-raised"),this.size&&t.push(`p-button-${this.size}`),this.outlined&&t.push("p-button-outlined"),this.rounded&&t.push("p-button-rounded"),this.size==="small"&&t.push("p-button-sm"),this.size==="large"&&t.push("p-button-lg"),this.hasFluid&&t.push("p-button-fluid"),this.$unstyled()?[]:t}get hasFluid(){return this.fluid()??!!this.pcFluid}setStyleClass(){let t=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...t)}removeExistingSeverityClass(){let t=["success","info","warn","danger","help","primary","secondary","contrast"],e=this.htmlElement.classList.value.split(" ").find(o=>t.some(i=>o===`p-button-${i}`));e&&this.htmlElement.classList.remove(e)}createLabel(){if(!ut(this.htmlElement,'[data-pc-section="buttonlabel"]')&&this.label){let e=Ft("span",{class:this.cx("label"),"p-bind":this.ptm("buttonlabel"),"aria-hidden":this.icon&&!this.label?"true":null});e.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(e)}}createIcon(){if(!ut(this.htmlElement,'[data-pc-section="buttonicon"]')&&(this.icon||this.loading)){let e=this.label&&!this.$unstyled()?"p-button-icon-"+this.iconPos:null,o=!this.$unstyled()&&this.getIconClass(),i=Ft("span",{class:this.cn(this.cx("icon"),e,o),"aria-hidden":"true","p-bind":this.ptm("buttonicon")});!this.loadingIcon&&this.loading&&(i.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(i,this.htmlElement.firstChild)}}updateLabel(){let t=ut(this.htmlElement,'[data-pc-section="buttonlabel"]');if(!this.label){t&&this.htmlElement.removeChild(t);return}t?t.textContent=this.label:this.createLabel()}updateIcon(){let t=ut(this.htmlElement,'[data-pc-section="buttonicon"]'),e=ut(this.htmlElement,'[data-pc-section="buttonlabel"]');this.loading&&!this.loadingIcon&&t?t.innerHTML=this.spinnerIcon:t?.innerHTML&&(t.innerHTML=""),t&&!this.$unstyled()?this.iconPos?t.className="p-button-icon "+(e?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():t.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}onDestroy(){this.initialized=!1}static \u0275fac=function(e){return new(e||n)};static \u0275dir=D({type:n,selectors:[["","pButton",""]],contentQueries:function(e,o,i){e&1&&ae(i,o.iconSignal,tn,5)(i,o.labelSignal,Je,5),e&2&&le(2)},hostVars:4,hostBindings:function(e,o){e&2&&Dt("p-button-icon-only",!o.$unstyled()&&o.isIconOnly())("p-button-text",!o.$unstyled()&&o.isTextButton())},inputs:{ptButtonDirective:[1,"ptButtonDirective"],pButtonPT:[1,"pButtonPT"],pButtonUnstyled:[1,"pButtonUnstyled"],hostName:"hostName",text:[2,"text","text",v],plain:[2,"plain","plain",v],raised:[2,"raised","raised",v],size:"size",outlined:[2,"outlined","outlined",v],rounded:[2,"rounded","rounded",v],iconPos:"iconPos",loadingIcon:"loadingIcon",fluid:[1,"fluid"],label:"label",icon:"icon",loading:"loading",buttonProps:"buttonProps",severity:"severity"},features:[S([ht,{provide:Xe,useExisting:n},{provide:$,useExisting:n}]),V([m]),x]})}return n})(),Qn=(()=>{class n extends _{componentName="Button";hostName="";$pcButton=d(Ze,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=d(m,{self:!0});_componentStyle=d(ht);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=g(void 0,{transform:v});onClick=new kt;onFocus=new kt;onBlur=new kt;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=d(Kt,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}get hasIcon(){return this.icon||this.buttonProps?.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"icon":this._iconTemplate=t.template;break;case"loadingicon":this._loadingIconTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}get dataP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge,loading:this.loading,fluid:this.hasFluid,rounded:this.rounded,raised:this.raised,outlined:this.outlined||this.variant==="outlined",text:this.text||this.variant==="text",link:this.link,vertical:(this.iconPos==="top"||this.iconPos==="bottom")&&this.label})}get dataIconP(){return this.cn({[this.iconPos]:this.iconPos,[this.size]:this.size})}get dataLabelP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=y(n)))(o||n)}})();static \u0275cmp=E({type:n,selectors:[["p-button"]],contentQueries:function(e,o,i){if(e&1&&Bt(i,Bn,5)(i,Dn,5)(i,Nn,5)(i,Lt,4),e&2){let r;Z(r=X())&&(o.contentTemplate=r.first),Z(r=X())&&(o.loadingIconTemplate=r.first),Z(r=X())&&(o.iconTemplate=r.first),Z(r=X())&&(o.templates=r)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",v],raised:[2,"raised","raised",v],rounded:[2,"rounded","rounded",v],text:[2,"text","text",v],plain:[2,"plain","plain",v],outlined:[2,"outlined","outlined",v],link:[2,"link","link",v],tabindex:[2,"tabindex","tabindex",pe],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",v],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",v],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[S([ht,{provide:Ze,useExisting:n},{provide:$,useExisting:n}]),V([m]),x],ngContentSelectors:Mn,decls:7,vars:17,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt","unstyled",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt","unstyled"]],template:function(e,o){e&1&&(q(),rt(0,"button",0),se("click",function(r){return o.onClick.emit(r)})("focus",function(r){return o.onFocus.emit(r)})("blur",function(r){return o.onBlur.emit(r)}),Q(1),N(2,Fn,1,0,"ng-container",1)(3,Vn,3,6,"ng-container",2)(4,Wn,3,6,"ng-container",2)(5,Un,2,6,"span",3)(6,Gn,1,4,"p-badge",4),st()),e&2&&(w(o.cn(o.cx("root"),o.styleClass,o.buttonProps==null?null:o.buttonProps.styleClass)),b("ngStyle",o.style||(o.buttonProps==null?null:o.buttonProps.style))("disabled",o.disabled||o.loading||(o.buttonProps==null?null:o.buttonProps.disabled))("pAutoFocus",o.autofocus||(o.buttonProps==null?null:o.buttonProps.autofocus))("pBind",o.ptm("root")),M("type",o.type||(o.buttonProps==null?null:o.buttonProps.type))("aria-label",o.ariaLabel||(o.buttonProps==null?null:o.buttonProps.ariaLabel))("tabindex",o.tabindex||(o.buttonProps==null?null:o.buttonProps.tabindex))("data-p",o.dataP)("data-p-disabled",o.disabled||o.loading||(o.buttonProps==null?null:o.buttonProps.disabled))("data-p-severity",o.severity||(o.buttonProps==null?null:o.buttonProps.severity)),h(2),b("ngTemplateOutlet",o.contentTemplate||o._contentTemplate),h(),b("ngIf",o.loading||(o.buttonProps==null?null:o.buttonProps.loading)),h(),b("ngIf",!(o.loading||o.buttonProps!=null&&o.buttonProps.loading)),h(),b("ngIf",!o.contentTemplate&&!o._contentTemplate&&(o.label||(o.buttonProps==null?null:o.buttonProps.label))),h(),b("ngIf",!o.contentTemplate&&!o._contentTemplate&&(o.badge||(o.buttonProps==null?null:o.buttonProps.badge))))},dependencies:[H,Nt,Mt,he,qe,$e,We,ze,Yt,F,m],encapsulation:2,changeDetection:0})}return n})(),yr=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=z({type:n});static \u0275inj=O({imports:[H,Qn,F,F]})}return n})();function Zn(n,s){if(n&1&&j(0),n&2){let t=C(3);Ht(" ",t.countryCode," ")}}function Xn(n,s){if(n&1&&j(0),n&2){let t=C(3);Ht(" ",t.countryPhoneCode," ")}}function Yn(n,s){if(n&1&&(G(0,"span",2),ft(1,Zn,1,1),ft(2,Xn,1,1),nt()),n&2){let t=C(2);h(),mt(t.countryCode?1:-1),h(),mt(t.countryPhoneCode?2:-1)}}function Kn(n,s){if(n&1&&(G(0,"a",0),ft(1,Yn,3,2,"span",2),G(2,"span",3),j(3),nt()()),n&2){let t=C();Et("href","tel:"+t.phone,ie),h(),mt(t.countryCode||t.countryPhoneCode?1:-1),h(2),Y(t.phone)}}function Jn(n,s){n&1&&(G(0,"span",1),j(1,"\u2014"),nt())}var nn=class n{phone;countryCode;countryPhoneCode;static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["app-phone"]],inputs:{phone:"phone",countryCode:"countryCode",countryPhoneCode:"countryPhoneCode"},decls:2,vars:1,consts:[[1,"inline-flex","items-center","gap-1","text-gray-700","hover:text-gray-900","text-xs","max-w-full",3,"href"],[1,"text-gray-400","text-xs"],[1,"px-1.5","py-0.5","rounded","bg-gray-100","text-xs","text-gray-600","whitespace-nowrap","shrink-0"],[1,"truncate","text-xs"]],template:function(t,e){t&1&&ft(0,Kn,4,3,"a",0)(1,Jn,2,0,"span",1),t&2&&mt(e.phone?0:1)},dependencies:[H],encapsulation:2})};export{xt as a,$ as b,_ as c,Be as d,vn as e,$o as f,Fe as g,mr as h,yr as i,nn as j};
