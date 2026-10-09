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


const projectDetails = {
  "rock-mine": {
    title: "Rock vs Mine Prediction",
    idea: "Build a machine-learning classifier that analyses sonar signal measurements and predicts whether an object is a rock or a mine.",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Data preprocessing", "Feature analysis", "Classification"],
    description: [
      "Prepared and inspected the sonar dataset to understand the input features and target labels.",
      "Performed data preprocessing and feature analysis before model training.",
      "Used Scikit-learn to train and evaluate a classification model that predicts the class of an input sonar signal.",
      "The result is a practical binary-classification workflow for distinguishing rock and mine signals."
    ],
    outcome: "A machine-learning prediction workflow for classifying sonar signals. Exact model name and evaluation score can be added if confirmed."
  },
  "forest-fire": {
    title: "Forest Fire Detection",
    idea: "Create a computer-vision system that detects fire in images using annotated image data and an object-detection model.",
    skills: ["Python", "YOLO", "OpenCV", "Image annotation", "Computer Vision", "TensorFlow", "Model evaluation"],
    description: [
      "Organised fire, smoke and non-fire image data for the detection workflow.",
      "Annotated images and prepared the data for model training.",
      "Trained an object-detection model using YOLO and used image-processing tools as part of the pipeline.",
      "Used the trained model to identify fire-related regions in input images."
    ],
    outcome: "An image-based fire detection prototype. This description avoids claiming video, drone, or live deployment features that are not confirmed."
  },
  "fake-news": {
    title: "Fake News Detection",
    idea: "Build a natural-language-processing model that classifies news articles as fake or real based on their text.",
    skills: ["Python", "NLP", "TF-IDF", "Scikit-learn", "Pandas", "NumPy", "NLTK", "Logistic Regression", "PassiveAggressiveClassifier"],
    description: [
      "Prepared and cleaned the news text so it could be used for machine learning.",
      "Converted text into numerical features using TF-IDF vectorisation.",
      "Trained classifiers including Logistic Regression and PassiveAggressiveClassifier.",
      "Evaluated the model's classification behaviour on the prepared dataset."
    ],
    outcome: "A text-classification pipeline for identifying potentially fake news. Exact accuracy values are not stated because they were not provided."
  },
  "food-delivery": {
    title: "Online Food Delivery and Management System",
    idea: "Develop a full-stack food ordering application that supports user authentication, food-order workflows and data management.",
    skills: ["Python", "Django", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap", "REST APIs", "Role-based authentication"],
    description: [
      "Built the application using Django for server-side logic and MySQL for database management.",
      "Implemented role-based authentication to separate access according to user roles.",
      "Created REST API functionality to support communication between application components.",
      "Built responsive pages using HTML, CSS, JavaScript and Bootstrap."
    ],
    outcome: "A full-stack food delivery application with authentication, API and database functionality."
  }
};

function openProjectModal(key) {
  const data = projectDetails[key];
  if (!data) return;
  const modal = document.getElementById("project-modal");
  const body = document.getElementById("modal-body");
  document.getElementById("modal-title").textContent = data.title;
  body.replaceChildren();

  const addSection = (heading, content, isList = false) => {
    const section = document.createElement("section");
    section.className = "modal-section";
    const h3 = document.createElement("h3");
    h3.textContent = heading;
    section.appendChild(h3);
    if (isList) {
      const ul = document.createElement("ul");
      content.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      section.appendChild(ul);
    } else {
      const p = document.createElement("p");
      p.textContent = content;
      section.appendChild(p);
    }
    body.appendChild(section);
  };

  addSection("Project idea", data.idea);
  const skillSection = document.createElement("section");
  skillSection.className = "modal-section";
  const skillHeading = document.createElement("h3");
  skillHeading.textContent = "Skills & technologies used";
  skillSection.appendChild(skillHeading);
  const chips = document.createElement("div");
  chips.className = "modal-chips";
  data.skills.forEach(skill => {
    const chip = document.createElement("span");
    chip.textContent = skill;
    chips.appendChild(chip);
  });
  skillSection.appendChild(chips);
  body.appendChild(skillSection);
  addSection("How I built it", data.description, true);
  addSection("Outcome", data.outcome);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".project-modal-close").focus();
}
function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
document.querySelectorAll(".project-clickable").forEach(card => {
  card.addEventListener("click", () => openProjectModal(card.dataset.project));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card.dataset.project);
    }
  });
});
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeProjectModal));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeProjectModal();
});
