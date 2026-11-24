// Ryori em 3D (three.js r128). Um nigiri que gira sozinho no escuro e a tábua de hinoki do sushiman, onde as peças caem.
// Peças desenhadas, ilustrativas: a evolução é trocar cada uma pelo prato real escaneado na cozinha.
window.Nigiri=(function(){
 if(!window.THREE)return {cria(){},liga(){},mesa(){}};
 const reduz=matchMedia('(prefers-reduced-motion: reduce)').matches,vivos={};
 const tex=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);return t;};
 const arrozTex=tex(256,256,(c,w,h)=>{c.fillStyle='#f3efe6';c.fillRect(0,0,w,h);for(let i=0;i<1100;i++){c.fillStyle=`rgba(${205+Math.random()*40|0},${200+Math.random()*40|0},${188+Math.random()*40|0},.85)`;c.beginPath();c.ellipse(Math.random()*w,Math.random()*h,5,2.2,Math.random()*3,0,7);c.fill();}});
 const peixeTex=(a,b,lista)=>tex(512,128,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,w,h);if(lista)for(let x=-60;x<w+60;x+=34){c.strokeStyle=lista;c.lineWidth=3.5;c.beginPath();c.moveTo(x,0);c.quadraticCurveTo(x+30,h/2,x+10,h);c.stroke();}});
 const MAT={arroz:new THREE.MeshStandardMaterial({map:arrozTex,roughness:.95}),
  salmao:new THREE.MeshPhysicalMaterial({map:peixeTex('#e4552a','#f37a44','rgba(255,226,206,.7)'),roughness:.35,clearcoat:.6}),
  atum:new THREE.MeshPhysicalMaterial({map:peixeTex('#9e1b2c','#c22c3c'),roughness:.4,clearcoat:.5}),
  branco:new THREE.MeshPhysicalMaterial({map:peixeTex('#efe6dc','#f7f1ea','rgba(220,200,190,.5)'),roughness:.35,clearcoat:.6}),
  nori:new THREE.MeshStandardMaterial({color:0x17201a,roughness:.8}),
  gyoza:new THREE.MeshStandardMaterial({color:0xe9cf9e,roughness:.7}),
  tosta:new THREE.MeshStandardMaterial({color:0xb77a3a,roughness:.6}),
  verde:new THREE.MeshStandardMaterial({color:0x5f8a3a,roughness:.7}),
  tigela:new THREE.MeshStandardMaterial({color:0x2a2622,roughness:.5,metalness:.1}),
  hinoki:new THREE.MeshStandardMaterial({map:tex(512,256,(c,w,h)=>{c.fillStyle='#d9bd8f';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=3){c.strokeStyle=`rgba(150,110,60,${.06+Math.random()*.08})`;c.beginPath();c.moveTo(0,y);c.bezierCurveTo(w*.3,y+Math.random()*6-3,w*.6,y+Math.random()*6-3,w,y);c.stroke();}}),roughness:.75})};
 function nigiri(peixe){const g=new THREE.Group();const a=new THREE.Mesh(new THREE.SphereGeometry(1,32,20),MAT.arroz);a.scale.set(1.5,.6,.82);g.add(a);
  const geo=new THREE.BoxGeometry(3.3,.24,1.5,32,1,8),p=geo.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);p.setY(i,p.getY(i)-.15*x*x-.1*z*z+.64);}geo.computeVertexNormals();
  g.add(new THREE.Mesh(geo,MAT[peixe]||MAT.salmao));return g;}
 function maki(peixe){const g=new THREE.Group();const n=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,1.1,28),MAT.nori);g.add(n);
  const a=new THREE.Mesh(new THREE.CylinderGeometry(.78,.78,1.12,28),MAT.arroz);g.add(a);const c=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,1.14,16),MAT[peixe]||MAT.salmao);g.add(c);g.position.y=.55;return g;}
 function gyoza(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(1,24,12,0,Math.PI*2,0,Math.PI/2),MAT.gyoza);m.scale.set(1.3,.7,.6);g.add(m);const t=new THREE.Mesh(new THREE.CylinderGeometry(1.25,1.25,.06,24),MAT.tosta);t.scale.set(1,1,.48);g.add(t);return g;}
 function tigela(verde){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(1.1,.7,.8,32,1,true),MAT.tigela);b.material.side=THREE.DoubleSide;b.position.y=.4;g.add(b);
  const f=new THREE.Mesh(new THREE.CylinderGeometry(1.02,1.02,.1,32),verde?MAT.verde:MAT.tosta);f.position.y=.62;g.add(f);return g;}
 function peca(item){const n=(item.n||'').toLowerCase(),t=item.t||[];
  const peixe=/atum|tuna|maguro/.test(n)?'atum':/vieira|scallop|polvo|tako|shiromi/.test(n)?'branco':'salmao';
  if(/edamame|pepino|shimeji|corn|missoshiru/.test(n))return tigela(/edamame|pepino/.test(n));
  if(/gyoza|harumaki|kfc|shrimp|rock/.test(n))return gyoza();
  if(/roll|cone|taco|crispy|chilli/.test(n))return maki(peixe);
  return nigiri(peixe);}
 function cena(box,zoom){
  const r=new THREE.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(2,devicePixelRatio));box.prepend(r.domElement);
  const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(zoom?34:32,1,.1,200);
  sc.add(new THREE.HemisphereLight(0xfff1df,0x100904,zoom?.38:.7));const sol=new THREE.SpotLight(0xffe2c2,zoom?.62:1.1,0,.7,.6);sol.position.set(3,12,6);sc.add(sol);
  const rim=new THREE.DirectionalLight(0xffc89a,.9);rim.position.set(6,7,-5);sc.add(rim);
  const raiz=new THREE.Group();sc.add(raiz);
  const tam=()=>{const w=box.clientWidth,h=box.clientHeight;if(!w||!h)return;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();};tam();addEventListener('resize',tam);
  let arr=null,vis=true,caindo=[];
  box.addEventListener('pointerdown',e=>{arr=e.clientX;});box.addEventListener('pointermove',e=>{if(arr===null)return;raiz.rotation.y+=(e.clientX-arr)*.01;arr=e.clientX;});addEventListener('pointerup',()=>arr=null);
  new IntersectionObserver(([e])=>vis=e.isIntersecting).observe(box);
  const v={r,sc,cam,raiz,tam,caindo,zoom};
  (function loop(t){if(vis){if(!reduz&&arr===null)raiz.rotation.y+=zoom?.0025:.006;
    caindo.forEach(c=>{const k=Math.min(1,(t-c.t0)/650);const e=1-Math.pow(1-k,3);c.o.position.y=c.y+(1-e)*6;c.o.rotation.z=(1-e)*.6;});
    if(!zoom)raiz.position.y=Math.sin(t/900)*.04;r.render(sc,cam);}requestAnimationFrame(loop);})(0);
  return v;}
 return {
  cria(box){if(!box||vivos[box.id])return;const v=cena(box,false);v.cam.position.set(0,3.4,9.6);v.cam.lookAt(0,-.15,0);
   const n=nigiri('salmao');v.raiz.add(n);const pr=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.35,.14,64),MAT.tigela);pr.position.y=-.62;v.raiz.add(pr);v.raiz.rotation.y=-.6;vivos[box.id]=v;},
  liga(id){const b=document.getElementById(id);if(vivos[id]){setTimeout(vivos[id].tam,80);return;}
   setTimeout(()=>{const v=cena(b,true);v.cam.position.set(0,12.5,11.5);v.cam.lookAt(0,-.6,0);
    MAT.hinoki.color=new THREE.Color(0x6a543b);const tabua=new THREE.Mesh(new THREE.BoxGeometry(13,.5,7),MAT.hinoki);tabua.position.y=-.25;v.raiz.add(tabua);
    [-6,6].forEach(x=>{const p=new THREE.Mesh(new THREE.BoxGeometry(.8,.7,7.5),MAT.hinoki);p.position.set(x,-.85,0);v.raiz.add(p);});
    v.pecas=new THREE.Group();v.raiz.add(v.pecas);vivos[id]=v;if(this._fila)this.mesa(this._fila);},160);},
  mesa(linhas){this._fila=linhas;const v=vivos.palco;if(!v||!v.pecas)return;
   while(v.pecas.children.length)v.pecas.remove(v.pecas.children[0]);v.caindo.length=0;
   const itens=[];linhas.forEach(({i,q})=>{for(let k=0;k<q;k++)itens.push(i);});
   const cols=Math.min(5,Math.max(3,Math.ceil(Math.sqrt(itens.length*1.6)))),rows=Math.ceil(itens.length/cols),esc=Math.min(.85,3.4/Math.max(cols,rows));
   const t0=performance.now();
   itens.forEach((it,k)=>{const o=peca(it);o.scale.multiplyScalar(esc);const c=k%cols,rr=k/cols|0;
    const x=(c-(cols-1)/2)*(11.5/cols),z=(rr-(rows-1)/2)*(5.8/Math.max(rows,1.6));o.position.set(x,0,z);o.rotation.y=(Math.random()-.5)*.5;
    v.pecas.add(o);if(!reduz)v.caindo.push({o,y:0,t0:t0+k*110});});}
 };
})();
