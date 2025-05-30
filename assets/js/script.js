// Autor: Marcos Paulo Bez Birolo | Full Stack Developer @ Unimed

const themeSwitch = document.getElementById('theme-switch');
const icon = document.querySelector('.slider .icon');

// Aplica estado salvo
if (localStorage.getItem('theme') === 'dark') {
document.body.classList.add('dark-mode');
themeSwitch.checked = true;
icon.textContent = '🌙';
}

themeSwitch.addEventListener('change', () => {
const darkMode = themeSwitch.checked;

document.body.classList.toggle('dark-mode', darkMode);
icon.textContent = darkMode ? '🌙' : '🌞';

localStorage.setItem('theme', darkMode ? 'dark' : 'light');
});


const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

const openIcon = document.querySelector('.open-icon');
const closeIcon = document.querySelector('.close-icon');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});



const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
















const cards = document.querySelectorAll(
  '.experience-card, .project-card, .cert-card, .big-project-card, .fade-in'
);

cards.forEach(card => {
  card.classList.add('card-hidden');
});

const revealOnScroll = () => {
  let delay = 0;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && !card.classList.contains('card-visible')) {
      card.style.transitionDelay = `${delay}ms`;
      card.classList.add('card-visible');
      card.classList.remove('card-hidden');
      delay += 100;
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

















const text = "Hi all, I'm Marcos Paulo";
let i = 0;
const speed = 70; // velocidade

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.addEventListener('load', typeWriter);













const tabItems = document.querySelectorAll('.project-tabs li');
const tabContents = document.querySelectorAll('.project-desc');

tabItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-project');

    tabItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    tabContents.forEach(desc => {
      desc.classList.remove('active');
      if (desc.id === target) desc.classList.add('active');
    });
  });
});













const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    serviceCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});























const techCards = document.querySelectorAll('.tech-card');
const descBox = document.getElementById('knowledge-desc');

techCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const desc = card.getAttribute('data-desc');
    descBox.innerHTML = `<p>${desc}</p>`;
  });
});
