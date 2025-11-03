// ===== Effet de lumière sur le logo =====
const logo = document.getElementById('logo');

if (logo) {
    logo.addEventListener('mousemove', (e) => {
        const rect = logo.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        logo.style.setProperty('--mouse-x', `${x}%`);
        logo.style.setProperty('--mouse-y', `${y}%`);
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.setProperty('--mouse-x', '50%');
        logo.style.setProperty('--mouse-y', '50%');
    });
}

// ===== Effet de lumière sur les liens de navigation =====
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        link.style.setProperty('--mouse-x', `${x}%`);
        link.style.setProperty('--mouse-y', `${y}%`);
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.setProperty('--mouse-x', '50%');
        link.style.setProperty('--mouse-y', '50%');
    });
});

// ===== Effet de lumière sur le bouton CV =====
const btnCV = document.querySelector('.btn-cv');
if (btnCV) {
    btnCV.addEventListener('mousemove', (e) => {
        const rect = btnCV.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        btnCV.style.setProperty('--mouse-x', `${x}%`);
        btnCV.style.setProperty('--mouse-y', `${y}%`);
    });
    
    btnCV.addEventListener('mouseleave', () => {
        btnCV.style.setProperty('--mouse-x', '50%');
        btnCV.style.setProperty('--mouse-y', '50%');
    });
}

// ===== Effet de lumière sur les boutons de langue =====
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        btn.style.setProperty('--mouse-x', `${x}%`);
        btn.style.setProperty('--mouse-y', `${y}%`);
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mouse-x', '50%');
        btn.style.setProperty('--mouse-y', '50%');
    });
});

// ===== Changement de langue =====
let currentLang = 'fr';

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang !== currentLang) {
            currentLang = lang;
            
            // Mettre à jour l'état actif des boutons
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Mettre à jour la langue du document
            document.documentElement.lang = lang;
            
            // Traduire tous les éléments avec data-fr et data-en
            const elements = document.querySelectorAll('[data-fr][data-en]');
            elements.forEach(el => {
                const translation = el.getAttribute(`data-${lang}`);
                if (translation) {
                    // Pour les titres avec highlight
                    if (el.querySelector('.highlight')) {
                        const highlightText = el.querySelector('.highlight').textContent;
                        el.innerHTML = `${translation} <span class="highlight">${highlightText}</span>`;
                    } else {
                        el.textContent = translation;
                    }
                }
            });
        }
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navigation Active State =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Animation au scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

console.log('Portfolio de Lucien Da Cunha - Chargé avec succès! 🚀');
