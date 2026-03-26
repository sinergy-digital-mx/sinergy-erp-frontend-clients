import{b as X,c as Y,d as u}from"./chunk-5JPDJTJF.js";import{B as L,C as v,H as W}from"./chunk-23JD4QLV.js";import{c as $,e as J,g as K,m as x}from"./chunk-6TYUJ23Z.js";import{$ as y,$b as G,Ab as j,Bb as p,Db as l,Ib as c,Jb as b,Kb as I,Lb as z,Mb as g,Nb as _,Pb as Q,Qb as O,Rc as U,Tb as R,Va as B,W as w,X as D,Ya as i,Yb as r,Z as S,Zb as V,_b as q,bc as E,cc as P,kc as m,lb as C,lc as s,mb as N,mc as h,nc as k,pb as F,qb as A,rb as d,uc as H,ya as T}from"./chunk-SV5IPL27.js";var Z=`
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
`;var it=["icon"],at=["*"];function rt(t,a){if(t&1&&z(0,"span",4),t&2){let e=r(2);m(e.cx("icon")),c("ngClass",e.icon)("pBind",e.ptm("icon"))}}function ct(t,a){if(t&1&&(Q(0),d(1,rt,1,4,"span",3),O()),t&2){let e=r();i(),c("ngIf",e.icon)}}function st(t,a){}function dt(t,a){t&1&&d(0,st,0,0,"ng-template")}function pt(t,a){if(t&1&&(b(0,"span",2),d(1,dt,1,0,null,5),I()),t&2){let e=r();m(e.cx("icon")),c("pBind",e.ptm("icon")),i(),c("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)}}var lt={root:({instance:t})=>["p-tag p-component",{"p-tag-info":t.severity==="info","p-tag-success":t.severity==="success","p-tag-warn":t.severity==="warn","p-tag-danger":t.severity==="danger","p-tag-secondary":t.severity==="secondary","p-tag-contrast":t.severity==="contrast","p-tag-rounded":t.rounded}],icon:"p-tag-icon",label:"p-tag-label"},tt=(()=>{class t extends W{name="tag";style=Z;classes=lt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=T(t)))(n||t)}})();static \u0275prov=w({token:t,factory:t.\u0275fac})}return t})();var et=new S("TAG_INSTANCE"),gt=(()=>{class t extends Y{componentName="Tag";$pcTag=y(et,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=y(u,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=y(tt);onAfterContentInit(){this.templates?.forEach(e=>{e.getType()==="icon"&&(this._iconTemplate=e.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=T(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["p-tag"]],contentQueries:function(o,n,M){if(o&1&&G(M,it,4)(M,L,4),o&2){let f;E(f=P())&&(n.iconTemplate=f.first),E(f=P())&&(n.templates=f)}},hostVars:3,hostBindings:function(o,n){o&2&&(j("data-p",n.dataP),m(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",U]},features:[H([tt,{provide:et,useExisting:t},{provide:X,useExisting:t}]),F([u]),A],ngContentSelectors:at,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(o,n){o&1&&(V(),q(0),d(1,ct,2,1,"ng-container",0)(2,pt,2,4,"span",1),b(3,"span",2),s(4),I()),o&2&&(i(),c("ngIf",!n.iconTemplate&&!n._iconTemplate),i(),c("ngIf",n.iconTemplate||n._iconTemplate),i(),m(n.cx("label")),c("pBind",n.ptm("label")),i(),h(n.value))},dependencies:[x,$,J,K,v,u],encapsulation:2,changeDetection:0})}return t})(),jt=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=N({type:t});static \u0275inj=D({imports:[gt,v,v]})}return t})();function mt(t,a){if(t&1&&s(0),t&2){let e=r(3);k(" ",e.countryCode," ")}}function ut(t,a){if(t&1&&s(0),t&2){let e=r(3);k(" ",e.countryPhoneCode," ")}}function ft(t,a){if(t&1&&(g(0,"span",2),p(1,mt,1,1),p(2,ut,1,1),_()),t&2){let e=r(2);i(),l(e.countryCode?1:-1),i(),l(e.countryPhoneCode?2:-1)}}function yt(t,a){if(t&1&&(g(0,"a",0),p(1,ft,3,2,"span",2),g(2,"span",3),s(3),_()()),t&2){let e=r();R("href","tel:"+e.phone,B),i(),l(e.countryCode||e.countryPhoneCode?1:-1),i(2),h(e.phone)}}function Ct(t,a){t&1&&(g(0,"span",1),s(1,"\u2014"),_())}var nt=class t{phone;countryCode;countryPhoneCode;static \u0275fac=function(e){return new(e||t)};static \u0275cmp=C({type:t,selectors:[["app-phone"]],inputs:{phone:"phone",countryCode:"countryCode",countryPhoneCode:"countryPhoneCode"},decls:2,vars:1,consts:[[1,"inline-flex","items-center","gap-1","text-gray-700","hover:text-gray-900","text-xs","max-w-full",3,"href"],[1,"text-gray-400","text-xs"],[1,"px-1.5","py-0.5","rounded","bg-gray-100","text-xs","text-gray-600","whitespace-nowrap","shrink-0"],[1,"truncate","text-xs"]],template:function(e,o){e&1&&p(0,yt,4,3,"a",0)(1,Ct,2,0,"span",1),e&2&&l(o.phone?0:1)},dependencies:[x],encapsulation:2})};export{gt as a,jt as b,nt as c};
