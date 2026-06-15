/* ══════════════════════════════════════
   NayePankh Foundation – script.js
══════════════════════════════════════ */

/* ── Page Loader ── */
setTimeout(()=>{
  gsap.to('#page-loader',{opacity:0,duration:0.6,delay:1.4,onComplete:()=>{
    document.getElementById('page-loader').style.display='none';
  }});
},0);

/* ── Feather Cursor ── */
const cur=document.getElementById('cursor');
const fol=document.getElementById('cursor-follower');
let mx=0,my=0,fx=0,fy=0,pmx=0,pmy=0,velX=0,velY=0;
document.addEventListener('mousemove',e=>{
  velX=e.clientX-pmx; velY=e.clientY-pmy;
  pmx=mx; pmy=my;
  mx=e.clientX; my=e.clientY;
  const speed=Math.sqrt(velX*velX+velY*velY);
  const tilt=Math.min(speed*0.4,20);
  cur.style.left=(mx-18)+'px'; cur.style.top=(my-18)+'px';
  cur.style.transform=`rotate(${-35+tilt}deg) scale(${1+speed*0.01})`;
  cur.style.filter=`drop-shadow(0 0 ${6+speed*0.3}px rgba(0,207,255,${Math.min(1,0.7+speed*0.01)}))`;
});
(function animFol(){
  fx+=(mx-fx)*0.14; fy+=(my-fy)*0.14;
  fol.style.left=fx+'px'; fol.style.top=fy+'px';
  requestAnimationFrame(animFol);
})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.classList.add('hovering');
    fol.style.width='12px'; fol.style.height='12px'; fol.style.opacity='1';
  });
  el.addEventListener('mouseleave',()=>{
    cur.classList.remove('hovering');
    fol.style.width='6px'; fol.style.height='6px'; fol.style.opacity='0.7';
  });
});

