/* Gráficos SVG propios: radar, mapa de stakeholders, matriz de riesgos, heatmap, hype cycle */
(function(){
  var E=window.esc,NS='http://www.w3.org/2000/svg';
  var fmt=function(v){return String(v).replace('.',',')};
  var Charts=window.Charts={};

  /* ---------- Radar ---------- */
  Charts.radar=function(el,rows){
    var series=[{k:'Actual',i:2,c:'var(--serie-actual)',dash:''},{k:'Transición (proyección del equipo)',i:3,c:'var(--serie-trans)',dash:'6 5'},{k:'Destino',i:4,c:'var(--serie-destino)',dash:''}];
    var on=[true,true,true],cx=270,cy=240,R=165,n=rows.length;
    function pt(i,v){var a=-Math.PI/2+i*2*Math.PI/n;return [cx+R*v/5*Math.cos(a),cy+R*v/5*Math.sin(a)]}
    function wrap(s,m){var w=s.split(' '),l=[],c='';w.forEach(function(x){if((c+' '+x).trim().length>m){l.push(c);c=x}else c=(c+' '+x).trim()});l.push(c);return l}
    el.innerHTML='<div class="rlegend no-print" role="group" aria-label="Series del radar"></div><svg viewBox="0 0 540 490" role="img" aria-label="Gráfico de araña: madurez actual, de transición y destino en seis dimensiones" style="width:100%;height:auto;font-family:var(--font-body)"></svg>';
    var lg=el.querySelector('.rlegend'),svg=el.querySelector('svg');
    series.forEach(function(s,k){var b=document.createElement('button');b.setAttribute('aria-pressed','true');b.style.setProperty('--c',s.c);b.innerHTML='<i></i>'+E(s.k);b.onclick=function(){on[k]=!on[k];b.setAttribute('aria-pressed',String(on[k]));draw()};lg.appendChild(b)});
    function draw(){
      var h='';
      for(var r=1;r<=5;r++){var p=[];for(var i=0;i<n;i++)p.push(pt(i,r).join(','));h+='<polygon points="'+p.join(' ')+'" fill="none" stroke="var(--line)" stroke-width="1"/><text x="'+(cx+4)+'" y="'+(cy-R*r/5+12)+'" font-size="10" fill="var(--slate-400)">'+r+'</text>'}
      for(var i=0;i<n;i++){var q=pt(i,5);h+='<line x1="'+cx+'" y1="'+cy+'" x2="'+q[0]+'" y2="'+q[1]+'" stroke="var(--line)"/>'}
      series.forEach(function(s,k){if(!on[k])return;
        var p=rows.map(function(r,i){return pt(i,r[s.i]).join(',')}).join(' ');
        h+='<polygon points="'+p+'" fill="'+s.c+'" fill-opacity=".10" stroke="'+s.c+'" stroke-width="2.5"'+(s.dash?' stroke-dasharray="'+s.dash+'"':'')+'/>';
        rows.forEach(function(r,i){var q=pt(i,r[s.i]);h+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="4.5" fill="'+s.c+'"/>'})});
      rows.forEach(function(r,i){
        var q=pt(i,5.9),a=-Math.PI/2+i*2*Math.PI/n,anc=Math.cos(a)>.3?'start':Math.cos(a)<-.3?'end':'middle';
        var tip=E(r[0])+' — Actual '+fmt(r[2])+' · Transición '+fmt(r[3])+' · Destino '+fmt(r[4])+' (Δ actual→transición +'+fmt(r[3]-r[2])+'; transición→destino +'+fmt(r[4]-r[3])+')';
        var ls=wrap(r[0],18);
        h+='<g tabindex="0" data-tip="'+tip+'" role="img" aria-label="'+tip+'" style="outline-offset:4px"><text x="'+q[0]+'" y="'+(q[1]-(ls.length-1)*6)+'" text-anchor="'+anc+'" font-size="12" font-weight="600" fill="var(--ink)">'+ls.map(function(l,j){return '<tspan x="'+q[0]+'" dy="'+(j?13:0)+'">'+E(l)+'</tspan>'}).join('')+'</text><rect x="'+(q[0]-70)+'" y="'+(q[1]-22)+'" width="140" height="44" fill="transparent"/></g>';
      });
      svg.innerHTML=h;
    }
    draw();
  };
  Charts.radarTables=function(rows){
    var av=rows.map(function(r){return [r[0],r[3]-r[2]]}).sort(function(a,b){return b[1]-a[1]});
    var br=rows.map(function(r){return [r[0],r[4]-r[3]]}).sort(function(a,b){return b[1]-a[1]});
    var t=function(title,data,sign){return '<div><h4>'+title+'</h4>'+MT.table([{l:'Dimensión',f:function(r){return E(r[0])}},{l:sign?'Avance':'Brecha',f:function(r){return (sign?'+':'')+fmt(r[1])},cls:'nw'}],data,{label:title})+'</div>'};
    return '<div class="two-col split">'+t('Avance Actual → Transición',av,true)+t('Brecha Transición → Destino',br,false)+'</div>';
  };

  /* ---------- Mapa de stakeholders ---------- */
  Charts.stake=function(el,S,onSel){
    var W=640,H=560,L=44,T=16,PW=580,PH=500,col={Promotores:['var(--q-promotores)','var(--q-promotores-ink)'],Latentes:['var(--q-latentes)','var(--q-latentes-ink)'],Defensores:['var(--q-defensores)','var(--q-defensores-ink)'],Apáticos:['var(--q-apaticos)','var(--q-apaticos-ink)']};
    var X=function(v){return L+PW*v/10},Y=function(v){return T+PH*(1-v/10)};
    var h='<svg viewBox="0 0 '+W+' '+H+'" role="group" aria-label="Mapa poder por interés con 17 partes interesadas" style="width:100%;height:auto;font-family:var(--font-body)">';
    var q=[['Latentes',0,0],['Promotores',1,0],['Apáticos',0,1],['Defensores',1,1]];
    q.forEach(function(a){h+='<rect x="'+(L+a[1]*PW/2)+'" y="'+(T+a[2]*PH/2)+'" width="'+PW/2+'" height="'+PH/2+'" fill="'+col[a[0]][0]+'" stroke="#fff" stroke-width="2"/><text x="'+(L+a[1]*PW/2+10)+'" y="'+(T+a[2]*PH/2+20)+'" font-size="11" font-weight="700" fill="'+col[a[0]][1]+'">'+a[0].toUpperCase()+' · '+E(DATA.alcance.cuadrantes[a[0]])+'</text>'});
    h+='<text x="'+(L+PW/2)+'" y="'+(H-4)+'" text-anchor="middle" font-size="12" fill="var(--slate-600)">Interés →</text><text transform="translate(12 '+(T+PH/2)+') rotate(-90)" text-anchor="middle" font-size="12" fill="var(--slate-600)">Poder →</text>';
    S.forEach(function(s){
      var x=X(s[7]),y=Y(s[8]),right=s[7]<7.2;
      h+='<g class="sdot" tabindex="0" role="button" data-n="'+s[0]+'" data-g="'+s[2]+'" aria-label="'+s[0]+'. '+E(s[1])+' ('+s[2]+')"><circle cx="'+x+'" cy="'+y+'" r="12" fill="'+col[s[2]][1]+'"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle">'+s[0]+'</text>'+
        '<text class="sname" x="'+(right?x+16:x-16)+'" y="'+(y+4)+'" text-anchor="'+(right?'start':'end')+'">'+E(s[1].length>24?s[1].slice(0,23)+'…':s[1])+'</text></g>'});
    el.innerHTML=h+'</svg>';
    var dots=el.querySelectorAll('.sdot');
    function sel(n,keep){dots.forEach(function(d){d.classList.toggle('on',+d.dataset.n===n)});onSel&&onSel(n,keep)}
    dots.forEach(function(d){var n=+d.dataset.n;
      d.addEventListener('mouseenter',function(){sel(n,false)});
      d.addEventListener('click',function(){sel(n,true)});
      d.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();sel(n,true)}});
      d.addEventListener('focus',function(){sel(n,false)})});
    return {filter:function(g){dots.forEach(function(d){d.classList.toggle('dim',!!g&&d.dataset.g!==g)})},sel:sel};
  };

  /* ---------- Matriz de riesgos 3×3 ---------- */
  Charts.risk=function(el,R,onSel){
    var lv=['A','M','B'],lab={A:'Alta',M:'Media',B:'Baja'},bg={9:'#FBD9D4',6:'#FDE7C8',4:'#FFF1D6',3:'#FFF6E0',2:'#E3F4E8',1:'#E3F4E8'};
    var sc={A:3,M:2,B:1};
    var h='<div class="riskgrid" role="group" aria-label="Matriz de riesgos: probabilidad por impacto"><div></div>';
    ['B','M','A'].forEach(function(i){h+='<div class="rax">Impacto '+lab[i]+'</div>'});
    lv.forEach(function(p){
      h+='<div class="rax" style="writing-mode:vertical-rl;transform:rotate(180deg)">Prob. '+lab[p]+'</div>';
      ['B','M','A'].forEach(function(i){
        var items=R.filter(function(r){return r[2]===p&&r[3]===i});
        h+='<div class="rcell" style="background:'+bg[sc[p]*sc[i]]+'">'+items.map(function(r){return '<button class="rdot" data-n="'+r[0]+'" data-tip="'+E(r[4])+'" aria-label="Riesgo '+r[0]+': '+E(r[1])+'">'+r[0]+'</button>'}).join('')+'</div>'})});
    el.innerHTML=h+'</div><p class="small muted">Cada punto es un riesgo numerado; pasá el mouse o el foco para ver la mitigación.</p>';
    el.querySelectorAll('.rdot').forEach(function(b){b.addEventListener('click',function(){el.querySelectorAll('.rdot').forEach(function(x){x.classList.toggle('on',x===b)});onSel&&onSel(+b.dataset.n)})});
  };

  /* ---------- Heatmap de cobertura 26×7 ---------- */
  Charts.heat=function(el,procs,cols,cov){
    var h='<div class="heat" tabindex="0" role="region" aria-label="Cobertura de aplicaciones por proceso"><table><thead><tr><th>Proceso</th>'+cols.map(function(c,i){return '<th>'+String(i+1).padStart(2,'0')+' '+E(c)+'</th>'}).join('')+'</tr></thead><tbody>';
    var tot=cols.map(function(){return 0});
    procs.forEach(function(p,ri){
      var m=cov[ri+1]||[];
      h+='<tr><td><b>'+E(p[0])+'</b> '+E(p[1])+'</td>'+cols.map(function(c,ci){var on=m.indexOf(ci+1)>-1;if(on)tot[ci]++;return '<td data-c="'+ci+'"'+(on?' class="on" aria-label="Sí"':' aria-label="No"')+'>'+(on?'✓':'')+'</td>'}).join('')+'</tr>'});
    h+='</tbody><tfoot><tr><td>Procesos que toca cada aplicación</td>'+tot.map(function(t){return '<td>'+t+'</td>'}).join('')+'</tr></tfoot></table></div>';
    el.innerHTML=h;
    var tb=el.querySelector('tbody');
    tb.addEventListener('mouseover',function(e){var td=e.target.closest('td');if(!td)return;tb.querySelectorAll('.hl').forEach(function(x){x.classList.remove('hl')});el.querySelectorAll('.hlc').forEach(function(x){x.classList.remove('hlc')});
      td.parentNode.classList.add('hl');var c=td.dataset.c;if(c!=null)tb.querySelectorAll('td[data-c="'+c+'"]').forEach(function(x){x.classList.add('hlc')})});
    tb.addEventListener('mouseleave',function(){tb.querySelectorAll('.hl,.hlc').forEach(function(x){x.classList.remove('hl','hlc')})});
    return tot;
  };

  /* ---------- Hype cycle ---------- */
  Charts.hype=function(el,T,onSel){
    var stage={'Disparador de innovación':.07,'Pico de expectativa inflada':.25,'En maduración':.60,'Rampa de consolidación':.74,'Rampa de consolidación, post-pico de hype':.64,'Meseta de productividad':.93,'Madura':.97};
    var col={'Sí':'var(--soporte)','Evaluar':'var(--fdp-orange)','Más adelante':'var(--slate-400)'};
    var D='M30 300 C 90 300, 130 60, 220 55 C 300 50, 320 250, 420 262 C 520 274, 600 150, 740 140';
    var h='<svg viewBox="0 0 780 370" role="img" aria-label="Curva Hype Cycle con las tecnologías ubicadas por madurez" style="width:100%;height:auto;font-family:var(--font-body)"><path id="hcurve" d="'+D+'" fill="none" stroke="var(--violet)" stroke-width="3"/>';
    [['Disparador',30,'start'],['Pico de expectativas infladas',220,'middle'],['Abismo de desilusión',420,'middle'],['Rampa de consolidación',590,'middle'],['Meseta de productividad',740,'end']].forEach(function(s){h+='<text x="'+s[1]+'" y="352" text-anchor="'+s[2]+'" font-size="11" fill="var(--slate-600)">'+s[0]+'</text>'});
    h+='<text x="8" y="20" font-size="11" fill="var(--slate-600)">Expectativas</text><text x="772" y="330" font-size="11" text-anchor="end" fill="var(--slate-600)">Tiempo →</text><g id="hpts"></g></svg>';
    h+='<div class="legend"><span><i style="background:var(--soporte)"></i>Sí</span><span><i style="background:var(--fdp-orange)"></i>Evaluar</span><span><i style="background:var(--slate-400)"></i>Más adelante</span></div>';
    el.innerHTML=h;
    var path=el.querySelector('#hcurve'),L=path.getTotalLength(),g=el.querySelector('#hpts'),cnt={};
    T.forEach(function(t,i){
      var f=stage[t[2]]||.5;cnt[f]=(cnt[f]||0);var k=cnt[f]++;
      var ff=f+(k%2?1:-1)*Math.ceil(k/2)*.028*(k?1:0);
      var p=path.getPointAtLength(Math.max(0,Math.min(1,ff))*L),dy=(k%2?-1:1)*(k?Math.ceil(k/2)*0:0);
      var gp=document.createElementNS(NS,'g');gp.setAttribute('class','hype-pt');gp.setAttribute('tabindex','0');gp.setAttribute('role','button');gp.dataset.i=i;
      gp.setAttribute('data-tip',E(t[0])+' — '+E(t[1])+' ('+E(t[2])+' · '+E(t[3])+')');gp.setAttribute('aria-label',(i+1)+'. '+t[0]+', '+t[3]);
      gp.innerHTML='<circle cx="'+p.x+'" cy="'+(p.y+dy)+'" r="11" fill="'+col[t[3]]+'"/><text x="'+p.x+'" y="'+(p.y+dy+4)+'" text-anchor="middle">'+(i+1)+'</text>';
      g.appendChild(gp);
      var go=function(){g.querySelectorAll('.on').forEach(function(x){x.classList.remove('on')});gp.classList.add('on');onSel&&onSel(i)};
      gp.addEventListener('mouseenter',go);gp.addEventListener('focus',go);gp.addEventListener('click',go)});
    return {hl:function(i){g.querySelectorAll('.on').forEach(function(x){x.classList.remove('on')});var n=g.querySelector('[data-i="'+i+'"]');n&&n.classList.add('on')}};
  };
})();
