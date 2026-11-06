/* Gantt interactivo — Fase A (semanas) / Fase B (meses) */
(function(){
  var E=window.esc;
  function todayDate(){var c=(window.CONFIG||{}).today;return c?new Date(c+'T12:00:00'):new Date()}
  function build(el,rows,heads,opt){
    var n=heads.length,cw=opt.cw||56;
    var h='<div class="gantt-scroll" tabindex="0" role="region" aria-label="'+E(opt.label)+'"><div class="gantt" style="--n:'+n+';--cw:'+cw+'px"><div class="gh" style="position:sticky;left:0;z-index:4">Actividad</div>';
    heads.forEach(function(x){h+='<div class="gh">'+x+'</div>'});
    rows.forEach(function(r){
      if(r.g){h+='<div class="gg">'+E(r.g)+'</div>';return}
      h+='<div class="gl"><b>'+E(r.id)+'</b><span>'+E(r.label)+'</span></div>';
      for(var c=1;c<=n;c++){
        var inb=c>=r.from&&c<=r.to;
        var ms=(r.m||[]).filter(function(m){return m.c===c});
        h+='<div class="gc">'+(inb?'<span class="gbar'+(r.cont?' cont':'')+'"></span>':'')+
          ms.map(function(m){return '<button class="ms" data-tip="'+E(m.t)+'" aria-label="Hito: '+E(m.t)+'">◆</button>'}).join('')+'</div>';
      }
    });
    var td='';
    if(opt.todayX!=null)td='<div class="today" style="left:calc(280px + '+opt.todayX+' * var(--cw))"><span>hoy</span></div>';
    h+=td+'</div></div>';
    h+='<div class="legend"><span><i style="background:var(--gantt-bar)"></i>Actividad</span><span><i style="background:var(--gantt-bar-cont);border:1px dashed var(--gantt-bar)"></i>Actividad continua</span><span>◆ Hito (con fecha y entregable)</span>'+(opt.todayX!=null?'<span><i style="background:#C0392B;width:3px"></i>Hoy</span>':'')+'</div>';
    return h;
  }
  window.Gantt={
    mount:function(el,A){
      var wrap=document.createElement('div');
      el.innerHTML='<div class="no-print" style="margin:16px 0"><div class="seg" role="group" aria-label="Fase del cronograma"><button aria-pressed="true" data-p="A">Fase A · semanas</button><button aria-pressed="false" data-p="B">Fase B · meses</button></div></div><div class="g-host"></div>';
      var host=el.querySelector('.g-host');
      function draw(p){
        el.querySelectorAll('.seg button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.p===p))});
        if(p==='A'){
          var heads=A.semanas.map(function(s,i){return 'S'+(i+1)+'<br><span style="font-weight:400">'+s+'</span>'});
          var start=new Date(A.semanasISO[0]+'T12:00:00'),t=todayDate();
          var x=(t-start)/(7*864e5),tx=(x>=0&&x<=16)?x:null;
          host.innerHTML=build(el,A.ganttA,heads,{label:'Gantt Fase A, semanas',todayX:tx});
        }else{
          var hb=[];for(var i=1;i<=12;i++)hb.push('M'+i);
          host.innerHTML=build(el,A.ganttB,hb,{label:'Gantt Fase B, meses desde la adjudicación',cw:64});
        }
        var note=el.querySelector('.g-note');if(note)note.remove();
        var d=document.createElement('p');d.className='small muted g-note';
        d.textContent=p==='A'?A.ganttNota:A.ganttBTxt+' Fase B fuera del alcance (EX4).';
        host.appendChild(d);
      }
      el.querySelector('.seg').addEventListener('click',function(e){var b=e.target.closest('button');if(b)draw(b.dataset.p)});
      draw('A');
    }
  };
})();
