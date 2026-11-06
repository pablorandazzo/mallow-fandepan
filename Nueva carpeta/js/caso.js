/* Render de la página privada del caso: capítulos 01–08, componentes interactivos y cierre */
(function(){
  var E=window.esc,D=window.DATA||{},C=window.CONFIG||{},MT=window.MT,T=function(a,b){return a+' <span class="em">'+b+'</span>'};
  var rendered=false;
  function p(t){return '<p>'+E(t)+'</p>'}
  function sub(id,t){return '<div class="sub"><span class="sid">'+id+'</span><h3>'+t+'</h3></div>'}
  function call(t,cls){return '<div class="callout'+(cls?' '+cls:'')+'">'+t+'</div>'}
  function chips(a,cls){return '<div class="chip-row">'+a.map(function(x){return '<span class="chip '+(cls||'')+'">'+E(x)+'</span>'}).join('')+'</div>'}
  function img(name,alt,cap){return '<figure class="img-frame" style="margin:20px 0"><img src="assets/'+name+'" alt="'+E(alt)+'" data-zoom data-name="'+name+'" loading="lazy" decoding="async">'+(cap?'<figcaption class="figcap">'+E(cap)+'</figcaption>':'')+'</figure>'}
  function chapter(o){
    return '<section class="chapter" id="'+o.id+'" data-nav="'+E(o.nav)+'" data-num="'+o.num+'" aria-labelledby="'+o.id+'-t"><div class="container"><header class="ch-head"><div class="ch-num" aria-hidden="true">'+o.num+'</div><p class="eyebrow">'+E(o.label)+'</p><h2 id="'+o.id+'-t">'+o.title+'</h2><p class="lead">'+E(o.lead)+'</p>'+chips(o.chips)+'</header>'+o.body+'</div></section>';
  }
  function checks(a,cls){return '<ul class="checks '+cls+'">'+a.map(function(x){return '<li>'+E(x)+'</li>'}).join('')+'</ul>'}
  var ABBR=function(i){return i};

  /* ======================= PARTE 01 ======================= */
  function ch1(){
    var e=D.empresa,h='';
    h+=sub('1.1','Presentación del caso')+'<div class="read">'+e.presentacion.map(p).join('')+'</div>';
    h+='<div class="sponsor"><div class="avatar" aria-hidden="true">'+e.sponsor.ini+'</div><div><b>Project sponsor</b><br>'+E(e.sponsor.nombre)+' · CEO</div></div>';
    h+='<div class="facts">'+e.datos.map(function(d){return '<div class="fact reveal"><b>'+E(d[0])+'</b>'+E(d[1])+'</div>'}).join('')+'</div>';

    h+=sub('1.2','Identidad organizacional')+'<div class="two"><article class="card"><p class="eyebrow">Misión</p><p>'+E(e.identidad.mision)+'</p></article><article class="card"><p class="eyebrow">Visión</p><p>'+E(e.identidad.vision)+'</p></article></div>';
    h+='<h4 style="margin-top:28px">Cinco valores</h4><div class="chip-row">'+e.identidad.valores.map(function(v){return '<button class="chip" data-tip="'+E(v[1])+'">'+E(v[0])+'</button>'}).join('')+'</div>';

    h+=sub('1.3','Estructura');
    h+='<div class="org" tabindex="0" role="region" aria-label="Organigrama"><div class="org-in">';
    e.org.top.forEach(function(n){h+='<button class="node top" data-act="org" data-d="'+E(n[1])+'" data-t="'+E(n[0])+'" aria-pressed="false">'+E(n[0])+'</button>'});
    h+='<div class="org-row">'+e.org.areas.map(function(a){
      return '<div class="org-col"><button class="node area" data-act="org" data-t="'+E(a.n)+'" data-d="'+E(a.d)+'" aria-pressed="false">'+E(a.n)+'</button>'+
      (a.jefe?'<button class="node" data-act="org" data-t="'+E(a.jefe)+'" data-d="Lidera el equipo operativo del área." aria-pressed="false">'+E(a.jefe)+'</button>':'')+
      '<div class="node team">'+E(a.eq)+'</div></div>'}).join('')+'</div></div></div>';
    h+='<div class="panel" id="orgInfo" aria-live="polite" style="margin-top:12px"><span class="muted">Elegí un nodo del organigrama para ver su descripción.</span></div>';
    h+=call('<strong>Hallazgo:</strong> '+E(e.org.hallazgo),'amber');
    h+=img('organigrama.png','Organigrama de Fan de Pan (imagen opcional)');

    h+=sub('1.4','Productos, clientes y cadena de valor')+'<div class="read">'+p(e.productos)+'</div>';
    h+='<div class="chain">'+e.cadena.map(function(c){return '<div class="link reveal"><b>'+E(c[0])+'</b><p>'+E(c[1])+'</p></div>'}).join('')+'</div>';

    h+=sub('1.5','Objetivos estratégicos SMART');
    h+='<div class="smart">'+e.smart.map(function(s,i){return '<button class="card hover" data-act="smart" data-i="'+i+'" aria-pressed="false"><span class="tagn">SMART '+s.n+'</span><div class="goal"><span data-to="'+s.to+'" data-pre="'+E(s.pre||'')+'" data-suf="'+E(s.suf||'')+'">'+E(s.meta)+'</span></div><div class="t">'+E(s.obj)+'</div></button>'}).join('')+'</div>';
    h+='<div class="panel" id="smartPanel" aria-live="polite" style="margin-top:16px"><span class="muted">Hacé clic en un objetivo para ver su indicador y plazo.</span></div>';

    h+=sub('1.6','Contexto competitivo')+'<div class="read">'+e.competitivo.map(p).join('')+'</div>';

    h+=sub('1.7','FODA y estrategias');
    var names={F:'Fortalezas',D:'Debilidades',O:'Oportunidades',A:'Amenazas'};
    h+='<div class="chip-row no-print" role="group" aria-label="Estrategias">'+e.estrategias.map(function(s,i){return '<button class="chip" data-act="foda" data-i="'+i+'" aria-pressed="false">'+E(s.k)+' · '+E(s.n)+'</button>'}).join('')+'</div>';
    h+='<div class="foda" id="foda">'+['F','D','O','A'].map(function(k){return '<div class="quad q-'+k.toLowerCase()+'"><h4>'+names[k]+'</h4><ul>'+e.foda[k].map(function(x,i){return '<li data-q="'+k+'" data-i="'+i+'">'+E(x)+'</li>'}).join('')+'</ul></div>'}).join('')+'</div>';
    h+='<div class="panel" id="fodaInfo" aria-live="polite" style="margin-top:12px"><span class="muted">Elegí una estrategia para resaltar los ítems que combina (selección de ítems: interpretación del equipo).</span></div>';

    h+=sub('1.8','Problemática central')+'<div class="read">'+p(e.problematica.intro)+'</div>';
    h+='<div class="fronts">'+e.problematica.frentes.map(function(f){return '<button class="card hover front" data-act="front" aria-expanded="false"><span class="num">'+f.n+'</span>'+(f.c?' <span class="badge">problemática central</span>':'')+'<h4>'+E(f.t)+'</h4><div class="more">'+E(f.d)+'</div><span class="small muted">Tocá para ver el detalle</span></button>'}).join('')+'</div>';
    h+='<div class="read" style="margin-top:24px">'+p(e.problematica.prioridad)+'<h4>Por qué ahora</h4>'+p(e.problematica.ahora)+'<h4>Oportunidades complementarias (etapas posteriores)</h4></div>'+checks(e.problematica.complementarias,'yes');

    h+=sub('1.9','Historias de usuario (MoSCoW)');
    h+=MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Historia de usuario',f:function(r){return E(r[1])}},{l:'Prioridad',f:function(r){return MT.prioChip({must:'Must',should:'Should',could:'Could'}[r[2]])},cls:'nw'}],e.historias,{label:'Historias de usuario'});

    h+=sub('1.10','Madurez organizacional (CMM)');
    h+='<div class="cmm" role="img" aria-label="Escala CMM de 1 a 5 con dos marcadores">'+e.cmm.niveles.map(function(n,i){return '<div class="lv"><b>'+(i+1)+'</b>'+E(n)+'</div>'}).join('')+'<div class="mk" style="left:10%">Gestión financiera de los locales = nivel 1</div><div class="mk b" style="left:40%">Operación comercial / compras = repetible–definido (2–3)</div></div>';
    h+='<div class="read">'+p(e.cmm.texto)+'</div>';

    h+=sub('1.11','Cultura, liderazgo y capacidades')+'<div class="read">'+p(e.cultura)+'</div>';
    return chapter({id:'parte01',num:'01',nav:'¿Quién es Fan de Pan?',label:'Parte 01 · El punto de partida · T-01 · 21/08',title:T('¿Quién es','Fan de Pan?'),
      lead:'Antes de proponer una sola línea de tecnología, entendimos la organización: a qué se dedica, qué se propone lograr, dónde está sólida, dónde está floja y de quién depende para operar.',
      chips:['Empresa e industria','Objetivos SMART','FODA','Problemática','Madurez','Estructura'],body:h});
  }

  /* ======================= PARTE 02 ======================= */
  function pnode(l,ids,c){return '<button class="pnode" style="--c:'+c+'" data-act="pm" data-ids="'+ids.join(',')+'" aria-pressed="false">'+E(l)+'<small>'+ids.length+' proceso'+(ids.length>1?'s':'')+' del listado</small></button>'}
  function aeGrid(key,ae,dest){
    var cc=['var(--estrategico)','var(--operativo)','var(--soporte)'];
    var cls=function(it){if(!dest)return '';return dest.nuevos.indexOf(it)>-1?'new':dest.transforman.indexOf(it)>-1?'chgd':''};
    var h='<div class="aewrap"><div class="aegrid" id="grid-'+key+'" role="group" aria-label="Grilla de arquitectura empresarial '+key+'"><div></div>';
    h+=ae.cols.map(function(c,i){return '<div class="ch" style="background:'+cc[i]+'">'+c+'</div>'}).join('');
    ae.rows.forEach(function(r,ri){h+='<div class="rh">'+r[0]+'</div>';r[1].forEach(function(items,ci){
      h+='<button class="aecell" data-act="ae" data-k="'+key+'" data-r="'+ri+'" data-c="'+ci+'" aria-pressed="false" aria-label="'+r[0]+', '+ae.cols[ci]+'">'+items.map(function(it){return '<span class="'+cls(it)+'">'+E(it)+'</span>'}).join('')+'</button>'})});
    return h+'</div></div><div class="panel" id="aePanel-'+key+'" aria-live="polite"><span class="muted">Hacé clic en una celda para ver sus ítems.</span></div>';
  }
  function ch2(){
    var a=D.actual,h=call('<strong>Ojo:</strong> '+E(a.callout));
    h+=sub('2.1','Mapa de procesos (ISO 9001)');
    h+='<div class="pmap"><div class="band-row"><div class="band-lab" style="--c:var(--estrategico)">Estrategia</div><div class="band-items">'+a.mapa.estrategia.map(function(n){return pnode(n[0],n[1],'var(--estrategico)')}).join('')+'</div></div>';
    h+='<div class="band-row"><div class="band-lab" style="--c:var(--operativo)">Operativo</div><div class="band-items">'+a.mapa.operativo.map(function(n,i){return (i?'<span class="muted" aria-hidden="true" style="align-self:center">→</span>':'')+pnode(n[0],n[1],'var(--operativo)')}).join('')+'</div></div>';
    h+='<div class="band-row"><div class="band-lab" style="--c:var(--soporte)">Soporte</div><div class="band-items">'+a.mapa.soporte.map(function(g){return '<div class="pgroup"><h5>'+E(g[0])+'</h5><div class="sub-items">'+g[1].map(function(n){return pnode(n[0],n[1],'var(--soporte)')}).join('')+'</div></div>'}).join('')+'</div></div></div>';
    h+='<div class="panel pside" id="pmPanel" aria-live="polite"><span class="muted">Hacé clic en un elemento del mapa para ver los procesos del listado 2.2 que lo componen.</span></div>';
    h+=img('mapa-procesos.png','Mapa de procesos oficial de Fan de Pan (26 procesos)','Imagen oficial del mapa de procesos. Clic para ampliar.');

    h+=sub('2.2','Listado de procesos');
    var nCeo=a.procesos.filter(function(r){return r[3].indexOf('CEO')>-1}).length;
    h+='<div id="procTable"></div>';
    h+=call('<strong>Casi todos los procesos pasan por el CEO.</strong> <span class="big-num" style="font-size:2rem">'+nCeo+' de '+a.procesos.length+'</span> procesos tienen al CEO como responsable o corresponsable.');

    h+=sub('2.3','Arquitectura empresarial de origen')+img('ae-actual.png','¿Cómo opera Fan de Pan hoy? Arquitectura empresarial de origen','Imagen oficial. Clic para ampliar y descargar.');
    h+='<p class="small muted">Versión navegable construida con los datos del entregable.</p>'+aeGrid('actual',a.ae,null);
    h+='<p class="figcap">'+E(a.ae.pie)+'</p>'+call('<strong>Cómo leer el diagrama.</strong> '+E(a.ae.leer));

    h+=sub('2.4','Arquitectura de datos')+'<div class="read">'+p(a.datosTxt)+'</div>';
    h+=MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Almacén / archivo',f:function(r){return E(r[1])}},{l:'Tecnología',f:function(r){return E(r[2])}},{l:'Procesamiento',f:function(r){return E(r[3])}},{l:'Entidades / datos principales',f:function(r){return E(r[4])}},{l:'Seguridad',f:function(r){return MT.chip(r[5],'bad')}}],a.almacenes,{label:'Almacenes de datos'});
    h+=call(E(a.seguridad),'red');

    h+=sub('2.5','Arquitectura de aplicaciones')+'<div class="read">'+p(a.appsTxt)+'</div>';
    h+=MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Aplicación',f:function(r){return E(r[1])}},{l:'Tipo',f:function(r){return E(r[2])}},{l:'Descripción',f:function(r){return E(r[3])}},{l:'Modalidad',f:function(r){return E(r[4])}},{l:'Estado',f:function(r){return MT.chip(r[5],/Oficial/.test(r[5])?'ok':'warn')}}],a.apps,{label:'Aplicaciones'});
    h+='<p class="small muted">'+E(a.otras)+'</p>';

    h+=sub('2.6','Cobertura de aplicaciones por proceso')+'<div id="heatHost"></div>'+call('<strong>Cómo leerlo.</strong> '+E(a.cobInsight));

    h+=sub('2.7','Arquitectura tecnológica')+'<div class="read">'+p(a.tecTxt)+'</div>';
    h+=MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Componente / equipo',f:function(r){return E(r[1])}},{l:'Tipo',f:function(r){return E(r[2])}},{l:'SO / software base',f:function(r){return E(r[3])}},{l:'Observaciones',f:function(r){return E(r[4])}}],a.infra,{label:'Infraestructura'});
    return chapter({id:'parte02',num:'02',nav:'¿Cómo opera hoy?',label:'Parte 02 · La situación actual · T-02 · 04/09',title:T('¿Cómo opera','hoy?'),
      lead:'La foto del presente, sin retoques. Bajo el marco TOGAF retratamos la arquitectura de origen en sus capas y medimos dónde la base está sólida y dónde todavía es floja.',
      chips:['Mapa de procesos','Arquitectura de origen','Datos','Aplicaciones','Tecnología'],body:h});
  }

  /* ======================= PARTE 03 ======================= */
  function ch3(){
    var d=D.destino,h=call('<strong>Lente de análisis.</strong> '+E(d.lente));
    h+=sub('3.1','Visión de la transformación')+'<div class="read">'+d.vision.map(p).join('')+'</div>';
    h+='<div class="two"><div class="card"><h4>En 2–3 años la casa matriz debería poder</h4>'+checks(d.podria,'yes')+'</div><div class="card"><h4>Dejaría de hacer</h4>'+checks(d.dejaria,'no')+'</div></div>';
    h+='<div class="read" style="margin-top:24px">'+p(d.vinculo)+'</div><h4>Próximos saltos que habilita</h4><p class="muted small">Solo con información financiera estandarizada.</p>'+checks(d.saltos,'yes');
    h+='<h4 style="margin-top:28px">Innovación (modelo Doblin)</h4><div class="read">'+p(d.doblinTxt)+'</div>';
    h+='<div class="doblin">'+d.doblin.map(function(g){return '<div class="dgroup"><h4>'+E(g[0])+'</h4>'+g[1].map(function(t){var m=d.doblinMain.indexOf(t)>-1,c=d.doblinComp.indexOf(t)>-1;return '<div class="dtype'+(m?' main':c?' comp':'')+'"><span>'+E(t)+'</span><small>'+(m?'★ principal':c?'complementario':'')+'</small></div>'}).join('')+'</div>'}).join('')+'</div>';

    h+=sub('3.2','Alineación con los objetivos estratégicos (T-01)')+'<div class="read">'+p(d.alineacionNota)+'</div>';
    h+=d.alineacion.map(function(r,i){return '<details class="row"><summary><span>'+(i+1)+'. '+E(r[1])+'</span></summary><div class="body"><p><b>Transformación propuesta.</b> '+E(r[0])+'</p><p><b>Impacto esperado.</b> '+E(r[2])+'</p></div></details>'}).join('');

    h+=sub('3.3','Referencias y evidencia')+'<div class="read"><h4>Modelo de abastecimiento</h4>'+p(d.abastecimiento)+'</div>';
    h+='<div class="two">'+d.evidencia.map(function(x){return '<article class="card"><span class="chip warn">Evidencia externa citada en T-03</span><h4 style="margin-top:12px">'+E(x.t)+'</h4><p class="small muted">'+E(x.d)+'</p></article>'}).join('')+'</div><p class="figcap">'+E(d.evidenciaNota)+'</p>';

    h+=sub('3.4','Tecnologías y tendencias relevantes')+'<div class="read">'+p(d.tecIntro)+'</div><div id="hypeHost" class="hype-wrap"></div><div id="hypeTable"></div>';

    h+=sub('3.5','Arquitectura empresarial destino')+img('ae-destino.png','Arquitectura empresarial destino de Fan de Pan','Imagen oficial sin alteraciones. Clic para ampliar.');
    h+=call(E(d.aeNota),'amber');
    h+='<div class="chip-row no-print"><button class="chip" data-act="chg" aria-pressed="false">Ver qué cambia</button></div>';
    h+=aeGrid('destino',d.ae,d.ae);
    h+='<div class="legend"><span><i style="background:var(--chg-keep)"></i>Se mantiene</span><span><i style="background:var(--chg-change)"></i>Se transforma</span><span><i style="background:var(--chg-new)"></i>Se incorpora</span></div>';
    h+='<p class="small muted">En el modo «ver qué cambia» solo se tiñen los ítems clasificados por el equipo (nuevos y transformados). La clasificación completa está en la imagen oficial. '+E(d.ae.leyenda)+'.</p><p class="figcap">'+E(d.ae.pie)+'</p>';

    h+=sub('3.6','Arquitectura de negocio (To-Be)')+'<div class="read">'+p(d.negocioTxt)+'</div>';
    h+=d.negocioCambios.map(function(c){return '<details class="row" open><summary>'+E(c[0])+'</summary><div class="body">'+E(c[1])+'</div></details>'}).join('');
    h+=MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Requerimiento (capacidad necesaria)',f:function(r){return E(r[1])}},{l:'Descripción',f:function(r){return E(r[2])}},{l:'Palanca de impacto',f:function(r){return E(r[3])}}],d.reqNeg,{label:'Requerimientos de negocio'});

    h+=sub('3.7','Arquitectura de datos (To-Be)')+'<div class="read">'+p(d.datosTxt)+'</div>';
    h+='<div class="flow" role="group" aria-label="Flujo unificado de datos en 4 capas">'+d.flujo.map(function(f,i){return '<button class="fstep" data-act="flow" data-i="'+i+'" aria-pressed="false"><span class="n">'+f.n+'</span><h4>'+E(f.t)+'</h4><span class="small muted">Tocá para ver el detalle</span></button>'}).join('')+'</div>';
    h+='<div class="panel" id="flowPanel" aria-live="polite" style="margin-top:12px"><span class="muted">Elegí una capa del flujo.</span></div>';
    h+='<ol style="margin-top:20px">'+d.flujoPasos.map(function(x){return '<li>'+E(x)+'</li>'}).join('')+'</ol>';
    h+='<h4 style="margin-top:28px">6 entidades principales (data building blocks)</h4><div class="grid-auto">'+d.entidades.map(function(x){return '<div class="card"><h4 style="color:var(--violet-800)">'+E(x[0])+'</h4><p class="small muted" style="margin:0">'+E(x[1])+'</p></div>'}).join('')+'</div>';
    h+='<h4 style="margin-top:28px">Gobierno, calidad y privacidad</h4><div class="grid-auto">'+d.gobierno.map(function(x){return '<div class="card"><h4>'+E(x[0])+'</h4><p class="small muted" style="margin:0">'+E(x[1])+'</p></div>'}).join('')+'</div>';
    h+=MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Requerimiento de datos',f:function(r){return E(r[1])}},{l:'Descripción',f:function(r){return E(r[2])}},{l:'Prioridad',f:function(r){return MT.prioChip(r[3])},cls:'nw'}],d.reqDat,{label:'Requerimientos de datos'});

    h+=sub('3.8','Arquitectura de aplicaciones')+'<div class="read">'+p(d.appsTxt)+'</div>';
    h+=MT.table([{l:'Capacidad requerida',f:function(r){return '<b>'+E(r[0])+'</b>'}},{l:'Descripción',f:function(r){return E(r[1])}},{l:'¿Existe hoy?',f:function(r){return E(r[2])}},{l:'Tipo de cambio',f:function(r){return E(r[3])}}],d.apps,{label:'Capacidades de aplicaciones'});
    h+='<p class="small muted">'+E(d.integraciones)+'</p>';

    h+=sub('3.9','Arquitectura tecnológica')+'<div class="read">'+p(d.tecTxt)+'</div>';
    h+=MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Requerimiento',f:function(r){return E(r[1])}},{l:'Descripción',f:function(r){return E(r[2])}},{l:'¿Restricción o capacidad nueva?',f:function(r){return MT.chip(r[3],/Restricci/.test(r[3])?'warn':'ok')}}],d.reqTec,{label:'Requerimientos tecnológicos'});

    h+=sub('3.10','Riesgos de la transformación')+'<p class="muted">Escala: A = Alta · M = Media · B = Baja.</p><div id="riskHost"></div><div id="riskTable"></div>';
    return chapter({id:'parte03',num:'03',nav:'¿Cómo debería operar?',label:'Parte 03 · El estado deseado · T-03 · 11/09',title:T('¿Cómo debería','operar?'),
      lead:'La misma organización, una capa más inteligente. Definimos la arquitectura de destino que alinea a Fan de Pan con sus objetivos: qué capacidades necesita y qué requerimientos las sostienen.',
      chips:['Visión','Alineación con objetivos','Tecnologías','Arquitectura destino','Negocio','Datos','Aplicaciones','Tecnología','Riesgos'],body:h});
  }

  /* ======================= PARTE 04 ======================= */
  function ch4(){
    var b=D.brechas,h=sub('4.1','Matriz de brechas')+'<div class="read">'+p(b.intro)+'</div>';
    var L=C.links||{};
    h+='<div class="hero-cta no-print"><a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="'+E(L.matrizBrechas||'#')+'">Abrir la planilla de trabajo</a><a class="btn btn-secondary btn-sm'+(L.matrizBrechasExcel?'':' disabled')+'" '+(L.matrizBrechasExcel?'href="'+E(L.matrizBrechasExcel)+'" download':'aria-disabled="true"')+'>'+(L.matrizBrechasExcel?'Descargar Excel':'Descargar Excel · próximamente')+'</a></div>';
    var dims=Object.keys(b.abb),stc={'Brecha – nuevo':'bad','Incluido (rediseño)':'','Incluido (formalizar)':'','Antecedente parcial':'warn','Restricción':'warn','Caso borde':'warn'};
    h+='<div class="tabs" role="tablist" aria-label="Dimensiones">'+dims.map(function(x,i){return '<button class="tab" role="tab" data-act="tab" data-i="'+i+'" aria-selected="'+(i===0)+'">'+x+'</button>'}).join('')+'</div>';
    dims.forEach(function(x,i){h+='<div role="tabpanel" data-tp="'+i+'"'+(i?' hidden':'')+'>'+MT.table([{l:'ABB',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Bloque',f:function(r){return E(r[1])}},{l:'Estado',f:function(r){return MT.chip(r[2],stc[r[2]]||'')},cls:'nw'},{l:'Justificación',f:function(r){return E(r[3])}}],b.abb[x],{label:'ABB '+x})+'</div>'});
    h+=sub('4.2','ABB candidatos para el proyecto')+'<div class="read">'+p(b.criterio)+'</div><p class="small muted">Las pestañas de 4.1 muestran los ABB candidatos de cada dimensión con su estado.</p>';

    h+=sub('4.3','Modelo de escenarios')+'<p class="muted">Ejes: modalidad del producto (On-premises | SaaS) × modalidad de implementación (Big Bang | Modular / Piloto). Hacé clic en un escenario.</p>';
    h+='<div class="scen" role="group" aria-label="Matriz de escenarios 2 por 2"><div></div><div class="ax">'+b.ejes.x[0]+'</div><div class="ax">'+b.ejes.x[1]+'</div>';
    [0,1].forEach(function(r){h+='<div class="ax v">'+b.ejes.y[r]+'</div>';[0,1].forEach(function(c){var s=b.escenarios.filter(function(e){return e.pos[0]===c&&e.pos[1]===r})[0];
      h+='<button class="card hover'+(s.sel?' sel':'')+'" data-act="scen" data-i="'+(s.n-1)+'" aria-pressed="'+s.sel+'"><b>'+s.n+'</b>'+E(s.cfg)+(s.sel?'<br><span class="badge" style="margin-top:8px">seleccionado</span>':'')+'</button>'})});
    h+='</div><div class="panel" id="scenPanel" aria-live="polite" style="margin-top:16px"></div>';

    h+=sub('4.4','Elección y justificación del Escenario 4');
    h+=b.justificacion.map(function(r){return '<details class="row" open><summary>'+E(r[0])+'</summary><div class="body"><p><b>Criterio de selección.</b> '+E(r[1])+'</p><p><b>Justificación en el caso.</b> '+E(r[2])+'</p></div></details>'}).join('');
    h+='<div class="read" style="margin-top:20px">'+p(b.cierre)+'</div>';
    return chapter({id:'parte04',num:'04',nav:'Brechas y escenarios',label:'Parte 04 · El abanico de opciones · T-04 · 18/09',title:T('Brechas y','escenarios'),
      lead:'La técnica de análisis de brechas de TOGAF compara la arquitectura base (T-02) con la destino (T-03), bloque por bloque, y después compara cuatro formas de llegar.',
      chips:['Matriz de brechas','ABB candidatos','Escenarios','Selección'],body:h});
  }

  /* ======================= PARTE 05 ======================= */
  function ch5(){
    var a=D.alcance,h=sub('5.1','Alcance de la consultoría');
    var al=a.alcance;
    if(!al.objetivoGeneral&&!al.objetivosEspecificos.length){h+='<div class="pend-card"><span class="chip warn">En revisión</span><h4 style="margin-top:12px">Alcance — en revisión</h4><p class="muted small" style="margin:0">El objetivo general, los objetivos específicos, la EDT y los beneficios esperados se completan con el texto final del T-05 (data/alcance-cronograma.js → alcance).</p></div>'}
    else{h+=p(al.objetivoGeneral)+'<h4>Objetivos específicos</h4>'+checks(al.objetivosEspecificos,'yes')+(al.beneficios.length?'<h4>Beneficios esperados</h4>'+checks(al.beneficios,'yes'):'')}
    h+='<h4 style="margin-top:28px">Exclusiones</h4>'+MT.table([{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Exclusión',f:function(r){return E(r[1])}}],al.exclusiones,{label:'Exclusiones'});
    h+='<h4 style="margin-top:28px">Estructura de desglose del trabajo (EDT)</h4><div class="edt">'+['A','B'].map(function(k){var f=a.edt[k];return '<div class="card"><h4>'+E(f.t)+'</h4><ul>'+f.p.map(function(x){return '<li><b>'+x[0]+'</b>'+E(x[1])+' <span class="muted">('+x[2]+')</span></li>'}).join('')+'</ul></div>'}).join('')+'</div><p class="figcap">Mismos IDs que el Gantt.</p>';

    h+=sub('5.2','Cronograma')+'<div class="read">'+p(a.cronoIntro)+'</div><div id="ganttHost"></div>';

    h+=sub('5.3','Hitos de la implementación y su vínculo con los objetivos SMART')+'<p><span class="badge amber">Fase B · fuera del alcance (EX4)</span></p>';
    h+=MT.table([{l:'Hito',f:function(r){return '<b>'+E(r[0])+'</b>'},cls:'nw'},{l:'Mes',f:function(r){return r[1]},cls:'nw'},{l:'Criterio de aceptación',f:function(r){return E(r[2])}},{l:'Objetivo SMART (T-01)',f:function(r){return E(r[3])}}],a.hitos,{label:'Hitos'});
    h+=call('<span class="badge amber">en validación con el equipo</span> '+E(a.hitoNota),'amber');

    h+=sub('5.4','Stakeholders')+'<div class="read">'+p(a.stakeIntro)+'</div>';
    h+='<div class="chip-row no-print" role="group" aria-label="Filtrar el mapa por grupo"><button class="chip" data-act="sgrp" data-g="" aria-pressed="true">Todos</button>'+['Promotores','Latentes','Defensores','Apáticos'].map(function(g){return '<button class="chip" data-act="sgrp" data-g="'+g+'" aria-pressed="false">'+g+'</button>'}).join('')+'</div>';
    h+='<div class="smap-wrap"><div id="stakeMap"></div><div class="panel" id="sCard" aria-live="polite" style="position:sticky;top:90px"><span class="muted">Pasá el mouse o el foco por un punto para ver su ficha; hacé clic para fijarla.</span></div></div>';
    h+='<div id="stakeTable"></div>';
    h+='<details class="row" style="margin-top:24px"><summary>Plan de comunicación por stakeholder (17)</summary><div class="body"><p class="small">'+E(a.planNota)+'</p>'+
      MT.table([{l:'#',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw'},{l:'Qué se comunica',f:function(r){return E(r[1])}},{l:'Cuándo',f:function(r){return E(r[2])}},{l:'Canal',f:function(r){return E(r[3])}},{l:'Responsable',f:function(r){return E(r[4])}}],a.plan,{label:'Plan de comunicación'})+'</div></details>';

    h+=sub('5.5','Impacto en la arquitectura: gráfico de araña')+'<div class="read">'+p(a.radarIntro)+'</div>';
    h+='<p><span class="badge amber">AE de Transición = proyección del equipo, no un dato relevado</span></p><div class="radar-wrap"><div id="radarHost"></div><div>'+
      MT.table([{l:'Dimensión',f:function(r){return '<b>'+E(r[0])+'</b><br><span class="muted small">'+E(r[1])+'</span>'}},{l:'Actual',f:function(r){return String(r[2]).replace('.',',')},cls:'nw'},{l:'Trans. (M6)',f:function(r){return String(r[3]).replace('.',',')},cls:'nw'},{l:'Destino',f:function(r){return String(r[4]).replace('.',',')},cls:'nw'},{l:'Qué explica la evolución',f:function(r){return '<span class="small">'+E(r[5])+'</span>'}}],a.radar,{label:'Datos del radar'})+'</div></div>';
    h+=window.Charts.radarTables(a.radar);
    h+=a.reflexion.map(function(t){return '<blockquote class="quote-block">'+E(t)+'</blockquote>'}).join('');

    h+=sub('5.6','Riesgos, supuestos y restricciones del proyecto')+'<p class="muted">Los riesgos de la transformación están en 3.10; estos son los de la consultoría y la selección.</p><div id="projRisk"></div>';
    h+='<h4 style="margin-top:28px">Metodología de gestión (matriz de Stacey) <span class="badge amber">en validación con el equipo</span></h4><div class="read">'+p(a.stacey)+'</div>';
    return chapter({id:'parte05',num:'05',nav:'Alcance, cronograma y stakeholders',label:'Parte 05 · Cómo se organiza el trabajo · T-05 · 25/09',title:T('Alcance, cronograma y','stakeholders'),
      lead:'Antes de salir al mercado, acordamos hasta dónde llega la consultoría, cómo se organiza el trabajo en el tiempo, a quién involucra y qué puede salir mal.',
      chips:['Alcance','Cronograma','Hitos','Stakeholders','Impacto en la arquitectura','Riesgos'],body:h});
  }

  /* ======================= PARTES 06–08 ======================= */
  function renderPend(pd){
    var h='';
    if(pd.contenido){h=pd.contenido}
    else{
      h+='<div class="grid-auto">'+pd.entregables.map(function(e){return '<article class="pend-card"><span class="chip warn">En elaboración</span><h4 style="margin:12px 0 4px">'+E(e[0])+' · '+E(e[1])+'</h4><p class="small muted" style="margin:0">Fecha oficial: '+E(e[2])+'</p></article>'}).join('')+'</div>';
      if(pd.contexto)h+=call(E(pd.contexto));
      h+='<p class="muted" style="margin-top:24px">Este capítulo se completa al cerrar el entregable.</p>';
      if(pd.timeline){h+='<h4 style="margin-top:32px">Estado de los 11 entregables</h4><div class="tline">'+D.entregables.map(function(e){return '<div><b>'+e.id+'</b><span>'+E(e.t)+' <span class="muted small">· '+e.f+'</span></span>'+MT.estadoChip(e.est)+'</div>'}).join('')+'</div><p class="small muted">Presentación final ante el sponsor: 24/11/2026.</p>'}
    }
    return chapter({id:pd.id,num:pd.num,nav:pd.nav,label:pd.label,title:T(pd.titulo[0],pd.titulo[1]),lead:pd.lead,chips:pd.chips,body:h}).replace('<section class="chapter"','<section class="chapter pend"');
  }
  function closing(){
    var L=(C.links||{}).entregables||{};
    return '<section class="chapter" id="descargas" data-nav="Descargas" data-num="↓"><div class="container"><header class="ch-head"><p class="eyebrow">Cierre</p><h2>Documentación de respaldo — '+T('Los entregables','completos')+'</h2><p class="lead">Los once entregables de la consultoría, con su fecha oficial y su estado.</p></header><div class="dcards">'+
      D.entregables.map(function(e){var u=L[e.id.replace('-','')];
        return '<article class="card dcard"><div class="id">'+e.id+'</div><h4 style="margin:0">'+E(e.t)+'</h4><div class="meta"><span>'+e.f+'</span>'+MT.estadoChip(e.est)+'</div>'+
        (u?'<a class="btn btn-primary btn-sm" href="'+E(u)+'" download target="_blank" rel="noopener">Descargar PDF</a>':'<span class="btn btn-secondary btn-sm disabled" aria-disabled="true">Próximamente</span>')+'</article>'}).join('')+'</div></div></section>';
  }

  /* ======================= MONTAJE ======================= */
  function mount(){
    var A=D.actual,De=D.destino,S=D.alcance;
    MT.filterable(document.getElementById('procTable'),{label:'Listado de procesos',noun:'procesos',search:function(r){return r.join(' ')},
      cols:[{l:'ID',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw',s:function(r){return r[0]}},{l:'Proceso',f:function(r){return E(r[1])},s:function(r){return r[1]}},{l:'Tipo',f:function(r){return MT.tipoChip(r[2])},s:function(r){return r[2]}},{l:'Área',f:function(r){return E(r[3])},s:function(r){return r[3]}},{l:'Descripción / alcance',f:function(r){return E(r[4])}}],
      rows:A.procesos,filters:[{label:'Tipo',get:function(r){return r[2]}},{label:'Área',get:function(r){return r[3]}}]});
    window.Charts.heat(document.getElementById('heatHost'),A.procesos,A.cobCols,A.cobertura);

    var hy=window.Charts.hype(document.getElementById('hypeHost'),De.tecnologias,function(i){var tr=document.querySelectorAll('#hypeTable tbody tr');tr.forEach(function(r,k){r.classList.toggle('hl',k===i)})});
    var ht=document.getElementById('hypeTable');
    ht.innerHTML=MT.table([{l:'#',f:function(r,i){return '<b>'+(i+1)+'</b>'},cls:'nw'},{l:'Tecnología o tendencia',f:function(r){return '<b>'+E(r[0])+'</b>'}},{l:'Relevancia para el caso',f:function(r){return E(r[1])}},{l:'Madurez',f:function(r){return E(r[2])}},{l:'¿Incorporar?',f:function(r){return MT.chip(r[3],r[3]==='Sí'?'ok':r[3]==='Evaluar'?'warn':'')},cls:'nw'}],De.tecnologias,{label:'Tecnologías',rowAttr:function(r,i){return 'data-i="'+i+'"'}});
    ht.addEventListener('mouseover',function(e){var tr=e.target.closest('tr[data-i]');if(tr){ht.querySelectorAll('tr.hl').forEach(function(x){x.classList.remove('hl')});tr.classList.add('hl');hy.hl(+tr.dataset.i)}});

    var rk=document.getElementById('riskTable');
    window.Charts.risk(document.getElementById('riskHost'),De.riesgos,function(n){var tr=rk.querySelector('#rrow-'+n);rk.querySelectorAll('tr.hl').forEach(function(x){x.classList.remove('hl')});if(tr){tr.classList.add('hl');tr.scrollIntoView({block:'center',behavior:'smooth'})}});
    MT.filterable(rk,{label:'Riesgos de la transformación',noun:'riesgos',search:function(r){return r.join(' ')},
      cols:[{l:'#',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw',s:function(r){return r[0]}},{l:'Riesgo',f:function(r){return E(r[1])}},{l:'Prob.',f:function(r){return r[2]},cls:'nw',s:function(r){return r[2]}},{l:'Impacto',f:function(r){return r[3]},cls:'nw',s:function(r){return r[3]}},{l:'Medida de mitigación',f:function(r){return E(r[4])}}],
      rows:De.riesgos,rowAttr:function(r){return 'id="rrow-'+r[0]+'"'},filters:[{label:'Probabilidad',get:function(r){return r[2]},values:['A','M','B']},{label:'Impacto',get:function(r){return r[3]},values:['A','M','B']}]});

    window.Gantt.mount(document.getElementById('ganttHost'),S);

    var gc={Promotores:'var(--q-promotores)',Latentes:'var(--q-latentes)',Defensores:'var(--q-defensores)',Apáticos:'var(--q-apaticos)'},gi={Promotores:'var(--q-promotores-ink)',Latentes:'var(--q-latentes-ink)',Defensores:'var(--q-defensores-ink)',Apáticos:'var(--q-apaticos-ink)'};
    var tbl=document.getElementById('stakeTable');
    var card=document.getElementById('sCard'),pinned=false;
    function showCard(n,keep){
      if(pinned&&!keep)return;pinned=!!keep;
      var s=S.stakeholders.filter(function(x){return x[0]===n})[0];
      card.innerHTML='<span class="chip" style="background:'+gc[s[2]]+';color:'+gi[s[2]]+'">'+s[2]+'</span><h4 style="margin-top:10px">'+s[0]+'. '+E(s[1])+'</h4><p class="small"><b>Poder / Interés:</b> '+E(s[3])+'<br><b>Actitud:</b> '+E(s[4])+'</p><p class="small"><b>Cómo lo afecta:</b> '+E(s[5])+'</p><p class="small" style="margin:0"><b>Estrategia:</b> '+E(s[6])+'</p>'+(keep?'<p class="small muted" style="margin:8px 0 0">Ficha fijada. Hacé clic en otro punto para cambiarla.</p>':'');
      tbl.querySelectorAll('tr.hl').forEach(function(x){x.classList.remove('hl')});var tr=tbl.querySelector('#srow-'+n);tr&&tr.classList.add('hl');
    }
    var sm=window.Charts.stake(document.getElementById('stakeMap'),S.stakeholders,function(n,keep){if(keep)pinned=false;showCard(n,keep)});
    MT.filterable(tbl,{label:'Matriz de stakeholders',noun:'stakeholders',search:function(r){return r.slice(0,7).join(' ')},
      cols:[{l:'#',f:function(r){return '<b>'+r[0]+'</b>'},cls:'nw',s:function(r){return r[0]}},{l:'Stakeholder',f:function(r){return E(r[1])},s:function(r){return r[1]}},{l:'Grupo',f:function(r){return '<span class="chip" style="background:'+gc[r[2]]+';color:'+gi[r[2]]+'">'+r[2]+'</span>'},s:function(r){return r[2]}},{l:'Poder / Interés',f:function(r){return E(r[3])},cls:'nw'},{l:'Actitud actual → buscada',f:function(r){return E(r[4])}},{l:'Cómo lo afecta',f:function(r){return E(r[5])}},{l:'Estrategia',f:function(r){return E(r[6])}}],
      rows:S.stakeholders,rowAttr:function(r){return 'id="srow-'+r[0]+'"'},filters:[{label:'Grupo',get:function(r){return r[2]}}]});
    window.__sm=sm;

    window.Charts.radar(document.getElementById('radarHost'),S.radar);
    MT.filterable(document.getElementById('projRisk'),{label:'Riesgos, supuestos y restricciones',noun:'ítems',search:function(r){return r.join(' ')},
      cols:[{l:'Tipo',f:function(r){return MT.chip(r[0],r[0]==='Riesgo'?'bad':r[0]==='Supuesto'?'':'warn')},cls:'nw',s:function(r){return r[0]}},{l:'Descripción',f:function(r){return E(r[1])}},{l:'Tratamiento',f:function(r){return E(r[2])}}],
      rows:S.riesgosProyecto,filters:[{label:'Tipo',get:function(r){return r[0]},values:['Restricción','Supuesto','Riesgo']}]});
  }

  function scenPanel(i){var s=D.brechas.escenarios[i];
    document.getElementById('scenPanel').innerHTML='<h4>Escenario '+s.n+' · '+E(s.cfg)+(s.sel?' <span class="badge">seleccionado</span>':'')+'</h4><p class="muted small">'+E(s.desc)+'</p><div class="two"><div><b>Fortalezas</b><p class="small">'+E(s.f)+'</p></div><div><b>Debilidades</b><p class="small">'+E(s.d)+'</p></div></div><p class="small" style="margin:0"><b>Viabilidad en Fan de Pan.</b> '+E(s.v)+'</p>';}

  function delegate(){
    var app=document.getElementById('casoApp'),$=function(id){return document.getElementById(id)};
    app.addEventListener('click',function(e){
      var b=e.target.closest('[data-act]');if(!b)return;var act=b.dataset.act;
      if(act==='org'){app.querySelectorAll('[data-act=org]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});$('orgInfo').innerHTML='<b>'+E(b.dataset.t)+'</b><br>'+E(b.dataset.d)}
      else if(act==='smart'){var s=D.empresa.smart[+b.dataset.i];app.querySelectorAll('[data-act=smart]').forEach(function(x){var on=x===b;x.setAttribute('aria-pressed',String(on));x.classList.toggle('sel',on)});$('smartPanel').innerHTML='<b>SMART '+s.n+' — '+E(s.obj)+'</b><p style="margin:8px 0 4px"><b>Indicador.</b> '+E(s.ind)+'</p><p style="margin:0"><b>Plazo.</b> '+E(s.plazo)+'</p>'}
      else if(act==='foda'){var on=b.getAttribute('aria-pressed')!=='true',f=$('foda');app.querySelectorAll('[data-act=foda]').forEach(function(x){x.setAttribute('aria-pressed','false')});f.querySelectorAll('li.on').forEach(function(x){x.classList.remove('on')});f.classList.remove('focus');
        if(on){var s=D.empresa.estrategias[+b.dataset.i];b.setAttribute('aria-pressed','true');f.classList.add('focus');Object.keys(s.m).forEach(function(k){s.m[k].forEach(function(i){var li=f.querySelector('li[data-q="'+k+'"][data-i="'+i+'"]');li&&li.classList.add('on')})});$('fodaInfo').innerHTML='<b>'+E(s.k)+' · '+E(s.n)+'.</b> '+E(s.t)}else{$('fodaInfo').innerHTML='<span class="muted">Elegí una estrategia para resaltar los ítems que combina.</span>'}}
      else if(act==='front'){b.setAttribute('aria-expanded',String(b.getAttribute('aria-expanded')!=='true'));var m=b.querySelector('.more');m.textContent=D.empresa.problematica.frentes[[].indexOf.call(b.parentNode.children,b)].d}
      else if(act==='pm'){app.querySelectorAll('[data-act=pm]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});var ids=b.dataset.ids.split(',');
        $('pmPanel').innerHTML='<b>'+E(b.firstChild.textContent)+'</b><ul style="margin:8px 0 0;padding-left:18px">'+D.actual.procesos.filter(function(r){return ids.indexOf(r[0])>-1}).map(function(r){return '<li><b>'+r[0]+'</b> '+E(r[1])+' — <span class="muted small">'+E(r[4])+' ('+E(r[3])+')</span></li>'}).join('')+'</ul>'}
      else if(act==='ae'){var k=b.dataset.k,ae=k==='actual'?D.actual.ae:D.destino.ae,r=+b.dataset.r,c=+b.dataset.c;app.querySelectorAll('[data-act=ae][data-k='+k+']').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
        $('aePanel-'+k).innerHTML='<b>'+ae.rows[r][0]+' · '+ae.cols[c]+'</b><ul style="margin:8px 0 0;padding-left:18px">'+ae.rows[r][1][c].map(function(x){return '<li>'+E(x)+'</li>'}).join('')+'</ul>'}
      else if(act==='chg'){var on2=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on2));$('grid-destino').classList.toggle('chg',on2)}
      else if(act==='flow'){var f=D.destino.flujo[+b.dataset.i];app.querySelectorAll('[data-act=flow]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});$('flowPanel').innerHTML='<b>'+f.n+' '+E(f.t)+'</b><br>'+E(f.d)}
      else if(act==='tab'){var i=b.dataset.i;app.querySelectorAll('[data-act=tab]').forEach(function(x){x.setAttribute('aria-selected',String(x===b))});app.querySelectorAll('[data-tp]').forEach(function(x){x.hidden=x.dataset.tp!==i})}
      else if(act==='scen'){app.querySelectorAll('[data-act=scen]').forEach(function(x){var on=x===b;x.setAttribute('aria-pressed',String(on))});scenPanel(+b.dataset.i)}
      else if(act==='sgrp'){app.querySelectorAll('[data-act=sgrp]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});window.__sm.filter(b.dataset.g)}
    });
    scenPanel(3);
  }

  function buildNav(){
    var nav=document.querySelector('#casoNav ol'),secs=document.querySelectorAll('#chapters > section');
    nav.innerHTML=[].map.call(secs,function(s){return '<li><a href="#'+s.id+'" class="'+(s.classList.contains('pend')?'pend':'')+'"><b>'+s.dataset.num+'</b><span>'+E(s.dataset.nav)+(s.classList.contains('pend')?' <small>(en elaboración)</small>':'')+'</span></a></li>'}).join('');
    var links=[].slice.call(nav.querySelectorAll('a'));
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+x.target.id)});var act=nav.querySelector('a.active');if(act&&act.scrollIntoView&&innerWidth<1280)act.scrollIntoView({inline:'center',block:'nearest'})}})},{rootMargin:'-30% 0px -60% 0px'});secs.forEach(function(s){io.observe(s)})}
  }

  window.initCaso=function(){
    if(rendered)return;rendered=true;
    var app=document.getElementById('chapters');
    try{
      app.innerHTML=[ch1(),ch2(),ch3(),ch4(),ch5()].join('')+D.pend.map(renderPend).join('')+closing();
      buildNav();mount();delegate();
      app.querySelectorAll('img[data-name]').forEach(window.fixImg);
      window.observeReveal(app);window.observeCounters(app);
    }catch(err){
      console.error(err);rendered=false;
      app.innerHTML='<div class="container"><div class="callout red"><strong>No pudimos cargar el contenido del caso.</strong> <button class="btn btn-secondary btn-sm" id="retryBtn">Reintentar</button></div></div>';
      document.getElementById('retryBtn').onclick=window.initCaso;
    }
    var pr=document.getElementById('progress'),bt=document.querySelector('.back-top');
    function sc(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;pr.style.width=(m>0?h.scrollTop/m*100:0)+'%';bt.classList.toggle('on',h.scrollTop>800)}
    addEventListener('scroll',sc,{passive:true});sc();
    bt.onclick=function(){scrollTo({top:0,behavior:'smooth'})};
  };
})();
