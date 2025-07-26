// ===== CARROSSÉIS COM SWIPER.JS =====

document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsCarousel();
    initProjectsCarousel();
    initCertificationsCarousel();
    initHeroCarousel();
    
    console.log('🎠 Carrosséis inicializados com sucesso!');
});

// ===== CARROSSEL DE DEPOIMENTOS =====
function initTestimonialsCarousel() {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        // Configurações básicas
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        
        // Efeitos
        effect: 'slide',
        speed: 800,
        
        // Navegação
        navigation: {
            nextEl: '.testimonials-swiper .swiper-button-next',
            prevEl: '.testimonials-swiper .swiper-button-prev',
        },
        
        // Paginação
        pagination: {
            el: '.testimonials-swiper .swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        
        // Responsividade
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
        },
        
        // Eventos
        on: {
            slideChange: function () {
                // Adicionar animação aos slides
                const activeSlide = this.slides[this.activeIndex];
                const card = activeSlide.querySelector('.testimonial-card');
                
                if (card) {
                    card.classList.remove('animate__animated', 'animate__fadeInUp');
                    setTimeout(() => {
                        card.classList.add('animate__animated', 'animate__fadeInUp');
                    }, 100);
                }
            },
            init: function () {
                console.log('✅ Carrossel de depoimentos inicializado');
            }
        }
    });
    
    // Pausar autoplay quando hover
    const testimonialsContainer = document.querySelector('.testimonials-swiper');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            testimonialsSwiper.autoplay.stop();
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            testimonialsSwiper.autoplay.start();
        });
    }
}

// ===== CARROSSEL DE PROJETOS =====
function initProjectsCarousel() {
    const projectsSwiper = new Swiper('.projects-swiper', {
        // Configurações básicas
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        
        // Efeitos
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        speed: 600,
        
        // Navegação
        navigation: {
            nextEl: '.projects-swiper .swiper-button-next',
            prevEl: '.projects-swiper .swiper-button-prev',
        },
        
        // Paginação
        pagination: {
            el: '.projects-swiper .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        
        // Responsividade
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
                effect: 'slide',
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                effect: 'slide',
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
                effect: 'coverflow',
            },
        },
        
        // Eventos
        on: {
            slideChange: function () {
                // Animar cards dos projetos
                this.slides.forEach((slide, index) => {
                    const card = slide.querySelector('.project-card');
                    if (card) {
                        if (index === this.activeIndex) {
                            card.classList.add('animate__animated', 'animate__pulse');
                        } else {
                            card.classList.remove('animate__animated', 'animate__pulse');
                        }
                    }
                });
            },
            init: function () {
                console.log('✅ Carrossel de projetos inicializado');
            }
        }
    });
    
    // Adicionar efeito hover nos cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__heartBeat');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__heartBeat');
        });
    });
}

// ===== CARROSSEL DE CERTIFICAÇÕES =====
function initCertificationsCarousel() {
    const certificationsSwiper = new Swiper('.certifications-swiper', {
        // Configurações básicas
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        
        // Efeitos
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        
        // Navegação
        navigation: {
            nextEl: '.certifications-swiper .swiper-button-next',
            prevEl: '.certifications-swiper .swiper-button-prev',
        },
        
        // Paginação
        pagination: {
            el: '.certifications-swiper .swiper-pagination',
            clickable: true,
            type: 'progressbar',
        },
        
        // Responsividade
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
        },
        
        // Eventos
        on: {
            slideChange: function () {
                // Animar certificações
                const activeSlide = this.slides[this.activeIndex];
                const card = activeSlide.querySelector('.certification-card');
                
                if (card) {
                    card.classList.add('animate__animated', 'animate__slideInRight');
                    setTimeout(() => {
                        card.classList.remove('animate__animated', 'animate__slideInRight');
                    }, 1000);
                }
            },
            init: function () {
                console.log('✅ Carrossel de certificações inicializado');
            }
        }
    });
}

// ===== CARROSSEL HERO (OPCIONAL) =====
function initHeroCarousel() {
    // Carrossel para múltiplas animações Lottie na seção hero
    const heroAnimations = document.querySelectorAll('.hero-animation');
    
    if (heroAnimations.length > 1) {
        const heroSwiper = new Swiper('.hero-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 2000,
            
            on: {
                init: function () {
                    console.log('✅ Carrossel hero inicializado');
                }
            }
        });
    }
}

// ===== FUNÇÕES AUXILIARES PARA CARROSSÉIS =====

// Função para pausar todos os carrosséis
function pauseAllCarousels() {
    document.querySelectorAll('.swiper').forEach(swiperEl => {
        if (swiperEl.swiper && swiperEl.swiper.autoplay) {
            swiperEl.swiper.autoplay.stop();
        }
    });
}

// Função para retomar todos os carrosséis
function resumeAllCarousels() {
    document.querySelectorAll('.swiper').forEach(swiperEl => {
        if (swiperEl.swiper && swiperEl.swiper.autoplay) {
            swiperEl.swiper.autoplay.start();
        }
    });
}

