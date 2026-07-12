
const container = document.querySelector('.about-flow');
const path = document.querySelector('.connecting-line path');
const maxOffset = 1850;

const contactsContainer = document.querySelector('.contacts-grid');
const divider = document.querySelector('.contacts-divider');
const header = document.querySelector('.header');
const scrollThreshold = 60;

let ticking = false 

  function updateLine() {
  const windowHeight = window.innerHeight;

  const rect = container.getBoundingClientRect();
  let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
  progress = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - progress, 3);
  path.style.strokeDashoffset = maxOffset * (1 - progress);


  if (contactsContainer && divider) {
    const cRect = contactsContainer.getBoundingClientRect();
    let cProgress = (windowHeight - cRect.top) / (windowHeight + cRect.height);
    let finalProgress = cProgress * 1.6;
    finalProgress = Math.max(0, Math.min(1, finalProgress));

    if (window.innerWidth <= 750) {
      divider.style.transform = `scaleX(${finalProgress})`;
    } else {
      divider.style.transform = `scaleY(${finalProgress})`;
    }
}

}




window.addEventListener('scroll', () => {
    
   if (window.scrollY > scrollThreshold) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }

if (!ticking) {
        window.requestAnimationFrame(() =>{
            updateLine();
            ticking = false;
        })
        ticking = true; 
    }
    
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
     if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add(el.classList.contains('title-line') ? 'draw' : 'in');
    observer.unobserve(el);
  });
}, { threshold: 0.2, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal, .title-line').forEach((el) => observer.observe(el));

const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

const app = () => {
  const body = document.querySelector('body');
  const menu = document.querySelector('.menu-icon');

  menu.addEventListener('click', () => {
    body.classList.toggle('nav-active')
  })
}

app();

// Закрываем меню при клике на любую ссылку (чтобы перейти к разделу)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});



document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button');
  const data = Object.fromEntries(new FormData(form));

  btn.disabled = true;
  btn.textContent = 'Отправка...';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      form.reset();
      btn.textContent = 'Отправлено ✓';
    } else {
      btn.textContent = 'Ошибка, попробуйте снова';
    }
  } catch {
    btn.textContent = 'Ошибка сети';
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send';
    }, 2000);
  }
});

function splitText(el) {
  const text = el.textContent;
  const type = el.dataset.splitText || 'chars'; // 'chars' или 'words'
  el.textContent = '';

  if (type === 'words') {
    const words = text.split(' ');
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'split-char';
      span.textContent = word + (i < words.length - 1 ? '\u00A0' : '');
      span.style.transitionDelay = `${i * 50}ms`;
      el.appendChild(span);
    });
  } else {
    const chars = text.split('');
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'split-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${i * 30}ms`;
      el.appendChild(span);
    });
  }
}

document.querySelectorAll('[data-split-text]').forEach(splitText);

const splitObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const chars = entry.target.querySelectorAll('.split-char');
    chars.forEach((char) => char.classList.add('in'));
    splitObserver.unobserve(entry.target);
  });
}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('[data-split-text]').forEach((el) => splitObserver.observe(el));