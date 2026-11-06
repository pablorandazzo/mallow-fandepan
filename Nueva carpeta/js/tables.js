/* Tablas: render simple, filtrables y ordenables */
(function(){
  var E=window.esc;
  var MT=window.MT={};
  MT.chip=function(txt,cls){return '<span class="chip '+(cls||'')+'">'+E(txt)+'</span>'};
  MT.tipoChip=function(t){var m={'Estratégico':'t-estrategico','Operativo':'t-operativo','Soporte':'t-soporte'};return MT.chip(t,m[t]||'')};
  MT.prioChip=function(p){var l=String(p).toLowerCase();var c=l.indexOf('must')>-1?'must':l.indexOf('should')>-1?'should':l.indexOf('could')>-1?'could':'';return MT.chip(p,c)};
  MT.estadoChip=function(s){return MT.chip(s,/complet/i.test(s)?'ok':'warn')};
  /* cols: [{l, f:(row,i)=>html, cls, s:(row)=>sortValue}] */
  MT.table=function(cols,rows,opt){
    opt=opt||{};var cards=cols.length<=4;
    var h='<div class="table-wrap" tabindex="0" role="region" aria-label="'+E(opt.label||'Tabla')+'"><table class="tbl'+(cards?' cards':'')+'"><thead><tr>';
    cols.forEach(function(c,i){h+='<th scope="col"'+(c.s?' data-sort="'+i+'" tabindex="0"':'')+'>'+E(c.l)+'</th>'});
    h+='</tr></thead><tbody>';
    if(!rows.length)h+='<tr><td colspan="'+cols.length+'" class="empty">Sin resultados</td></tr>';
    rows.forEach(function(r,ri){
      h+='<tr'+(opt.rowAttr?' '+opt.rowAttr(r,ri):'')+'>';
      cols.forEach(function(c){h+='<td data-label="'+E(c.l)+'"'+(c.cls?' class="'+c.cls+'"':'')+'>'+c.f(r,ri)+'</td>'});
      h+='</tr>'});
    return h+'</tbody></table></div>';
  };
  /* cfg: {cols, rows, filters:[{label, get, all}], search:(row)=>string, noun, label, rowAttr} */
  MT.filterable=function(el,cfg){
    var state={q:'',f:{},sort:-1,dir:1};
    var opts=cfg.filters||[];
    var tb='<div class="toolbar no-print">';
    if(cfg.search)tb+='<input type="search" placeholder="Buscar…" aria-label="Buscar" data-q>';
    opts.forEach(function(f,i){
      var vals=f.values||Array.from(new Set(cfg.rows.map(f.get)));
      tb+='<select aria-label="'+E(f.label)+'" data-f="'+i+'"><option value="">'+E(f.label)+': todos</option>'+vals.map(function(v){return '<option>'+E(v)+'</option>'}).join('')+'</select>'});
    tb+='<span class="count" aria-live="polite"></span></div><div class="tbl-host"></div>';
    el.innerHTML=tb;
    var host=el.querySelector('.tbl-host'),cnt=el.querySelector('.count');
    function draw(){
      var rows=cfg.rows.filter(function(r){
        if(state.q&&cfg.search(r).toLowerCase().indexOf(state.q)<0)return false;
        for(var i in state.f){if(state.f[i]&&String(opts[i].get(r))!==state.f[i])return false}
        return true});
      if(state.sort>=0){var s=cfg.cols[state.sort].s;rows=rows.slice().sort(function(a,b){var x=s(a),y=s(b);return (x>y?1:x<y?-1:0)*state.dir})}
      host.innerHTML=MT.table(cfg.cols,rows,cfg);
      cnt.textContent=rows.length+' de '+cfg.rows.length+' '+(cfg.noun||'resultados');
      host.querySelectorAll('th[data-sort]').forEach(function(th){
        var i=+th.dataset.sort;if(i===state.sort)th.setAttribute('aria-sort',state.dir>0?'ascending':'descending');
        var go=function(){state.dir=state.sort===i?-state.dir:1;state.sort=i;draw()};
        th.addEventListener('click',go);th.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
      if(cfg.onDraw)cfg.onDraw(host);
    }
    el.addEventListener('input',function(e){if(e.target.hasAttribute('data-q')){state.q=e.target.value.trim().toLowerCase();draw()}});
    el.addEventListener('change',function(e){if(e.target.hasAttribute('data-f')){state.f[e.target.dataset.f]=e.target.value;draw()}});
    draw();
  };
})();
