// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        onComplete: () => {
            loader.style.display = 'none';
            initAnimations();
        }
    });
});

// Initialize Animations
function initAnimations() {
    // Hero Text Reveal
    gsap.from('.reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    });

    // Hero Subtext
    gsap.to('.hero-subtext', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Hero Buttons
    gsap.to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out'
    });

    // Hero Stats
    gsap.to('.hero-stats', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1,
        ease: 'power3.out'
    });

    // Hero Image
    gsap.to('.hero-image', {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    // Progress Bars Animation
    gsap.to('.progress-bar', {
        width: (i, target) => target.getAttribute('data-width'),
        duration: 1.5,
        delay: 1.2,
        stagger: 0.2,
        ease: 'power2.out'
    });
}

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

// Cursor Hover Effect
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .tilt-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

// Scroll Progress
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
});

// Particle System
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(window.innerWidth / 10, 100);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections
    particles.forEach((a, index) => {
        particles.slice(index + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(element => {
    gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    gsap.to(bar, {
        width: width,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: bar,
            start: 'top 90%'
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power2.out',
        scrollTrigger: {
            trigger: counter,
            start: 'top 90%'
        }
    });
});

// Project Details Data
const projectDetails = {
    'manufacturer': {
        title: 'U.S. Manufacturer Market Mapping',
        content: `
            <div class="space-y-4">
                <div class="flex gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">Market Research</span>
                    <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">NAICS</span>
                </div>
                <p class="text-gray-300 leading-relaxed">Comprehensive market segmentation project for 200+ U.S. manufacturers using NAICS codes and geospatial analysis.</p>
                <ul class="space-y-2 text-gray-400">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> 100% accuracy in business validation</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Interactive Excel dashboard delivered</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Geospatial mapping completed</li>
                </ul>
            </div>
        `
    },
    'b2b': {
        title: 'B2B Decision-Maker Enrichment',
        content: `
            <div class="space-y-4">
                <div class="flex gap-2 mb-4">
                    <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">B2B</span>
                    <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">CRM</span>
                </div>
                <p class="text-gray-300 leading-relaxed">Generated and enriched 200+ qualified B2B leads with verified contact details for enterprise CRM systems.</p>
                <ul class="space-y-2 text-gray-400">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> 95% email validity rate</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Salesforce integration</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Hunter.io verification</li>
                </ul>
            </div>
        `
    },
    'education': {
        title: 'Education Market Research',
        content: `
            <div class="space-y-4">
                <div class="flex gap-2 mb-4">
                    <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">Education</span>
                    <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Global</span>
                </div>
                <p class="text-gray-300 leading-relaxed">Comparative analysis of Indian and global universities, identifying market gaps and positioning strategies.</p>
                <ul class="space-y-2 text-gray-400">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> 50+ institutions analyzed</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> 5 countries covered</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Strategic recommendations provided</li>
                </ul>
            </div>
        `
    },
    'ecommerce': {
        title: 'Amazon/Walmart Competitive Analysis',
        content: `
            <div class="space-y-4">
                <div class="flex gap-2 mb-4">
                    <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">E-commerce</span>
                    <span class="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Analytics</span>
                </div>
                <p class="text-gray-300 leading-relaxed">Real-time pricing intelligence and catalog gap analysis for major e-commerce platforms.</p>
                <ul class="space-y-2 text-gray-400">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Real-time tracking dashboard</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Competitor analysis</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Automated MIS reports</li>
                </ul>
            </div>
        `
    },
    'moderation': {
        title: 'AI Image Moderation',
        content: `
            <div class="space-y-4">
                <div class="flex gap-2 mb-4">
                    <span class="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs">Trust & Safety</span>
                    <span class="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">AI</span>
                </div>
                <p class="text-gray-300 leading-relaxed">Reviewed and moderated 300+ AI-generated images daily with strict policy adherence.</p>
                <ul class="space-y-2 text-gray-400">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> 97% accuracy maintained</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> 100% SLA compliance</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Zero escalation rate</li>
                </ul>
            </div>
        `
    },
    'geospatial': {
        title: 'Business Location Intelligence',
        content: `
            <div class="space-y-4">
                <div class="flex gap-2 mb-4">
                    <span class="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs">Geospatial</span>
                    <span class="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">Mapping</span>
                </div>
                <p class="text-gray-300 leading-relaxed">Geospatial mapping and validation of business locations for market intelligence.</p>
                <ul class="space-y-2 text-gray-400">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> 100% location validation</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Market segmentation maps</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-green-400"></i> Interactive dashboard</li>
                </ul>
            </div>
        `
    }
};

function showProjectDetail(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const modalBody = document.getElementById('modalBody');
    const project = projectDetails[projectId];
    
    if (project) {
        modalBody.innerHTML = `
            <h2 class="text-3xl font-bold text-white mb-4">${project.title}</h2>
            ${project.content}
        `;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal on outside click
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Service Selection
function selectService(serviceName) {
    const select = document.getElementById('serviceSelect');
    select.value = serviceName;
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
    select.focus();
    select.classList.add('ring-2', 'ring-blue-500');
    setTimeout(() => select.classList.remove('ring-2', 'ring-blue-500'), 1000);
}

// Form Handling
function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        form.reset();
        success.classList.remove('hidden');
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        setTimeout(() => {
            success.classList.add('hidden');
        }, 5000);
    }, 1500);
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.querySelector('.glass').classList.add('shadow-lg');
    } else {
        navbar.querySelector('.glass').classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Update Year
document.getElementById('year').textContent = new Date().getFullYear();

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});