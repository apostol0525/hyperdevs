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