// Reserva do Ryori, a mesma no site e na bio. Uma triagem: uma pergunta por vez,
// casa → dia → almoço ou jantar → horário → pessoas → lugar na planta → contato. A ficha ao lado guarda as respostas.
// Termina com a plaquinha de madeira do balcão. Grava em Reservas (comum.js), com o lugar, para o painel da equipe.
// Uso: const r=Reserva.monta(el,{origem:'site'}); r.mesa('2× …',2); r.reinicia();
(function(){
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cap=t=>t?t[0].toUpperCase()+t.slice(1):t;
const fmtDia=x=>`${(lang==='en'?DAYS:DIAS)[x.wd]}, ${x.dt.getDate()}/${x.dt.getMonth()+1}`;
const PASSOS=[['casa','Casa','House'],['dia','Dia','Day'],['turno','Refeição','Meal'],['hora','Horário','Time'],['pes','Pessoas','Guests'],['lugar','Lugar','Seat'],['quem','Contato','Contact']];
const TOT=PASSOS.length;
window.Reserva={monta(raiz,opc){
  opc=opc||{};
  const CH=MARCA.id+'-casa';
  const B={passo:1,casa:null,dia:null,turno:null,hora:null,pessoas:null,lugar:null,mesa:'',nome:'',zap:''};
  {let u=null;try{u=localStorage.getItem(CH)}catch(e){}const q=new URLSearchParams(location.search).get('casa');B.casa=unidade(q)?q:unidade(u)?u:MARCA.unidades[0].id;}
  const U=()=>unidade(B.casa);
  const dias=()=>{const {d}=agoraFortaleza(),h=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Fortaleza'}));return [...Array(10)].map((_,k)=>{const dt=new Date(h);dt.setDate(h.getDate()+k);return {k,wd:(d+k)%7,dt};});};
  const horas=x=>{const {m}=agoraFortaleza(),o=[];U().hor[x.wd].forEach(([a,b])=>{for(let t=a;t<=b-60;t+=30){if(x.k===0&&t<m+30)continue;o.push(t);}});return o;};
  const turnos=x=>{const hs=horas(x);return {almoco:hs.filter(t=>t<960),jantar:hs.filter(t=>t>=960)};};
  const ocupado=id=>{const s=`${B.casa}|${B.dia}|${B.hora}|${id}`;let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h%10<4;};
  const par=()=>B.lugar&&B.lugar[0]==='b'&&B.pessoas===2?'b'+(+B.lugar.slice(1)+1):null;
  const est=id=>{const n=B.pessoas;if(id===B.lugar||id===par())return {k:'meu'};if(ocupado(id))return {k:'ocupado'};
    if(id[0]==='b'){if(n>2)return {k:'fora'};if(n===2){const i=+id.slice(1);if(i===10||ocupado('b'+(i+1)))return {k:'fora'};}return {k:'livre'};}
    const c=Planta.CAP[id];return c<n||c>n+2?{k:'fora'}:{k:'livre'};};
  const zapOk=()=>{const d=B.zap.replace(/\D/g,'').replace(/^55(?=\d{11}$)/,'');return d.length===11&&d[2]==='9';};
  const estTxt=u=>{const s=estadoUnidade(u);return s.k==='aberta'?L(`aberta até ${hm(s.ate)}`,`open until ${hm(s.ate)}`):s.k==='pausa'?L(`volta às ${hm(s.abre)}`,`back at ${hm(s.abre)}`):s.k==='antes'?L(`abre às ${hm(s.abre)}`,`opens at ${hm(s.abre)}`):L(`abre amanhã, ${hm(s.abre)}`,`opens tomorrow, ${hm(s.abre)}`);};
  const valor=k=>{const ds=dias();return k==='casa'?U().nome:k==='dia'&&B.dia!==null?fmtDia(ds[B.dia]):k==='turno'&&B.turno?(B.turno==='almoco'?L('Almoço','Lunch'):L('Jantar','Dinner')):k==='hora'&&B.hora!==null?hm(B.hora):k==='pes'&&B.pessoas?String(B.pessoas):k==='lugar'&&B.lugar?cap(Planta.nome(B.lugar,L))+(par()?L(' e o vizinho',' and the next one'):''):'';};
  raiz.innerHTML=`<div class="tri${opc.compacto?' compacto':''}"><aside class="ficha-r"><p class="rot" style="color:var(--creme-2)">${L('Sua reserva','Your booking')}</p><ol></ol><p class="mesa-s"></p></aside><div class="etapa" aria-live="polite"></div></div>`;
  const $=s=>raiz.querySelector(s);
  const cab=(t,d)=>`<p class="rot n">${L(`Passo ${B.passo} de ${TOT}`,`Step ${B.passo} of ${TOT}`)}</p><h3 class="titulo">${t}</h3>${d?`<p class="corrido-p">${d}</p>`:''}`;
  const voltar=()=>B.passo>1?`<button type="button" class="fantasma" data-ir="${B.passo-1}">${L('Voltar','Back')}</button>`:'';
  function pinta(){
    const ds=dias();let h='';
    $('.ficha-r').hidden=B.passo>TOT;$('.tri').classList.toggle('fim',B.passo>TOT);
    $('.ficha-r ol').innerHTML=PASSOS.map(([k,p,e],i)=>{const n=i+1,v=valor(k),ok=n<B.passo&&B.passo<=TOT;
      return ok?`<li class="ok"><button type="button" data-ir="${n}"><span>${L(p,e)}</span><span>${esc(v)}</span></button></li>`:`<li class="${n===B.passo?'agora':''}"><span class="l"><span>${L(p,e)}</span></span></li>`;}).join('');
    $('.mesa-s').textContent=B.mesa?L('Com a mesa sugerida pelo sushiman.','With the chef’s suggested table.'):'';
    if(B.passo===1)h=cab(L('Em qual casa?','Which house?'),L('As duas têm balcão de frente para o sushiman.','Both have a counter facing the sushi chef.'))+`<div class="opcoes">${MARCA.unidades.map(u=>`<button type="button" class="opcao" data-casa="${u.id}" aria-pressed="${B.casa===u.id}"><b>${u.nome}</b><small>${estTxt(u)}</small><span>${u.end}</span></button>`).join('')}</div>`;
    if(B.passo===2)h=cab(L('Para que dia?','Which day?'),'')+`<div class="fichas">${ds.map(x=>{const v=!horas(x).length;return `<button type="button" class="fantasma" data-dia="${x.k}" aria-pressed="${B.dia===x.k}" ${v?'disabled':''}>${x.k===0?L('Hoje','Today'):x.k===1?L('Amanhã','Tomorrow'):(lang==='en'?DAYS:DIAS)[x.wd].slice(0,3)}<small>${x.dt.getDate()}/${x.dt.getMonth()+1}</small></button>`;}).join('')}</div>`;
    if(B.passo===3){const t=turnos(ds[B.dia]);h=cab(L('Almoço ou jantar?','Lunch or dinner?'),`${fmtDia(ds[B.dia])}, Ryori ${U().nome}.`)+`<div class="opcoes">${[['almoco','Almoço','Lunch'],['jantar','Jantar','Dinner']].map(([k,p,e])=>{const l=t[k];return `<button type="button" class="opcao" data-turno="${k}" aria-pressed="${B.turno===k}" ${l.length?'':'disabled'}><b>${L(p,e)}</b><small>${l.length?`${hm(l[0])} ${L('a','to')} ${hm(l[l.length-1])}`:L('Sem horário neste dia','No times this day')}</small></button>`;}).join('')}</div>`;}
    if(B.passo===4){const l=turnos(ds[B.dia])[B.turno]||[];h=cab(L('Que horas?','What time?'),`${fmtDia(ds[B.dia])}, ${B.turno==='almoco'?L('almoço','lunch'):L('jantar','dinner')}.`)+`<div class="fichas">${l.map(x=>`<button type="button" class="fantasma" data-hora="${x}" aria-pressed="${B.hora===x}">${hm(x)}</button>`).join('')}</div>`;}
    if(B.passo===5)h=cab(L('Quantas pessoas?','How many guests?'),L('Contando com você. Para 9 ou mais, fale direto com a casa.','Including you. For 9 or more, contact the house directly.'))+`<div class="fichas">${[1,2,3,4,5,6,7,8].map(n=>`<button type="button" class="fantasma" data-pes="${n}" aria-pressed="${B.pessoas===n}">${n}</button>`).join('')}</div>`;
    if(B.passo===6)h=cab(L('Onde vocês sentam?','Where will you sit?'),B.pessoas<=2?L('No balcão, de frente para o sushiman, ou numa mesa. Os lugares acesos estão livres.','At the counter, facing the sushi chef, or at a table. Lit seats are free.'):L(`Para ${B.pessoas}, escolha uma mesa. As acesas estão livres.`,`For ${B.pessoas}, pick a table. Lit ones are free.`))+
      `<div class="planta-caixa"><svg class="pl" role="group" aria-label="${L('Planta da casa: balcão, salão e varanda','Floor plan: counter, dining room and deck')}"></svg></div><p class="escolha"></p><p class="micro">${L('Planta ilustrativa: na versão final, os lugares e a ocupação vêm da agenda da casa.','Illustrative plan: in the final version, seats and availability come from the house’s book.')}</p>`;
    if(B.passo===7){const x=ds[B.dia];h=cab(L('Em nome de quem?','Under what name?'),L('A confirmação e o lembrete chegam neste WhatsApp.','Confirmation and reminder go to this WhatsApp.'))+
      `<label class="campo"><span>${L('Nome','Name')}</span><input data-c="nome" autocomplete="name" value="${esc(B.nome)}"></label><label class="campo"><span>WhatsApp</span><input data-c="zap" type="tel" inputmode="tel" autocomplete="tel" placeholder="(85) 9 0000-0000" value="${esc(B.zap)}"></label><p class="erro"></p>
       <div class="resumo-e"><b>Ryori ${esc(U().nome)}</b>${fmtDia(x)}, ${hm(B.hora)} · ${B.pessoas} ${B.pessoas>1?L('pessoas','guests'):L('pessoa','guest')}<br>${esc(cap(Planta.nome(B.lugar,L)))}${par()?L(', com o vizinho',', with the next one'):''}${B.lugar[0]==='b'||B.pessoas>=6?`<br><span style="color:var(--creme-3)">${L('Esse pedido a equipe confirma pelo WhatsApp.','The team confirms this one on WhatsApp.')}</span>`:''}</div>`;}
    if(B.passo===8)h=B.feito||'';
    const pe=B.passo<=TOT&&B.passo>1?`<div class="pe-e">${voltar()}${B.passo===6?`<button type="button" class="btn" data-ir="7" ${B.lugar?'':'disabled'}>${L('Continuar','Continue')}</button>`:''}${B.passo===7?`<button type="button" class="btn ok-r" ${B.nome.trim().length>1&&zapOk()?'':'disabled'}>${L('Reservar este lugar','Book this seat')}</button>`:''}${B.passo===5?`<a class="sub" href="https://wa.me/${(window.ZAP||{})[B.casa]||''}?text=${encodeURIComponent(L(`Olá! Quero reservar no Ryori ${U().nome} para um grupo de 9 ou mais.`,`Hello! I'd like to book Ryori ${U().nome} for 9 or more.`))}" target="_blank" rel="noopener">${L('9 ou mais: falar com a casa','9 or more: talk to the house')}</a>`:''}</div>`:'';
    const el=$('.etapa');el.innerHTML=h+pe;el.style.animation='none';void el.offsetWidth;el.style.animation='';
    if(B.passo===6){Planta.desenha($('.pl'),{varanda:B.casa==='buganvilia',L,estado:est,aoTocar:id=>{if(est(id).k==='livre'){B.lugar=id;pinta();}}});
      $('.escolha').textContent=B.lugar?cap(Planta.nome(B.lugar,L))+(par()?L(', com o vizinho.',', with the next one.'):'.'):B.pessoas>2?L('Toque numa mesa acesa.','Tap a lit table.'):L('Toque num banquinho do balcão ou numa mesa.','Tap a counter stool or a table.');}}
  const vai=n=>{B.passo=n;pinta();const r=$('.etapa').getBoundingClientRect(),c=raiz.closest('.corpo-m');
    if(c){c.scrollTop=0;return;}if(r.top<70||r.top>innerHeight*.55)scrollTo({top:scrollY+r.top-110,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  const segue=n=>setTimeout(()=>vai(n),170);
  raiz.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
    if(d.ir){vai(+d.ir);return;}
    if(d.casa){if(B.casa!==d.casa){B.casa=d.casa;B.turno=null;B.hora=null;B.lugar=null;try{localStorage.setItem(CH,B.casa)}catch(e){}if(B.dia!==null&&!horas(dias()[B.dia]).length)B.dia=null;opc.aoTrocarCasa&&opc.aoTrocarCasa(B.casa);}pinta();segue(2);return;}
    if(d.dia!==undefined){if(B.dia!==+d.dia){B.dia=+d.dia;B.turno=null;B.hora=null;B.lugar=null;}pinta();segue(3);return;}
    if(d.turno){if(B.turno!==d.turno){B.turno=d.turno;B.hora=null;B.lugar=null;}pinta();segue(4);return;}
    if(d.hora){if(B.hora!==+d.hora){B.hora=+d.hora;B.lugar=null;}pinta();segue(5);return;}
    if(d.pes){if(B.pessoas!==+d.pes){B.pessoas=+d.pes;B.lugar=null;}pinta();segue(6);return;}
    if(b.classList.contains('ok-r'))envia();
    if(b.classList.contains('outra'))api.reinicia(true);});
  raiz.addEventListener('input',e=>{const c=e.target.dataset.c;if(!c)return;B[c]=e.target.value;$('.erro').textContent=B.zap&&!zapOk()?L('Use o celular com DDD: (85) 9 0000-0000.','Use a mobile number with area code.'):'';const ok=$('.ok-r');if(ok)ok.disabled=!(B.nome.trim().length>1&&zapOk());});
  function envia(){
    const x=dias()[B.dia],u=U(),nome=B.nome.trim(),zap=B.zap,balcao=B.lugar[0]==='b';
    const codigo=MARCA.prefixo+'-'+u.sigla+String(x.dt.getDate()).padStart(2,'0')+String(B.hora/30|0).padStart(2,'0')+'-'+Math.random().toString(36).slice(2,5).toUpperCase();
    const ini=new Date(x.dt);ini.setHours(B.hora/60|0,B.hora%60,0,0);
    const lugar=Planta.nome(B.lugar),motivos=[];if(balcao)motivos.push('lugar no balcão do sushiman');if(B.pessoas>=6)motivos.push(`grupo de ${B.pessoas}`);
    Reservas.nova({codigo,casa:u.id,criada:new Date().toISOString(),inicio:ini.toISOString(),dia:fmtDia(x),hora:hm(B.hora),pessoas:B.pessoas,ocasiao:'',pedidos:[lugar],lugar:B.lugar,lugarPar:par(),mesa:B.mesa,obs:'',nome,zap,status:motivos.length?'aguardando':'confirmada',motivos,origem:opc.origem||'site'});
    const msg=[`Olá! Reserva no Ryori ${u.nome}.`,`Dia: ${fmtDia(x)}`,`Horário: ${hm(B.hora)}`,`Pessoas: ${B.pessoas}`,`Lugar: ${lugar}`,B.mesa?`Pedido sugerido: ${B.mesa}`:'',`Nome: ${nome}`,`Código: ${codigo}`].filter(Boolean).join('\n');
    const fimH=new Date(ini.getTime()+2*3600e3),fz=d=>`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`;
    const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Ryori//PT\r\nBEGIN:VEVENT\r\nUID:${codigo}@ryori\r\nDTSTART;TZID=America/Fortaleza:${fz(ini)}\r\nDTEND;TZID=America/Fortaleza:${fz(fimH)}\r\nSUMMARY:Ryori ${u.nome}, ${lugar}\r\nLOCATION:${u.end}, Fortaleza\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const num=B.lugar.slice(1)+(par()?'·'+par().slice(1):''),tipo=B.lugar[0]==='b'?L('balcão','counter'):B.lugar[0]==='v'?L('varanda','deck'):L('mesa','table');
    B.feito=`<div class="feito"><div class="par"><div class="placa" aria-hidden="true"><b>${num}</b><span>${tipo}</span><small>${codigo}</small></div><div><h3>${motivos.length?L('Pedido recebido.','Request received.'):L('Seu lugar está guardado.','Your seat is saved.')}</h3>
     <p class="corrido-p">Ryori ${esc(u.nome)}, ${fmtDia(x)}, ${hm(B.hora)}. ${esc(cap(Planta.nome(B.lugar,L)))}.${motivos.length?L(' A equipe confirma pelo WhatsApp.',' The team confirms on WhatsApp.'):''}</p>
     <div class="acoes"><a class="fantasma" download="ryori.ics" href="data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}">${L('Pôr na agenda','Add to calendar')}</a><a class="fantasma" href="${u.mapa}" target="_blank" rel="noopener">${L('Como chegar','Directions')}</a><button type="button" class="sub outra">${L('Fazer outra reserva','Make another booking')}</button></div>
     </div></div><p class="msg">${L('Reserva de demonstração: nada foi enviado. A ficha apareceu no painel da equipe, neste navegador. No ar, a casa recebe:','Demo booking: nothing was sent. On the live site, the restaurant gets:')}\n\n${esc(msg)}</p></div>`;
    vai(8);}
  const api={mesa(txt,pessoas){B.mesa=txt;B.pessoas=Math.min(8,pessoas);B.lugar=null;B.passo=B.hora!==null?6:1;pinta();},
    reinicia(forca){if(B.passo===8||forca){Object.assign(B,{passo:1,turno:null,hora:null,lugar:null,mesa:''});}pinta();},pinta};
  pinta();
  return api;
}};
})();
