// Planta do Ryori vista de cima: o sushiman atrás da vitrine de peixe, o balcão de hinoki com 10 banquinhos,
// o salão com 8 mesas e, no Buganvília, a varanda. Planta ilustrativa: na versão final, os lugares vêm da casa.
// Usada pelo site (escolher o lugar) e pelo painel (ver quem senta onde).
(function(){
const NS='http://www.w3.org/2000/svg';
const CAP={m1:2,m2:2,m3:4,m4:4,m5:4,m6:6,m7:6,m8:8,v1:2,v2:4,v3:4,v4:6};
for(let i=1;i<=10;i++)CAP['b'+i]=1;
// posição de cada mesa: [x do centro, y do centro]
const POS={m1:[110,262],m2:[230,262],m3:[370,262],m4:[520,262],m5:[110,352],m6:[250,352],m7:[400,352],m8:[540,352],
           v1:[110,486],v2:[240,486],v3:[380,486],v4:[525,486]};
const larg=c=>({1:0,2:52,4:84,6:112,8:136}[c]);
function el(t,a,pai){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(pai)pai.appendChild(e);return e;}

window.Planta={CAP,
 nome(id,L){L=L||((p)=>p);return id[0]==='b'?L(`balcão, lugar ${id.slice(1)}`,`counter seat ${id.slice(1)}`):id[0]==='v'?L(`varanda, mesa ${id.slice(1)}`,`deck table ${id.slice(1)}`):L(`salão, mesa ${id.slice(1)}`,`dining room table ${id.slice(1)}`);},
 // estado(id) -> {k:'livre'|'ocupado'|'meu'|'fora', tag:'texto curto'}
 desenha(svg,{varanda,estado,aoTocar,L}){
  L=L||((p)=>p);
  const alto=varanda?560:420;svg.setAttribute('viewBox',`0 0 640 ${alto}`);svg.innerHTML='';
  const defs=el('defs',{},svg);
  const g1=el('linearGradient',{id:'hinoki',x1:0,y1:0,x2:0,y2:1},defs);el('stop',{offset:0,'stop-color':'#E6CFA8'},g1);el('stop',{offset:1,'stop-color':'#C6A574'},g1);
  el('rect',{x:0,y:0,width:640,height:alto,fill:'var(--chao)'},svg);
  // a cozinha do sushiman e a vitrine de peixe
  el('rect',{x:40,y:14,width:560,height:80,fill:'var(--cozinha)'},svg);
  el('rect',{x:70,y:84,width:500,height:14,rx:3,fill:'var(--vidro)',stroke:'var(--vidro-borda)'},svg);
  for(let i=0;i<9;i++)el('rect',{x:84+i*54,y:87,width:36,height:8,rx:2,fill:i%3===1?'#E8EDF0':i%3===2?'#B5462A':'#E96F3E',opacity:.85},svg);
  const s=el('g',{transform:'translate(320 48)'},svg);el('ellipse',{cx:0,cy:12,rx:26,ry:14,fill:'var(--sumi)'},s);el('circle',{cx:0,cy:-4,r:11,fill:'var(--sumi)'},s);el('rect',{x:-30,y:24,width:60,height:6,rx:2,fill:'#d9c3a0'},s);
  el('text',{x:56,y:40,class:'pl-rot'},svg).textContent=L('o sushiman','the sushi chef');
  // o balcão de hinoki
  el('rect',{x:40,y:100,width:560,height:40,rx:20,fill:'url(#hinoki)',stroke:'#a8875a'},svg);
  // banquinhos
  for(let i=1;i<=10;i++){const id='b'+i,x=40+56*(i-.5),y=176,e=estado(id);
   const g=el('g',{class:`pl-lugar ${e.k}`,'data-l':id,tabindex:['livre','meu','aguarda'].includes(e.k)?0:-1,role:'button','aria-label':Planta.nome(id,L)+(e.k==='ocupado'||e.k==='fora'?L(', indisponível',', unavailable'):'')+(e.tag?`, ${e.tag}`:''),'aria-pressed':e.k==='meu'},svg);
   el('circle',{cx:x,cy:y,r:26,fill:'transparent'},g);
   el('circle',{cx:x,cy:y,r:17,class:'pl-assento'},g);
   el('text',{x,y:y+5,'text-anchor':'middle',class:'pl-num'},g).textContent=e.tag||i;}
  // mesas com cadeiras
  const mesas=Object.keys(POS).filter(k=>k[0]==='m'||(varanda&&k[0]==='v'));
  if(varanda){el('line',{x1:20,y1:420,x2:620,y2:420,stroke:'var(--vidro-borda)','stroke-dasharray':'6 6','stroke-width':2},svg);
   el('text',{x:24,y:444,class:'pl-rot'},svg).textContent=L('varanda','deck');
   for(let i=0;i<11;i++)el('circle',{cx:40+i*58,cy:548,r:9,fill:'var(--planta)'},svg);}
  mesas.forEach(id=>{const [cx,cy]=POS[id],c=CAP[id],w=larg(c),h=40,e=estado(id);
   const g=el('g',{class:`pl-lugar pl-mesa ${e.k}`,'data-l':id,tabindex:['livre','meu','aguarda'].includes(e.k)?0:-1,role:'button','aria-label':Planta.nome(id,L)+`, ${c} ${L('lugares','seats')}`+(e.k==='ocupado'||e.k==='fora'?L(', indisponível',', unavailable'):'')+(e.tag?`, ${e.tag}`:''),'aria-pressed':e.k==='meu'},svg);
   const lado=c/2;for(let k=0;k<lado;k++){const px=cx-w/2+(w/lado)*(k+.5);el('rect',{x:px-9,y:cy-h/2-15,width:18,height:11,rx:4,class:'pl-cadeira'},g);el('rect',{x:px-9,y:cy+h/2+4,width:18,height:11,rx:4,class:'pl-cadeira'},g);}
   el('rect',{x:cx-w/2,y:cy-h/2,width:w,height:h,rx:4,class:'pl-assento'},g);
   el('text',{x:cx,y:cy+5,'text-anchor':'middle',class:'pl-num'},g).textContent=e.tag||(id[0]==='v'?`V${id.slice(1)}`:`${L('mesa','table')} ${id.slice(1)}`);});
  svg.onclick=ev=>{const g=ev.target.closest('.pl-lugar');if(g&&aoTocar)aoTocar(g.dataset.l);};
  svg.onkeydown=ev=>{const g=ev.target.closest('.pl-lugar');if(g&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();aoTocar&&aoTocar(g.dataset.l);}};
 }
};
})();
