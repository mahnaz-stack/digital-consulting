
function toggleMenu() {
    const nav = document.getElementById('nav');
    const hamburger = document.querySelector('.hamburger');
    if (!nav || !hamburger) return;

    nav.classList.toggle('show');
    const isOpen = nav.classList.contains('show');
    hamburger.innerHTML = isOpen ? '✕' : '☰';
    hamburger.setAttribute('aria-expanded', isOpen);
}

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const hamburger = document.querySelector('.hamburger');

    // باز و بسته کردن با همبرگر
    hamburger?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // وقتی روی لینک‌ها کلیک شد → فقط منو بسته بشه (نه preventDefault!)
    nav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    // کلیک خارج از منو → بستن
    document.addEventListener('click', (e) => {
        if (!nav || !nav.classList.contains('show')) return;

        const insideNav = nav.contains(e.target);
        const insideHamburger = hamburger?.contains(e.target);

        if (!insideNav && !insideHamburger) {
            nav.classList.remove('show');
            hamburger.innerHTML = '☰';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // وقتی صفحه بزرگ شد منو رو ببند
    window.addEventListener('resize', () => {
        if (window.innerWidth > 880 && nav?.classList.contains('show')) {
            nav.classList.remove('show');
            hamburger.innerHTML = '☰';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

//counter
const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            const speed = 100;
            const increment = target / speed;
            
            const update = () => {
                const current = +counter.innerText.replace(/\D/g, '');
                if(current < target) {
                    counter.innerText = Math.ceil(current + increment).toLocaleString();
                    setTimeout(update, 30);
                } else {
                    // روش ساده‌تر بدون backtick
                    if (target >= 1000) {
                        counter.innerText = (target / 1000) + 'k+';
                    } else {
                        counter.innerText = target + '+';
                    }
                }
            };
            
            update();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));

  const playBtn = document.getElementById("playBtn");
    const videoOverlay = document.getElementById("videoOverlay");
    const closeBtn = document.getElementById("closeBtn");
    const video = document.getElementById("video");

    // نمایش ویدیو وقتی پلی رو بزنیم
    playBtn.addEventListener("click", () => {
        videoOverlay.style.display = "block";
        video.play();
    });

    playBtn.addEventListener("click", () => {
    videoOverlay.style.display = "block";
    video.play();
    playBtn.style.display = "none"; // مخفی کردن دکمه وسط
});

    // بستن ویدیو
    closeBtn.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    videoOverlay.style.display = "none";
    playBtn.style.display = "flex"; // دوباره ظاهر شود
});

//team-slider
// ابتدا مطمئن شویم کتابخانه Swiper لود شده
document.addEventListener('DOMContentLoaded', function() {
    // منتظر بمانیم تا همه چیز لود شود
    setTimeout(initTeamSlider, 100);
});

function initTeamSlider() {
    // بررسی کن که آیا Swiper موجود است
    if (typeof Swiper === 'undefined') {
        // اگر Swiper لود نشده، آن را لود کن
        loadSwiperLibrary();
    } else {
        // اگر Swiper موجود است، اسلایدر را راه‌اندازی کن
        initializeSwiper();
    }
}

function loadSwiperLibrary() {
    // لود Swiper JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.onload = initializeSwiper;
    document.head.appendChild(script);
}

function initializeSwiper() {
    // راه‌اندازی Swiper با تنظیمات درست
    const teamSwiper = new Swiper('.team-slider', {
        slidesPerView: 1,
        spaceBetween: 18,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: '.nav-next',
            prevEl: '.nav-prev'
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        },
        speed: 500, // سرعت حرکت متوسط
        grabCursor: true, // نشانگر دست هنگام کشیدن
        observer: true, // مشاهده تغییرات DOM
        observeParents: true
    });
    
    // اضافه کردن effect hover روی کارت‌ها
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            teamSwiper.autoplay.stop();
        });
        
        card.addEventListener('mouseleave', function() {
            teamSwiper.autoplay.start();
        });
    });
    
    // رفع مشکل event listener برای دکمه‌های ناوبری
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            teamSwiper.slidePrev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            teamSwiper.slideNext();
        });
    }
    
    console.log('Team slider initialized successfully!');
}

