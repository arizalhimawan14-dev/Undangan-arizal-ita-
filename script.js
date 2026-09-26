const targetDate = new Date("2026-11-17T08:00:00+07:00").getTime();

window.addEventListener("load",()=>{
  const loader=document.getElementById("loading");
  setTimeout(()=>{loader.style.opacity="0";setTimeout(()=>loader.remove(),500)},250);
  initWishes();
  updateCountdown();
  setInterval(updateCountdown,1000);
});

document.getElementById("openBtn").addEventListener("click",()=>{
  document.getElementById("main").scrollIntoView({behavior:"smooth"});
  document.getElementById("cover").classList.add("opened");
  const v=document.querySelector(".cover-video");
  if(v){v.play().catch(()=>{});}
});

function updateCountdown(){
  let diff=targetDate-Date.now();
  if(diff<0) diff=0;
  const s=Math.floor(diff/1000);
  const d=Math.floor(s/86400), h=Math.floor(s%86400/3600), m=Math.floor(s%3600/60), sec=s%60;
  document.getElementById("days").textContent=d;
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(sec).padStart(2,"0");
}

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal-on-scroll").forEach(el=>observer.observe(el));

const form=document.getElementById("wishForm");
const list=document.getElementById("wishList");
function getWishes(){try{return JSON.parse(localStorage.getItem("ariItaWishes")||"[]")}catch{return[]}}
function saveWishes(items){localStorage.setItem("ariItaWishes",JSON.stringify(items))}
function renderWishes(){
  list.innerHTML="";
  getWishes().slice().reverse().forEach(w=>{
    const item=document.createElement("article");
    item.className="wish-item";
    const name=document.createElement("strong"); name.textContent=w.name;
    const status=document.createElement("span"); status.className="status"; status.textContent=" · "+w.attendance;
    const p=document.createElement("p"); p.textContent=w.text;
    item.append(name,status,p); list.appendChild(item);
  });
}
function initWishes(){renderWishes()}
form.addEventListener("submit",e=>{
  e.preventDefault();
  const item={name:document.getElementById("guestName").value.trim(),attendance:document.getElementById("attendance").value,text:document.getElementById("wishText").value.trim()};
  if(!item.name||!item.attendance||!item.text)return;
  const all=getWishes(); all.push(item); saveWishes(all); form.reset(); renderWishes();
});
document.getElementById("copyDana").addEventListener("click",async()=>{
  const number="089526216627";
  try{await navigator.clipboard.writeText(number)}catch{
    const ta=document.createElement("textarea");ta.value=number;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();
  }
  const s=document.getElementById("copyStatus");s.textContent="Nomor berhasil disalin ✓";setTimeout(()=>s.textContent="",2500);
});
