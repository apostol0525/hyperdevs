
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


const navLinks = document.querySelectorAll('.nav-link, .nav-list-item a');

const app = () => {
  const body = document.querySelector('body');
  const menu = document.querySelector('.menu-icon');

  menu.addEventListener('click', () => {
    body.classList.toggle('nav-active')
    body.style.overflow = body.classList.contains('nav-active') ? 'hidden' : 'auto';
  })
}

app();

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-active');
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




const translations = {
  en: {
    "nav-portfolio": "Portfolio",
    "nav-services": "Services",
    "nav-about": "About Us",
    "nav-contacts": "Contacts",
    "nav-lets-talk": "Let's talk",

    "hero-subtitle": "Web Design & Development",
    "hero-text": "See? It's live. From Figma to a working site — design and code, done right",

    "section-portfolio": "Portfolio",
    "proj-1-title": "Dog Weight Control",
    "proj-1-desc": "A dog food calculator that automatically calculates portion sizes and selects food based on your pet's weight and activity level.",
    "proj-2-title": "Dana Voss Fitness",
    "proj-2-desc": "A personal trainer landing page featuring a custom heart rate animation and a form for signing up for a trial workout.",
    "proj-3-title": "Türkiye Tour Landing",
    "proj-3-desc": "A landing page for a tour in Turkey with a clear timeline of the itinerary that helps the client quickly understand the trip program.",
    "btn-go-to": "Go to →",
    "portfolio-quote-1": "Projects made with heart",
    "portfolio-quote-2": "and a touch of inspiration",

    "section-services": "Services",
    "service-design-title": "Design",
    "service-design-text": "From structure and logic to the final visual style tailored to your brand.",
    "service-dev-title": "Development",
    "service-dev-text": "Whether I use Webflow or custom code for layout—I choose the approach based on the project's requirements and budget.",
    "service-launch-title": "Launch",
    "service-launch-text": "Launching a website, setting up a domain, and optimizing for SEO in the early stages",
    "service-support-title": "Support",
    "service-support-text": "Small fixes, content updates, and quick answers when something needs attention after the site goes live.",

    "section-about": "About Us",
    "about-text-1": "I design and build your website myself — using Webflow or raw code HTML, CSS, JavaScript, depending on what the project actually needs and what fits your budget.",
    "about-stat-1-num": "100%",
    "about-stat-1-text": "Bespoke design, no templates",
    "about-stat-2-num": "1",
    "about-stat-2-text": "A single person behind both the design and the build",
    "about-stat-3-num": "Fixed",
    "about-stat-3-text": "Price agreed before work begins, no surprises",

    "section-contacts": "Contacts",
    "contacts-text": "When you're ready, get in touch. Tell me about your project — I'll get back to you within 24 hours.",
    "form-name": "name",
    "form-email": "email",
    "form-message": "enter your message",
    "btn-send": "Send",

    "footer-rights": "All rights reserved.",
  },
  ru: {
    "nav-portfolio": "Портфолио",
    "nav-services": "Услуги",
    "nav-about": "О нас",
    "nav-contacts": "Контакты",
    "nav-lets-talk": "Обсудить проект",

    "hero-subtitle": "Веб-дизайн и разработка",
    "hero-text": "Смотри? Это работает. От Figma до готового сайта — дизайн и код, сделано правильно",

    "section-portfolio": "Портфолио",
    "proj-1-title": "Dog Weight Control",
    "proj-1-desc": "Калькулятор корма для собак, который автоматически рассчитывает порции и подбирает питание по весу и активности питомца.",
    "proj-2-title": "Dana Voss Fitness",
    "proj-2-desc": "Лендинг персонального тренера с кастомной анимацией пульса и формой записи на пробную тренировку.",
    "proj-3-title": "Türkiye Tour Landing",
    "proj-3-desc": "Лендинг для тура по Турции с наглядным таймлайном маршрута, который помогает клиенту быстро понять программу поездки.",
    "btn-go-to": "Перейти →",
    "portfolio-quote-1": "Проекты, сделанные с душой",
    "portfolio-quote-2": "и капелькой вдохновения",

    "section-services": "Услуги",
    "service-design-title": "Дизайн",
    "service-design-text": "От структуры и логики до финального визуального стиля под ваш бренд.",
    "service-dev-title": "Разработка",
    "service-dev-text": "Использую Webflow или собственный код для вёрстки — выбираю подход в зависимости от требований проекта и вашего бюджета.",
    "service-launch-title": "Запуск",
    "service-launch-text": "Запуск сайта, настройка домена и SEO-оптимизация на старте",
    "service-support-title": "Поддержка",
    "service-support-text": "Мелкие правки, обновление контента и быстрые ответы, если после запуска что-то нужно поправить.",

    "section-about": "О нас",
    "about-text-1": "Я самостоятельно проектирую и создаю ваш сайт — используя Webflow или чистый код HTML, CSS, JavaScript, в зависимости от задач проекта и вашего бюджета.",
    "about-stat-1-num": "100%",
    "about-stat-1-text": "Индивидуальный дизайн, без шаблонов",
    "about-stat-2-num": "Дизайн и код",
    "about-stat-2-text": "в синхронизации то что спроектировано, то и реализовано",
    "about-stat-3-num": "Фикс. цена",
    "about-stat-3-text": "Цена согласовывается до начала работы, без сюрпризов",

    "section-contacts": "Контакты",
    "contacts-text": "Когда будете готовы напишите мне. Расскажите о своём проекте, и я отвечу в течение 24 часов.",
    "form-name": "имя",
    "form-email": "email",
    "form-message": "введите сообщение",
    "btn-send": "Отправить",

    "footer-rights": "Все права защищены.",
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const text = translations[lang]?.[key];
    if (text) el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const text = translations[lang]?.[key];
    if (text) el.placeholder = text;
  });

  document.documentElement.lang = lang;
  localStorage.setItem('preferred-lang', lang);

  document.querySelectorAll('.lang-code').forEach((el) => {
    el.textContent = lang.toUpperCase();
  });
}

document.querySelectorAll('.lang-switch').forEach((switchBlock) => {
  const toggle = switchBlock.querySelector('.lang-current');
  const options = switchBlock.querySelectorAll('.lang-option');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    switchBlock.classList.toggle('open');
    toggle.setAttribute('aria-expanded', switchBlock.classList.contains('open'));
  });

  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');

      setLanguage(option.dataset.lang);

      switchBlock.classList.remove('open');
    });
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.lang-switch').forEach((switchBlock) => {
    switchBlock.classList.remove('open');
    switchBlock.querySelector('.lang-current').setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred-lang') || 'en';
  setLanguage(savedLang);
});