// Função para ir para slide específico
function goToSlide(swiperClass, slideIndex) {
    const swiper = document.querySelector(swiperClass);
    if (swiper && swiper.swiper) {
        swiper.swiper.slideTo(slideIndex);
    }
}

// Função para adicionar slide dinamicamente
function addSlide(swiperClass, slideContent) {
    const swiper = document.querySelector(swiperClass);
    if (swiper && swiper.swiper) {
        swiper.swiper.appendSlide(slideContent);
    }
}

// Função para remover slide
function removeSlide(swiperClass, slideIndex) {
    const swiper = document.querySelector(swiperClass);
    if (swiper && swiper.swiper) {
        swiper.swiper.removeSlide(slideIndex);
    }
}

// ===== CONTROLES DE CARROSSEL PERSONALIZADOS =====

// Adicionar controles de teclado
document.addEventListener('keydown', function(e) {
    const activeSwiper = document.querySelector('.swiper:hover');
    
    if (activeSwiper && activeSwiper.swiper) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                activeSwiper.swiper.slidePrev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                activeSwiper.swiper.slideNext();
                break;
            case ' ': // Espaço para pausar/retomar
                e.preventDefault();
                if (activeSwiper.swiper.autoplay.running) {
                    activeSwiper.swiper.autoplay.stop();
                } else {
                    activeSwiper.swiper.autoplay.start();
                }
                break;
        }
    }
});

// Pausar carrosséis quando a aba não está ativa
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseAllCarousels();
    } else {
        resumeAllCarousels();
    }
});

// ===== CARROSSEL DE IMAGENS LIGHTBOX =====
function initLightboxCarousel() {
    // Implementar lightbox para galeria de projetos
    const galleryImages = document.querySelectorAll('.project-gallery img');
    
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(this.src, index);
        });
    });
}

function openLightbox(imageSrc, startIndex) {
    // Criar modal lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="Imagem do projeto">
            <div class="lightbox-nav">
                <button class="lightbox-prev">❮</button>
                <button class="lightbox-next">❯</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Adicionar eventos
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Animação de entrada
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

// ===== CARROSSEL INFINITO PERSONALIZADO =====
function createInfiniteCarousel(container, items, options = {}) {
    const defaults = {
        autoplay: true,
        delay: 3000,
        direction: 'left',
        speed: 1
    };
    
    const settings = { ...defaults, ...options };
    
    // Duplicar itens para efeito infinito
    const wrapper = container.querySelector('.carousel-wrapper');
    const originalItems = wrapper.innerHTML;
    wrapper.innerHTML = originalItems + originalItems;
    
    let position = 0;
    const itemWidth = wrapper.children[0].offsetWidth;
    const totalWidth = itemWidth * (wrapper.children.length / 2);
    
    function animate() {
        position -= settings.speed;
        
        if (Math.abs(position) >= totalWidth) {
            position = 0;
        }
        
        wrapper.style.transform = `translateX(${position}px)`;
        
        if (settings.autoplay) {
            requestAnimationFrame(animate);
        }
    }
    
    if (settings.autoplay) {
        animate();
    }
    
    return {
        start: () => {
            settings.autoplay = true;
            animate();
        },
        stop: () => {
            settings.autoplay = false;
        },
        setSpeed: (speed) => {
            settings.speed = speed;
        }
    };
}

// ===== INICIALIZAÇÃO FINAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar lightbox se houver imagens de galeria
    if (document.querySelectorAll('.project-gallery img').length > 0) {
        initLightboxCarousel();
    }
    
    // Adicionar indicadores de loading
    document.querySelectorAll('.swiper').forEach(swiper => {
        const loader = document.createElement('div');
        loader.className = 'swiper-loader';
        loader.innerHTML = '<div class="loading-spinner"></div>';
        swiper.appendChild(loader);
        
        // Remover loader quando swiper estiver pronto
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 1000);
    });
});

// ===== PERFORMANCE E OTIMIZAÇÃO =====

// Lazy loading para slides
function initLazySlides() {
    const lazySlides = document.querySelectorAll('.swiper-slide[data-background]');
    
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slide = entry.target;
                const bgImage = slide.dataset.background;
                slide.style.backgroundImage = `url(${bgImage})`;
                slide.classList.add('loaded');
                slideObserver.unobserve(slide);
            }
        });
    });
    
    lazySlides.forEach(slide => slideObserver.observe(slide));
}

// Preload de próximos slides
function preloadNextSlides(swiper, count = 2) {
    const currentIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;
    
    for (let i = 1; i <= count; i++) {
        const nextIndex = (currentIndex + i) % totalSlides;
        const nextSlide = swiper.slides[nextIndex];
        const images = nextSlide.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                delete img.dataset.src;
            }
        });
    }
}

// Inicializar otimizações
document.addEventListener('DOMContentLoaded', function() {
    initLazySlides();
});

