const wordElement = document.getElementById("dynamic-word");
// Список слов, которые будут меняться
const words = ["CSS", "SCSS", "SASS"]; 
let currentIndex = 0;

function changeWord() {
    // 1. Сначала добавляем класс скрытия
    wordElement.classList.add("word-hidden");

    // 2. Ждем 400мс (время анимации CSS), меняем текст и показываем обратно
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        wordElement.textContent = words[currentIndex];
        
        // 3. Убираем класс скрытия
        wordElement.classList.remove("word-hidden");
    }, 400);
}

// Запускаем цикл смены каждые 3 секунды
setInterval(changeWord, 3000);


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


/* ============================================================
   MOTION BLUR НА СКРОЛЛЕ
   Размытие зависит от скорости прокрутки:
   плавный скролл ≈ 3px, резкий/быстрый ≈ до 5px, покой → 0px
   ============================================================ */
(function initScrollMotionBlur() {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const MID_BLUR = 3;   // 3x — обычный скролл
    const MAX_BLUR = 5;   // 5x — резкий скролл
    const DECAY = 0.82;   // как быстро размытие спадает к нулю

    let lastY = window.scrollY;
    let lastT = performance.now();
    let currentBlur = 0;
    let ticking = false;

    function loop() {
        // Плавно возвращаем размытие к нулю, когда скролл останавливается
        currentBlur *= DECAY;
        if (currentBlur < 0.05) currentBlur = 0;
        root.style.setProperty('--scroll-blur', currentBlur.toFixed(2) + 'px');

        if (currentBlur > 0) {
            requestAnimationFrame(loop);
        } else {
            ticking = false;
        }
    }

    window.addEventListener('scroll', () => {
        const now = performance.now();
        const dy = Math.abs(window.scrollY - lastY);
        const dt = Math.max(now - lastT, 1);
        lastY = window.scrollY;
        lastT = now;

        // Скорость в px/ms → нормируем к диапазону размытия
        const velocity = dy / dt;                 // типично 0..5+
        let blur = Math.min(velocity * 1.6, MAX_BLUR);
        // Гарантируем ощутимый эффект при заметном движении
        if (dy > 2) blur = Math.max(blur, Math.min(MID_BLUR, MAX_BLUR));

        currentBlur = Math.max(currentBlur, blur);

        if (!ticking) {
            ticking = true;
            requestAnimationFrame(loop);
        }
    }, { passive: true });
})();
