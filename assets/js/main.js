// ===== PORTFOLIO MELHORADO - JAVASCRIPT PRINCIPAL =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initBackToTop();
    initProjectTabs();
    initKnowledgeCards();
    initProgressBars();
    initTypewriter();
    initParticles();
    initScrollAnimations();
    initLazyLoading();
    
    console.log('🚀 Portfolio melhorado carregado com sucesso!');
});

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'light';
    
    themeSwitch.addEventListener('change', function() {
        const theme = this.checked ? 'light' : 'dark';
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Animação de transição suave
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animação do ícone
            const icon = this.querySelector('.material-icons');
            if (icon) {
                icon.textContent = navMenu.classList.contains('active') ? 'close' : 'menu';
            }
        });
        
        // Fechar menu ao clicar em link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
            });
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
                backToTopBtn.classList.add('animate__fadeIn');
            } else {
                backToTopBtn.style.display = 'none';
                backToTopBtn.classList.remove('animate__fadeIn');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== PROJECT TABS =====
function initProjectTabs() {
    const tabs = document.querySelectorAll('.project-tabs li');
    const contents = document.querySelectorAll('.project-desc');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetProject = this.getAttribute('data-project');
            
            // Remover classe active de todas as tabs e conteúdos
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Adicionar classe active na tab clicada
            this.classList.add('active');
            
            // Mostrar conteúdo correspondente com animação
            const targetContent = document.getElementById(targetProject);
            if (targetContent) {
                setTimeout(() => {
                    targetContent.classList.add('active');
                    targetContent.classList.add('animate__animated', 'animate__fadeInUp');
                }, 100);
            }
        });
    });
}

// ===== KNOWLEDGE CARDS =====
function initKnowledgeCards() {
    const techCards = document.querySelectorAll('.tech-card');
    const description = document.getElementById('knowledge-desc');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const desc = this.getAttribute('data-desc');
            if (desc && description) {
                description.innerHTML = `<p>${desc}</p>`;
                description.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (description) {
                description.innerHTML = '<p>*passe o cursor do mouse no card para ler*</p>';
                description.classList.remove('animate__animated', 'animate__fadeIn');
            }
        });
    });
}

// ===== PROGRESS BARS ANIMATION =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-out';
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Executar uma vez no carregamento
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const text = '👋 Olá, eu sou Marcos Paulo!';
        let index = 0;
        
        typewriterElement.textContent = '';
        
        function typeWriter() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                // Adicionar cursor piscando
                typewriterElement.style.borderRight = '3px solid #6c63ff';
                typewriterElement.style.animation = 'blink-caret 0.75s step-end infinite';
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// ===== PARTICLES ANIMATION =====
function initParticles() {
    const introSection = document.querySelector('.intro-section');
    
    if (introSection && window.innerWidth > 768) {
        for (let i = 0; i < 9; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${10 + i * 10}%`;
            particle.style.animationDelay = `${i}s`;
            introSection.appendChild(particle);
        }
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.experience-card, .service-card, .education-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== UTILITY FUNCTIONS =====

// Debounce function para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para adicionar classe com delay
function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

// Função para animar números (counter)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Função para criar efeito de parallax
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    const handleParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 10);
    
    if (parallaxElements.length > 0 && !isMobile()) {
        window.addEventListener('scroll', handleParallax);
    }
}

// Função para criar efeito de cursor personalizado
function initCustomCursor() {
    if (isMobile()) return;
    
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .clickable').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Função para preload de imagens
function preloadImages() {
    const images = [
        './assets/img/logo.png',
        './assets/img/profile.png',
        './assets/img/puc.png',
        './assets/img/unesc.gif',
        './assets/img/fatec.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    preloadImages();
    
    // Adicionar classe loaded ao body quando tudo estiver carregado
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Página carregada em ${loadTime}ms`);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('❌ Erro capturado:', e.error);
});

// ===== SERVICE WORKER (opcional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('❌ Falha ao registrar Service Worker:', error);
            });
    });
}

