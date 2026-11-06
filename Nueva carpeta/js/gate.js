/* Pantalla de acceso (control VISUAL del lado del cliente) */
(function(){
  var KEY='mallow_access',root=document.documentElement,C=window.CONFIG||{};
  /* SHA-256 de respaldo en JS puro (por si crypto.subtle no está disponible) */
  function sha256js(s){
    function rr(n,x){return (x>>>n)|(x<<(32-n))}
    var m=unescape(encodeURIComponent(s)),l=m.length,w=[],i,j,K=[],H=[],p=0,c={};
    var isP=function(n){for(var k=2;k*k<=n;k++)if(n%k===0)return false;return true};
    var frac=function(x){return (x-Math.floor(x))*4294967296|0};
    for(var n=2;p<64;n++)if(isP(n)){if(p<8)H[p]=frac(Math.pow(n,.5));K[p]=frac(Math.pow(n,1/3));p++}
    m+='\x80';while(m.length%64-56)m+='\x00';
    for(i=0;i<m.length;i++){j=m.charCodeAt(i);w[i>>2]|=j<<((3-i%4)*8)}
    w[w.length]=(l*8/4294967296)|0;w[w.length]=l*8|0;
    for(j=0;j<w.length;){var W=w.slice(j,j+=16),o=H.slice(0);
      for(i=0;i<64;i++){var w15=W[i-15],w2=W[i-2],a=o[0],e=o[4];
        var t1=o[7]+(rr(6,e)^rr(11,e)^rr(25,e))+((e&o[5])^(~e&o[6]))+K[i]+(W[i]=i<16?W[i]:(W[i-16]+(rr(7,w15)^rr(18,w15)^(w15>>>3))+W[i-7]+(rr(17,w2)^rr(19,w2)^(w2>>>10))|0));
        var t2=(rr(2,a)^rr(13,a)^rr(22,a))+((a&o[1])^(a&o[2])^(o[1]&o[2]));
        o=[(t1+t2)|0].concat(o);o[4]=(o[4]+t1)|0;o.pop()}
      for(i=0;i<8;i++)H[i]=(H[i]+o[i])|0}
    var out='';for(i=0;i<8;i++)for(j=3;j+1;j--){var b=(H[i]>>(j*8))&255;out+=(b<16?'0':'')+b.toString(16)}return out;
  }
  function sha(s){
    try{if(window.crypto&&crypto.subtle&&window.isSecureContext!==false){
      return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2)}).join('')})}}catch(e){}
    return Promise.resolve(sha256js(s));
  }
  var started=false;
  function unlock(){root.classList.remove('locked');if(!started){started=true;window.initCaso&&window.initCaso()}window.scrollTo(0,0)}
  var logged=false;try{logged=sessionStorage.getItem(KEY)==='1'}catch(e){}
  var form=document.getElementById('gateForm'),inp=document.getElementById('gateKey'),err=document.getElementById('gateErr');
  if(logged){unlock()}else{root.classList.add('locked');inp&&setTimeout(function(){inp.focus()},50)}
  form&&form.addEventListener('submit',function(e){
    e.preventDefault();err.textContent='';
    sha(inp.value).then(function(h){
      if(h===C.accessKeyHash){try{sessionStorage.setItem(KEY,'1')}catch(x){}inp.value='';unlock()}
      else{err.textContent='⚠ Clave incorrecta. Volvé a intentar.';inp.setAttribute('aria-invalid','true');inp.select()}});
  });
  document.addEventListener('click',function(e){
    if(e.target.id==='logoutBtn'){try{sessionStorage.removeItem(KEY)}catch(x){}location.reload()}});
})();