/* ── Three.js Particle Background ── */
const canvas=document.getElementById('bg-canvas');
const renderer=new THREE.WebGLRenderer({canvas,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth,window.innerHeight);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=5;

/* Stars */
const starGeo=new THREE.BufferGeometry();
const starCount=3000;
const starPos=new Float32Array(starCount*3);
for(let i=0;i<starCount;i++){
  starPos[i*3]=(Math.random()-0.5)*30;
  starPos[i*3+1]=(Math.random()-0.5)*30;
  starPos[i*3+2]=(Math.random()-0.5)*30;
}
starGeo.setAttribute('position',new THREE.BufferAttribute(starPos,3));
const starMat=new THREE.PointsMaterial({color:0x00CFFF,size:0.06,transparent:true,opacity:0.5,sizeAttenuation:true});
const stars=new THREE.Points(starGeo,starMat);
scene.add(stars);

/* Nebula */
const nebGeo=new THREE.BufferGeometry();
const nebCount=800;
const nebPos=new Float32Array(nebCount*3);
const nebColors=new Float32Array(nebCount*3);
for(let i=0;i<nebCount;i++){
  const theta=Math.random()*Math.PI*2;
  const r=Math.random()*6+1;
  nebPos[i*3]=Math.cos(theta)*r+(Math.random()-0.5)*2;
  nebPos[i*3+1]=(Math.random()-0.5)*8;
  nebPos[i*3+2]=Math.sin(theta)*r+(Math.random()-0.5)*2;
  const t=Math.random();
  nebColors[i*3]=0.0; nebColors[i*3+1]=0.6+t*0.4; nebColors[i*3+2]=0.9+t*0.1;
}
nebGeo.setAttribute('position',new THREE.BufferAttribute(nebPos,3));
nebGeo.setAttribute('color',new THREE.BufferAttribute(nebColors,3));
const nebMat=new THREE.PointsMaterial({size:0.04,vertexColors:true,transparent:true,opacity:0.35,sizeAttenuation:true});
const nebula=new THREE.Points(nebGeo,nebMat);
scene.add(nebula);

/* Accent particles */
const accGeo=new THREE.BufferGeometry();
const accPos=new Float32Array(400*3);
for(let i=0;i<400;i++){
  accPos[i*3]=(Math.random()-0.5)*20;
  accPos[i*3+1]=(Math.random()-0.5)*20;
  accPos[i*3+2]=(Math.random()-0.5)*10;
}
accGeo.setAttribute('position',new THREE.BufferAttribute(accPos,3));
const accMat=new THREE.PointsMaterial({color:0x7B8EFF,size:0.03,transparent:true,opacity:0.25,sizeAttenuation:true});
const accPts=new THREE.Points(accGeo,accMat);
scene.add(accPts);

let mouseX=0,mouseY=0;
document.addEventListener('mousemove',e=>{
  mouseX=(e.clientX/window.innerWidth-0.5)*0.5;
  mouseY=(e.clientY/window.innerHeight-0.5)*0.5;
});
window.addEventListener('resize',()=>{
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
let tick=0;
(function animate3(){
  requestAnimationFrame(animate3);
  tick+=0.004;
  stars.rotation.y=tick*0.05; stars.rotation.x=tick*0.02;
  nebula.rotation.y=tick*0.08; nebula.rotation.z=tick*0.03;
  accPts.rotation.y=-tick*0.04; accPts.rotation.x=tick*0.015;
  camera.position.x+=(mouseX-camera.position.x)*0.04;
  camera.position.y+=(-mouseY-camera.position.y)*0.04;
  camera.lookAt(scene.position);
  starMat.opacity=0.35+Math.sin(tick)*0.15;
  renderer.render(scene,camera);
})();

/* ── GSAP Scroll Animations ── */
gsap.registerPlugin(ScrollTrigger);

/* Hero */
gsap.to('#hero-pill',{opacity:1,y:0,duration:0.8,delay:1.8,ease:'power3.out'});
gsap.from('#hero-title .line span',{y:'110%',duration:1.1,stagger:0.12,delay:2,ease:'power4.out'});
gsap.to('#hero-sub',{opacity:1,y:0,duration:0.9,delay:2.4,ease:'power3.out'});
gsap.to('#hero-ctas',{opacity:1,y:0,duration:0.9,delay:2.6,ease:'power3.out'});

/* Impact counters */
const impObs=new IntersectionObserver(entries=>{
  if(!entries[0].isIntersecting) return;
  document.querySelectorAll('.impact-item').forEach((item,i)=>{
    gsap.to(item,{opacity:1,y:0,duration:0.7,delay:i*0.15,ease:'power3.out'});
    item.classList.add('lit');
    const el=item.querySelector('.impact-num');
    const target=parseInt(el.dataset.target);
    const suffix=el.dataset.suffix||'';
    let v=0; const steps=80; const inc=target/steps;
    const timer=setInterval(()=>{
      v+=inc; if(v>=target){v=target;clearInterval(timer);}
      el.textContent=target>=100000?(Math.floor(v/100000).toFixed(0)+'L'+suffix):Math.floor(v)+suffix;
    },2000/steps);
  });
  impObs.disconnect();
},{threshold:0.3});
const impEl=document.querySelector('.impact');
if(impEl) impObs.observe(impEl);

/* Scroll reveals */
function sr(el,vars,triggerEl){
  gsap.to(el,{...vars,scrollTrigger:{trigger:triggerEl||el,start:'top 80%',toggleActions:'play none none none'}});
}
sr('#founder-quote',{opacity:1,x:0,duration:0.9,ease:'power3.out'},'#about');
[1,2,3].forEach(n=>sr('#cert'+n,{opacity:1,x:0,duration:0.7,delay:(n-1)*0.15,ease:'power3.out'},'#about'));
['wc1','wc2','wc3','wc4','wc5','wc6'].forEach((id,i)=>{
  gsap.to('#'+id,{opacity:1,y:0,duration:0.65,delay:i*0.1,ease:'power3.out',
    scrollTrigger:{trigger:'#work',start:'top 75%',toggleActions:'play none none none'}});
});
document.querySelectorAll('#perks li').forEach((li,i)=>{
  gsap.to(li,{opacity:1,x:0,duration:0.6,delay:i*0.09,ease:'power3.out',
    scrollTrigger:{trigger:'#perks',start:'top 80%',toggleActions:'play none none none'}});
});
gsap.from('.donate-title',{opacity:0,y:60,duration:1,ease:'power4.out',
  scrollTrigger:{trigger:'.donate-sec',start:'top 70%'}});
document.querySelectorAll('.reveal').forEach(el=>{
  const obs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){el.classList.add('visible');obs.unobserve(el);}
  },{threshold:0.1});
  obs.observe(el);
});

/* ── Dark / Light Toggle ── */
let isLight=false;
function toggleTheme(){
  isLight=!isLight;
  document.getElementById('ti').textContent=isLight?'🌙':'☀️';
  document.getElementById('tl').textContent=isLight?'Dark':'Light';
  document.body.style.background=isLight?'#D0F0FF':'';
  document.body.style.color=isLight?'#020812':'';
  document.getElementById('bg-canvas').style.opacity=isLight?'0.2':'1';
  document.querySelectorAll('.work-card').forEach(c=>{
    c.style.background=isLight?'#E0F8FF':'';
    c.style.color=isLight?'#020812':'';
  });
}