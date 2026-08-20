/* ============================================
   Portfolio Natan Waine - JavaScript
   ============================================ */

(function() {
    'use strict';

    // ==========================================
    // Theme Management
    // ==========================================
    const ThemeManager = {
        init: function() {
            this.loadTheme();
            this.createMobileControls();
            this.bindEvents();
        },

        createMobileControls: function() {
            const desktopSwitcher = document.querySelector('.theme-switcher');
            const mobileMenu = document.querySelector('.mobile-nav-menu');
            if (!desktopSwitcher || !mobileMenu || document.querySelector('.mobile-theme-control')) return;

            const control = document.createElement('li');
            control.className = 'mobile-theme-control';

            const toggle = document.createElement('button');
            toggle.className = 'mobile-theme-toggle';
            toggle.type = 'button';
            toggle.title = 'Pilih tema';
            toggle.setAttribute('aria-label', 'Pilih tema');
            toggle.innerHTML = desktopSwitcher.querySelector('[data-theme="device"]').innerHTML;

            const options = document.createElement('div');
            options.className = 'mobile-theme-options';
            desktopSwitcher.querySelectorAll('.theme-btn').forEach(button => {
                const option = button.cloneNode(true);
                option.classList.add('mobile-theme-option');
                options.appendChild(option);
            });

            control.append(toggle, options);
            mobileMenu.prepend(control);

            toggle.addEventListener('click', event => {
                event.stopPropagation();
                control.classList.toggle('open');
            });

            document.addEventListener('click', event => {
                if (!control.contains(event.target)) control.classList.remove('open');
            });
        },

        loadTheme: function() {
            const savedTheme = localStorage.getItem('portfolio-theme');
            const savedMode = localStorage.getItem('portfolio-theme-mode');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            const mode = savedMode || savedTheme || 'device';
            let theme = mode;
            
            if (theme === 'device') {
                theme = systemPrefersDark ? 'dark' : 'light';
            }
            
            this.applyTheme(theme);
            this.updateButtons(mode);
        },

        applyTheme: function(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        },

        setTheme: function(mode) {
            if (mode === 'device') {
                localStorage.removeItem('portfolio-theme');
                localStorage.setItem('portfolio-theme-mode', 'device');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.applyTheme(systemPrefersDark ? 'dark' : 'light');
            } else {
                localStorage.setItem('portfolio-theme', mode);
                localStorage.setItem('portfolio-theme-mode', mode);
                this.applyTheme(mode);
            }
            this.updateButtons(mode);
        },

        updateButtons: function(mode) {
            document.querySelectorAll('.theme-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.theme === mode);
            });
        },

        bindEvents: function() {
            document.querySelectorAll('.theme-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.setTheme(btn.dataset.theme);
                    btn.closest('.mobile-theme-control')?.classList.remove('open');
                });
            });

            // Listen for system theme changes when in device mode
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const mode = localStorage.getItem('portfolio-theme-mode') || 'device';
                if (mode === 'device') {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    };

    // ==========================================
    // Navigation
    // ==========================================
    const Navigation = {
        init: function() {
            this.navbarScroll();
            this.setActiveNav();
        },

        navbarScroll: function() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        },

        setActiveNav: function() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || 
                    (currentPage === '' && href === 'index.html') ||
                    (currentPage === 'index.html' && href === './')) {
                    link.classList.add('active');
                }
            });
        }
    };

    // ==========================================
    // Local Portfolio Assets
    // ==========================================
    const LocalAssets = {
        init: function() {
            this.loadPortfolioImages();
            this.loadCertificateImages();
        },

        loadPortfolioImages: function() {
            const designImages = [
                'assets/desain/proyekdesain%20(1).png',
                'assets/desain/proyekdesain%20(2).png',
                'assets/desain/proyekdesain%20(3).png'
            ];
            let designIndex = 0;

            document.querySelectorAll('.portfolio-card').forEach(card => {
                const category = card.dataset.category;
                let imageSource = '';

                if (category === 'design') {
                    imageSource = designImages[designIndex++];
                } else if (category === 'web') {
                    imageSource = 'assets/web/web.png';
                }

                if (!imageSource) return;

                const imageContainer = card.querySelector('.portfolio-image');
                const placeholder = card.querySelector('.portfolio-image-placeholder');
                if (!imageContainer || !placeholder) return;

                const image = document.createElement('img');
                image.className = 'portfolio-image-asset';
                image.src = imageSource;
                image.alt = card.querySelector('.portfolio-title')?.textContent.trim() || 'Portfolio Natan Waine';
                placeholder.replaceWith(image);
            });
        },

        loadCertificateImages: function() {
            const certificates = [
                { image: 'assets/sert/desainuniyap.jpg', title: 'Desain Branding untuk UMKM', issuer: 'Webinar FIKOM UNIYAP', year: '2023' },
                { image: 'assets/sert/dms.png', title: 'Staf Manajemen Data', issuer: 'Badan Nasional Sertifikasi Profesi', year: '2023' },
                { image: 'assets/sert/hcksprint.jpg', title: 'Peserta Hacksprint Papua', issuer: 'Gerakan Nasional 1000 Startup Digital', year: '2022' },
                { image: 'assets/sert/jna.jpg', title: 'Junior Network Administrator', issuer: 'Vocational School Graduate Academy', year: '2022' },
                { image: 'assets/sert/kj.jpg', title: 'Pelatihan Pengembangan SDM Papua', issuer: 'Pengembangan SDM Papua', year: '2023' },
                { image: 'assets/sert/okm.png', title: 'Operator Komputer Madya', issuer: 'Badan Nasional Sertifikasi Profesi', year: '2024' },
                { image: 'assets/sert/vccm.jpg', title: 'Video Content Creator Mastery', issuer: 'Thematic Academy', year: '2024' }
            ];

            const cards = [...document.querySelectorAll('.certificate-card')];
            cards.slice(certificates.length).forEach(card => card.remove());

            document.querySelectorAll('.certificate-card').forEach((card, index) => {
                const certificate = certificates[index];
                if (!certificate) return;

                const image = document.createElement('img');
                image.className = 'certificate-image';
                image.src = certificate.image;
                image.alt = certificate.title;
                card.querySelector('.certificate-icon')?.replaceWith(image);

                const title = card.querySelector('.certificate-title');
                const issuer = card.querySelector('.certificate-issuer');
                const date = card.querySelector('.certificate-date');
                if (title) title.textContent = certificate.title;
                if (issuer) issuer.textContent = certificate.issuer;
                if (date) date.lastChild.textContent = ` ${certificate.year}`;
            });
        }
    };

    // ==========================================
    // WhatsApp Popup
    // ==========================================
    const WhatsAppPopup = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            const whatsappBtn = document.querySelector('.whatsapp-btn');
            const popup = document.querySelector('.whatsapp-popup');
            const sendBtn = document.querySelector('.whatsapp-popup-send');
            const input = document.querySelector('.whatsapp-popup-input input');

            if (!whatsappBtn || !popup) return;

            whatsappBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                popup.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!popup.contains(e.target) && e.target !== whatsappBtn) {
                    popup.classList.remove('active');
                }
            });

            if (sendBtn && input) {
                sendBtn.addEventListener('click', () => {
                    this.sendMessage(input.value);
                });

                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.sendMessage(input.value);
                    }
                });
            }
        },

        sendMessage: function(message) {
            const phoneNumber = '6281344234657'; // Indonesia format without +
            const text = encodeURIComponent(message || 'Halo Natan Waine, saya tertarik dengan layanan Anda!');
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;
            window.open(whatsappURL, '_blank');
        }
    };

    // ==========================================
    // Portfolio Filter
    // ==========================================
    const PortfolioFilter = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioCards = document.querySelectorAll('.portfolio-card');

            if (!filterBtns.length || !portfolioCards.length) return;

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.dataset.filter;

                    // Filter cards
                    portfolioCards.forEach(card => {
                        const category = card.dataset.category;
                        
                        if (filter === 'all' || category === filter) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeInUp 0.5s ease';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }
    };

    // ==========================================
    // Contact Form
    // ==========================================
    const ContactForm = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            const form = document.querySelector('.contact-form form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });
        },

        handleSubmit: function(form) {
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !message) {
                this.showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.showNotification('Mohon masukkan alamat email yang valid', 'error');
                return;
            }

            // Simulate form submission (in real scenario, this would send to a server)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: rotate 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Create mailto link as fallback
                const mailtoSubject = encodeURIComponent(subject || 'Pesan dari Website Portofolio');
                const mailtoBody = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`);
                window.location.href = `mailto:wainenath1@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

                this.showNotification('Terima kasih! Pesan Anda sedang diproses. Aplikasi email Anda akan terbuka.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        },

        showNotification: function(message, type) {
            // Remove existing notification
            const existing = document.querySelector('.form-notification');
            if (existing) existing.remove();

            const notification = document.createElement('div');
            notification.className = 'form-notification';
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 24px;
                padding: 16px 24px;
                border-radius: 12px;
                color: #fff;
                font-weight: 500;
                z-index: 10000;
                animation: fadeInRight 0.4s ease;
                max-width: 350px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
            `;
            notification.textContent = message;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'fadeInRight 0.4s ease reverse';
                setTimeout(() => notification.remove(), 400);
            }, 4000);
        }
    };

    // ==========================================
    // Scroll Animations
    // ==========================================
    const ScrollAnimations = {
        init: function() {
            this.observeElements();
        },

        observeElements: function() {
            const elements = document.querySelectorAll('.service-card, .portfolio-card, .article-card, .certificate-card, .contact-info-card, .contact-form');
            
            if (!elements.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                        entry.target.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => {
                el.style.opacity = '0';
                observer.observe(el);
            });
        }
    };

    // ==========================================
    // Counter Animation
    // ==========================================
    const CounterAnimation = {
        init: function() {
            this.animateCounters();
        },

        animateCounters: function() {
            const counters = document.querySelectorAll('.stat-number[data-target]');
            
            if (!counters.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        },

        animate: function(element) {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeProgress);
                
                element.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target + '+';
                }
            }

            requestAnimationFrame(update);
        }
    };

    // ==========================================
    // Mobile Navigation Enhancement
    // ==========================================
    const MobileNav = {
        init: function() {
            this.enhanceMobileNav();
        },

        enhanceMobileNav: function() {
            // Add smooth transitions for mobile nav items
            const mobileItems = document.querySelectorAll('.mobile-nav-item');
            mobileItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    mobileItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    };

    // ==========================================
    // Initialize All Modules
    // ==========================================
    document.addEventListener('DOMContentLoaded', function() {
        ThemeManager.init();
        Navigation.init();
        LocalAssets.init();
        WhatsAppPopup.init();
        PortfolioFilter.init();
        ContactForm.init();
        ScrollAnimations.init();
        CounterAnimation.init();
        MobileNav.init();

        console.log('%cPortfolio Natan Waine', 'color: #38bdf8; font-size: 24px; font-weight: bold;');
        console.log('%cDesain Grafis | IT Konsultan | Web Developer Frontend', 'color: #d4af37; font-size: 14px;');
    });

})();
