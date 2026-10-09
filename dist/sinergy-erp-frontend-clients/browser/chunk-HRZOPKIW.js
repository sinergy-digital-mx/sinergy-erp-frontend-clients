function n(e="#2563eb",l=!1){let t=`<svg xmlns="http://www.w3.org/2000/svg" width="72" height="40" viewBox="0 0 72 40">
    <ellipse cx="36" cy="35" rx="22" ry="3.2" fill="rgba(15,23,42,0.28)"/>
    <g${l?' transform="translate(72,0) scale(-1,1)"':""}>
      <rect x="6" y="10" width="38" height="18" rx="3" fill="${e}"/>
      <rect x="10" y="13" width="10" height="6" rx="1" fill="rgba(255,255,255,0.22)"/>
      <path d="M44 16h10.5c1.4 0 2.6.7 3.3 1.8L62 24v4H44V16z" fill="${e}"/>
      <path d="M48 17.5h8.2l3.2 5H48v-5z" fill="#dbeafe"/>
      <circle cx="18" cy="29" r="4.2" fill="#0f172a"/>
      <circle cx="18" cy="29" r="1.7" fill="#e2e8f0"/>
      <circle cx="52" cy="29" r="4.2" fill="#0f172a"/>
      <circle cx="52" cy="29" r="1.7" fill="#e2e8f0"/>
    </g>
  </svg>`;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(t)}`}function i(e){return e==null||!Number.isFinite(Number(e))?!1:(Number(e)%360+360)%360>180}function c(e,l){if(e!=null&&e>1)return"#2563eb";let r=String(l??"").toLowerCase();return r.includes("on")||r.includes("encend")||r==="1"||r==="true"?"#f59e0b":"#64748b"}export{n as a,i as b,c};
