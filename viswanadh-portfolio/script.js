const typingEl = document.getElementById("typing");
const words = ["AI/ML Engineer", "Python Developer", "Full Stack Developer", "Problem Solver"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const word = words[wordIndex];
  typingEl.textContent = deleting ? word.slice(0, --charIndex) : word.slice(0, ++charIndex);
  let delay = deleting ? 45 : 85;
  if(!deleting && charIndex === word.length){ delay = 1300; deleting = true; }
  else if(deleting && charIndex === 0){ deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 300; }
  setTimeout(typeLoop, delay);
}
typeLoop();

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", scrollY > 20));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menu.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click",()=>nav.classList.remove("open")));

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s => sectionObserver.observe(s));

const particleBox = document.getElementById("particles");
for(let i=0;i<55;i++){
  const p=document.createElement("span");
  p.className="particle";
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=(10+Math.random()*20)+"s";
  p.style.animationDelay=(-Math.random()*20)+"s";
  p.style.opacity=(.15+Math.random()*.35);
  particleBox.appendChild(p);
}

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

document.querySelectorAll(".project-card,.cert-card,.about-card,.skill-panel").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*6;
    const y=((e.clientY-r.top)/r.height-.5)*-6;
    card.style.transform=`perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
});
