
const container = document.querySelector('.about-flow');
const path = document.querySelector('.connecting-line path');
const maxOffset = 1850;

const contactsContainer = document.querySelector('.contacts-grid');
const divider = document.querySelector('.contacts-divider');

let ticking = false 

  function updateLine() {
  if (!container || !path) return;

  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
  progress = Math.max(0, Math.min(1, progress));

  path.style.strokeDashoffset = maxOffset * (1 - progress);
}

if (contactsContainer && divider) {
    const cRect = contactsContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let cProgress = (windowHeight - cRect.top) / (windowHeight + cRect.height);

    let finalProgress = cProgress * 1.6;

    finalProgress = Math.max(0, Math.min(1, finalProgress));

    divider.style.transform = `scaleY(${finalProgress})`
}

window.addEventListener('scroll', () => {
    

if (!ticking) {
        window.requestAnimationFrame(() =>{
            updateLine();
            ticking = false;
        })
        ticking = true; 
    }
    updateLine();
});

const lines = document.querySelectorAll('.title-line');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('draw');
  });
}, { threshold: 0.5 });

lines.forEach((line) => observer.observe(line));




const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
    
    if (navMenu.classList.contains('open')) {
        // Когда меню открыто - запрещаем ЛЮБОЙ скролл
        document.body.style.overflow = 'hidden';
    } else {
        // Когда меню закрыто - ПРОСТО УДАЛЯЕМ инлайновый стиль
        // Теперь браузер снова будет слушаться твоего CSS (где стоит overflow-x: hidden)
        document.body.style.overflow = ''; 
    }
});

// Закрываем меню при клике на любую ссылку (чтобы перейти к разделу)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});