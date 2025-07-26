// ===== ANIMAÇÕES AVANÇADAS E AOS =====

document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initScrollAnimations();
    initHoverAnimations();
    initCounterAnimations();
    initParallaxEffects();
    initMorphingShapes();
    initTextAnimations();
    initLoadingAnimations();
    
    console.log('✨ Animações avançadas inicializadas!');
});

// ===== INICIALIZAR AOS (ANIMATE ON SCROLL) =====
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom',
        disable: function() {
            return window.innerWidth < 768; // Desabilitar em mobile
        }
    });
    
    // Refresh AOS quando necessário
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
    
    console.log('✅ AOS inicializado');
}

// ===== ANIMAÇÕES DE SCROLL PERSONALIZADAS =====
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', throttle(handleScrollAnimation, 16));
}

// ===== ANIMAÇÕES DE HOVER AVANÇADAS =====
function initHoverAnimations() {
    // Efeito de hover para cards
    const cards = document.querySelectorAll('.experience-card, .service-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            // Adicionar efeito de brilho
            const shine = document.createElement('div');
            shine.className = 'shine-overlay';
            this.appendChild(shine);
            
            setTimeout(() => {
                if (shine.parentNode) {
                    shine.parentNode.removeChild(shine);
                }
            }, 600);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Efeito de hover para botões
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    });
    
    // Efeito de hover para ícones sociais
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__bounceIn');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__bounceIn');
        });
    });
}

// ===== ANIMAÇÕES DE CONTADOR =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== EFEITOS PARALLAX =====
function initParallaxEffects() {
    if (window.innerWidth <= 768) return; // Desabilitar em mobile
    
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            const yPos = -(scrolled / element.dataset.speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };
    
    window.addEventListener('scroll', throttle(handleParallax, 16));
}

// ===== FORMAS MORPHING =====
function initMorphingShapes() {
    const morphShapes = document.querySelectorAll('.morph-shape');
    
    morphShapes.forEach(shape => {
        let morphInterval;
        
        const startMorphing = () => {
            const morphStates = [
                '50% 50% 50% 50%',
                '60% 40% 60% 40%',
                '40% 60% 40% 60%',
                '50% 50% 30% 70%',
                '70% 30% 50% 50%'
            ];
            
            let currentState = 0;
            
            morphInterval = setInterval(() => {
                shape.style.borderRadius = morphStates[currentState];
                currentState = (currentState + 1) % morphStates.length;
            }, 2000);
        };
        
        const stopMorphing = () => {
            clearInterval(morphInterval);
            shape.style.borderRadius = '50%';
        };
        
        shape.addEventListener('mouseenter', startMorphing);
        shape.addEventListener('mouseleave', stopMorphing);
    });
}

// ===== ANIMAÇÕES DE TEXTO =====
function initTextAnimations() {
    // Efeito de digitação
    const typewriterElements = document.querySelectorAll('.typewriter-effect');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 100;
        
        element.textContent = '';
        element.style.borderRight = '2px solid #6c63ff';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                element.style.animation = 'blink-caret 0.75s step-end infinite';
            }
        };
        
        // Iniciar quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // Efeito de reveal text
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    revealTexts.forEach(text => {
        const words = text.textContent.split(' ');
        text.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        
        const wordElements = text.querySelectorAll('.word');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wordElements.forEach((word, index) => {
                        setTimeout(() => {
                            word.classList.add('animate__animated', 'animate__fadeInUp');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(text);
    });
}

// ===== ANIMAÇÕES DE LOADING =====
function initLoadingAnimations() {
    // Skeleton loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-loader';
        img.parentNode.insertBefore(skeleton, img);
        
        img.addEventListener('load', () => {
            skeleton.remove();
            img.classList.add('animate__animated', 'animate__fadeIn');
        });
    });
    
    // Loading spinner para seções
    const loadingSections = document.querySelectorAll('.loading-section');
    
    loadingSections.forEach(section => {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        section.appendChild(spinner);
        
        setTimeout(() => {
            spinner.remove();
            section.classList.add('loaded');
        }, 1000);
    });
}

// ===== ANIMAÇÕES DE ENTRADA DA PÁGINA =====
function initPageEntranceAnimations() {
    const timeline = [
        { selector: '.main-header', delay: 0, animation: 'animate__fadeInDown' },
        { selector: '.intro-text h1', delay: 500, animation: 'animate__fadeInUp' },
        { selector: '.intro-text .highlight-role', delay: 700, animation: 'animate__fadeInUp' },
        { selector: '.intro-text .impact-text', delay: 900, animation: 'animate__fadeInUp' },
        { selector: '.social-icons', delay: 1100, animation: 'animate__fadeInUp' },
        { selector: '.intro-buttons', delay: 1300, animation: 'animate__fadeInUp' },
        { selector: '.intro-animation', delay: 600, animation: 'animate__fadeInRight' }
    ];
    
    timeline.forEach(item => {
        setTimeout(() => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(el => {
                el.classList.add('animate__animated', item.animation);
            });
        }, item.delay);
    });
}

