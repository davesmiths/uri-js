window["github.com/davesmith/uri-js"]={parse:function(s,r){var t,a,e,p,h,i,n,o=s,u=[],c={},f=":",m="/",l="indexOf",d="split",v="shift",y="join",b=s[l](f),g=s[l](m),w=s[l]("?"),j=s[l]("#");return s=s.replace(/^\s+|\s+$/g,""),-1!==b&&(-1===g||g>b)&&(-1===w||w>b)&&(s=s[d](f),a=s[v](),s=s[y](f)),(a===r||"http,https,ftp"[d](a,2)[1])&&(-1!==j&&(b=s[d]("#"),s=b[v](),t=b[y]("#")||""),-1!==w&&(-1===j||j>w)&&(b=s[d]("?"),s=b[v](),b=b[y]("?")[d]("&"),u=b.map(function(s,r){return s=s[d]("="),r=s[v]().replace(/^amp;/,""),s=s[y]("="),c[r]=s,{key:r,value:s}})),s.substr(0,2)===m+m&&(s=s.substr(2)[d](m),b=s[v]()[d]("@"),g=b.pop()[d](f),b=b[y]("@")[d](f),e=b[v]()||r,p=b[y](f)||r,h=g[v](),i=g[y](f)||r,s=m+s[y](m))),n=s||r,{readonly:{source:o,params:u},params:c,hash:t,scheme:a,user:e,pass:p,host:h,port:i,path:n}},stringify:function(s,r){var t,a=s.scheme,e="",p=s.params,h=s.host,i=s.user,n=s.pass,o=s.port,u=s.hash,c=a?a+":":"";if(h&&(c+="//"),i&&(c+=i,n&&(c+=":"+n),c+="@"),c+=h||"",o&&(c+=":"+o),c+=s.path||"",p){for(t in p)p.hasOwnProperty(t)&&(e+=t+(p[t]?"="+p[t]:"")+"&");e&&(c+="?"+e.slice(0,-1))}return u!==r&&(c+="#"+u),c}};
