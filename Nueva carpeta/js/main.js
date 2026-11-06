/* Interacciones comunes: header, menú móvil, reveal, contadores, tooltips, lightbox, fallback de imágenes */
(function(){
  var d=document, reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.remove('nojs');
  var C=window.CONFIG||{};
  window.esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

  /* header sticky */
  var hd=d.querySelector('.site-header');
  if(hd){var f=function(){hd.classList.toggle('scrolled',scrollY>8)};f();addEventListener('scroll',f,{passive:true})}

  /* menú móvil con foco atrapado */
  var burger=d.querySelector('.burger'), mnav=d.querySelector('.mnav');
  if(burger&&mnav){
    var open=function(){mnav.classList.add('on');burger.setAttribute('aria-expanded','true');d.body.style.overflow='hidden';var f=mnav.querySelector('a,button');f&&f.focus()};
    var close=function(){mnav.classList.remove('on');burger.setAttribute('aria-expanded','false');d.body.style.overflow='';burger.focus()};
    burger.addEventListener('click',open);
    mnav.querySelector('.close').addEventListener('click',close);
    mnav.addEventListener('click',function(e){if(e.target===mnav||e.target.tagName==='A')close()});
    d.addEventListener('keydown',function(e){
      if(!mnav.classList.contains('on'))return;
      if(e.key==='Escape')return close();
      if(e.key==='Tab'){var els=mnav.querySelectorAll('a,button');var a=els[0],z=els[els.length-1];
        if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}}
    });
  }

  /* reveal (escalonado 60 ms) */
  window.observeReveal=function(root){
    var els=(root||d).querySelectorAll('.reveal:not(.in)');
    if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});
    els.forEach(function(e,i){e.style.setProperty('--d',(i%6*60)+'ms');io.observe(e)});
  };
  /* contadores */
  window.animateCounter=function(el){
    var to=parseFloat(el.dataset.to),dec=parseInt(el.dataset.dec||0,10),pre=el.dataset.pre||'',suf=el.dataset.suf||'';
    var fmt=function(v){return pre+v.toLocaleString('es-AR',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf};
    if(reduce){el.textContent=fmt(to);return}
    var t0=null;function st(t){if(!t0)t0=t;var p=Math.min((t-t0)/1200,1);el.textContent=fmt(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st);
  };
  window.observeCounters=function(root){
    var els=(root||d).querySelectorAll('[data-to]');
    els.forEach(function(e){e.textContent=(e.dataset.pre||'')+'0'+(e.dataset.suf||'')});
    if(!('IntersectionObserver' in window)){els.forEach(window.animateCounter);return}
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){window.animateCounter(x.target);io.unobserve(x.target)}})},{threshold:.4});
    els.forEach(function(e){io.observe(e)});
  };

  /* fallback de imágenes faltantes */
  window.fixImg=function(img){
    img.addEventListener('error',function(){
      var n=img.getAttribute('data-name')||img.getAttribute('src').split('/').pop();
      var kind=img.getAttribute('data-fb');
      var s=d.createElement('span');
      if(kind==='logo'){s.className=img.getAttribute('data-fbclass')||'';s.textContent=img.getAttribute('data-fbtext')||n}
      else{s.className='img-missing';s.textContent='Imagen pendiente: '+n}
      img.replaceWith(s);
    },{once:true});
    if(img.complete&&img.naturalWidth===0)img.dispatchEvent(new Event('error'));
  };
  d.querySelectorAll('img[data-fb],img[data-name]').forEach(window.fixImg);

  /* tooltips ([data-tip]) en hover y foco, con 120 ms de retraso */
  var tip=d.createElement('div');tip.className='tooltip';tip.setAttribute('role','tooltip');d.body.appendChild(tip);
  var tt;
  function showTip(el,x,y){
    clearTimeout(tt);tt=setTimeout(function(){
      tip.innerHTML=el.getAttribute('data-tip');tip.classList.add('on');
      var r=tip.getBoundingClientRect(),vw=innerWidth,vh=innerHeight;
      var b=el.getBoundingClientRect(); var left=Math.min(Math.max(8,b.left+b.width/2-r.width/2),vw-r.width-8);
      var top=b.top-r.height-10; if(top<8)top=b.bottom+10; if(top+r.height>vh-8)top=vh-r.height-8;
      tip.style.left=left+'px';tip.style.top=top+'px';
    },120);
  }
  function hideTip(){clearTimeout(tt);tip.classList.remove('on')}
  d.addEventListener('mouseover',function(e){var t=e.target.closest&&e.target.closest('[data-tip]');if(t)showTip(t)});
  d.addEventListener('mouseout',function(e){if(e.target.closest&&e.target.closest('[data-tip]'))hideTip()});
  d.addEventListener('focusin',function(e){var t=e.target.closest&&e.target.closest('[data-tip]');if(t)showTip(t)});
  d.addEventListener('focusout',hideTip);
  d.addEventListener('keydown',function(e){if(e.key==='Escape')hideTip()});

  /* lightbox */
  var lb=d.createElement('div');lb.className='lightbox';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Visor de imagen');
  lb.innerHTML='<div class="lb-stage"><img alt=""></div><div class="lb-ctl"><button data-a="in" aria-label="Acercar">+</button><button data-a="out" aria-label="Alejar">−</button><button data-a="reset">Reset</button><a data-a="dl" download>Descargar</a><button data-a="x">Cerrar</button></div>';
  d.body.appendChild(lb);
  var lbi=lb.querySelector('img'),sc=1,px=0,py=0,last;
  function app(){lbi.style.transform='translate('+px+'px,'+py+'px) scale('+sc+')'}
  window.openLightbox=function(src,alt,from){last=from||d.activeElement;lbi.src=src;lbi.alt=alt||'';lb.querySelector('[data-a=dl]').href=src;sc=1;px=py=0;app();lb.classList.add('on');lb.querySelector('[data-a=x]').focus()};
  function closeLb(){lb.classList.remove('on');last&&last.focus&&last.focus()}
  lb.addEventListener('click',function(e){var a=e.target.getAttribute('data-a');if(a==='in'){sc=Math.min(sc*1.25,6)}else if(a==='out'){sc=Math.max(sc/1.25,.5)}else if(a==='reset'){sc=1;px=py=0}else if(a==='x'||e.target===lb)return closeLb();app()});
  lb.addEventListener('wheel',function(e){e.preventDefault();sc=Math.min(6,Math.max(.5,sc*(e.deltaY<0?1.1:.9)));app()},{passive:false});
  var drag=null;lb.querySelector('.lb-stage').addEventListener('pointerdown',function(e){drag={x:e.clientX-px,y:e.clientY-py};e.currentTarget.setPointerCapture(e.pointerId)});
  lb.querySelector('.lb-stage').addEventListener('pointermove',function(e){if(drag){px=e.clientX-drag.x;py=e.clientY-drag.y;app()}});
  lb.querySelector('.lb-stage').addEventListener('pointerup',function(){drag=null});
  d.addEventListener('keydown',function(e){
    if(!lb.classList.contains('on'))return;
    if(e.key==='Escape')return closeLb();
    if(e.key==='Tab'){var els=lb.querySelectorAll('button,a');var a=els[0],z=els[els.length-1];if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}}
  });
  d.addEventListener('click',function(e){var im=e.target.closest&&e.target.closest('img[data-zoom]');if(im)window.openLightbox(im.src,im.alt,im)});

  /* scrollspy genérico (landing: .nav a[href^="#"]) */
  var navLinks=[].slice.call(d.querySelectorAll('.nav a[href^="#"]'));
  if(navLinks.length&&'IntersectionObserver' in window){
    var map={};navLinks.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s)map[s.id]=a});
    var sio=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){navLinks.forEach(function(a){a.classList.remove('active')});map[x.target.id]&&map[x.target.id].classList.add('active')}})},{rootMargin:'-40% 0px -55% 0px'});
    Object.keys(map).forEach(function(id){sio.observe(d.getElementById(id))});
  }

  /* equipo y contacto (landing) */
  var tg=d.getElementById('teamGrid');
  if(tg&&C.team){tg.innerHTML=C.team.map(function(p){
    var av=p.foto?'<div class="avatar"><img src="'+esc(p.foto)+'" alt="'+esc(p.nombre)+'" loading="lazy"></div>':'<div class="avatar" aria-hidden="true">'+esc(p.iniciales)+'</div>';
    return '<article class="card hover person reveal">'+av+'<h4>'+esc(p.nombre)+'</h4><p class="role">'+esc(p.rol)+'</p><p class="muted small" style="margin:0">'+esc(p.linea)+'</p></article>'}).join('')}
  var cm=d.querySelectorAll('[data-contact-email]');
  cm.forEach(function(el){el.textContent=C.contactEmail||'a definir'});
  var cb=d.getElementById('contactBtn');
  if(cb){if(C.contactEmail){cb.href='mailto:'+C.contactEmail}else{cb.classList.add('disabled');cb.setAttribute('aria-disabled','true')}}

  window.observeReveal();window.observeCounters();
})();