// ===== ANIMAÇÕES DE SCROLL SUAVE =====
function initSmoothScrollAnimations() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adicionar classe de highlight temporária
                targetElement.classList.add('highlight-section');
                
                setTimeout(() => {
                    targetElement.classList.remove('highlight-section');
                }, 2000);
                
                // Scroll suave
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ANIMAÇÕES DE PARTÍCULAS =====
function initParticleAnimations() {
    if (window.innerWidth <= 768) return; // Desabilitar em mobile
    
    const createParticle = (container) => {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * container.offsetWidth;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #6c63ff;
            border-radius: 50%;
            left: ${x}px;
            bottom: -10px;
            opacity: 0.7;
            animation: floatUp ${duration}s linear infinite;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    };
    
    const particleContainers = document.querySelectorAll('.particle-container');
    
    particleContainers.forEach(container => {
        setInterval(() => {
            createParticle(container);
        }, 2000);
    });
}

// ===== ANIMAÇÕES DE CURSOR PERSONALIZADO =====
function initCustomCursorAnimations() {
    if (window.innerWidth <= 768) return; // Desabilitar em mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    };
    
    animateFollower();
    
    // Efeitos de hover
    const hoverElements = document.querySelectorAll('a, button, .clickable');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ===== ANIMAÇÕES DE TRANSIÇÃO DE PÁGINA =====
function initPageTransitions() {
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
    
    document.body.appendChild(pageLoader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('fade-out');
            setTimeout(() => {
                pageLoader.remove();
                document.body.classList.add('page-loaded');
                initPageEntranceAnimations();
            }, 500);
        }, 1000);
    });
}

// ===== ANIMAÇÕES RESPONSIVAS =====
function initResponsiveAnimations() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleResponsiveAnimations = (e) => {
        if (e.matches) {
            // Mobile: simplificar animações
            document.body.classList.add('mobile-animations');
            AOS.init({
                duration: 400,
                once: true,
                disable: true
            });
        } else {
            // Desktop: animações completas
            document.body.classList.remove('mobile-animations');
            AOS.init({
                duration: 800,
                once: true,
                disable: false
            });
        }
    };
    
    mediaQuery.addListener(handleResponsiveAnimations);
    handleResponsiveAnimations(mediaQuery);
}

// ===== FUNÇÕES UTILITÁRIAS =====

// Throttle para otimizar performance
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

// Debounce para eventos de resize
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

// Verificar se elemento está visível
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adicionar CSS para animações customizadas
function addCustomAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: #6c63ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }
        
        .cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid #6c63ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
        }
        
        .custom-cursor.hover,
        .cursor-follower.hover {
            transform: scale(1.5);
        }
        
        .floating-particle {
            animation: floatUp 10s linear infinite;
        }
        
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .page-loader.fade-out {
            opacity: 0;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(108, 99, 255, 0.3);
            border-top: 4px solid #6c63ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .highlight-section {
            animation: highlight 2s ease-in-out;
        }
        
        @keyframes highlight {
            0%, 100% { background: transparent; }
            50% { background: rgba(108, 99, 255, 0.1); }
        }
        
        .skeleton-loader {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        .shine-overlay {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: shine 0.6s ease-out;
        }
        
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @media (max-width: 768px) {
            .custom-cursor,
            .cursor-follower,
            .floating-particle {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== INICIALIZAÇÃO FINAL =====
document.addEventListener('DOMContentLoaded', function() {
    addCustomAnimationStyles();
    initPageTransitions();
    initSmoothScrollAnimations();
    initResponsiveAnimations();
    initCustomCursorAnimations();
    initParticleAnimations();
    
    // Inicializar após um pequeno delay para garantir que tudo esteja carregado
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// Refresh animações quando necessário
window.addEventListener('resize', debounce(() => {
    AOS.refresh();
}, 250));

