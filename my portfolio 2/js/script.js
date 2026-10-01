
// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

// Theme Toggle
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
let dark = false;

themeBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : '');

  themeBtn.innerHTML = dark
     ? '<i class="bi bi-brightness-high-fill" style="color:#ffd43b"></i>'
  : '<i class="bi bi-moon-fill" style="color:#64748b"></i>';
});

// Navbar scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Typing Effect
const roles = [
  'Web Designer',
  'Frontend Developer',
  'UI/UX Designer',
  'Graphic Designer',
  'Creative Coder'
];
let ri = 0, ci = 0, deleting = false;
const typeEl = document.getElementById('typewriter');
function type() {
  const current = roles[ri];
  if (!deleting) {
    typeEl.textContent = current.substring(0, ci + 1);
    ci++;
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typeEl.textContent = current.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1000);

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObs.observe(r));

// Skill bars
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObs.observe(skillsSection);

// Animated counters
function animateCount(el, target, suffix) {
  let start = 0;
  const dur = 2000, step = dur / target;
  const interval = setInterval(() => {
    start++;
    el.textContent = start + '+';
    if (start >= target) { clearInterval(interval); }
  }, step);
}
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCount(el, target, '+');
      });
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const statsSection = document.getElementById('stats');
if (statsSection) statsObs.observe(statsSection);

// Portfolio Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.4s ease';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Testimonials Slider
let currentSlide = 0;
const track = document.getElementById('testimonialsTrack');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = 3;
function goToSlide(idx) {
  currentSlide = (idx + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}
document.getElementById('sliderPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('sliderNext').addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach(d => d.addEventListener('click', () => goToSlide(parseInt(d.dataset.idx))));
setInterval(() => goToSlide(currentSlide + 1), 5000);

// Contact form
document.getElementById('submitBtn').addEventListener('click', () => {
  const btn = document.getElementById('submitBtn');
  btn.textContent = '✅ Sent Successfully!';
  btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
  setTimeout(() => {
    btn.innerHTML = '<span>✉</span> Send Message';
    btn.style.background = '';
  }, 3000);
});
// Smooth scroll nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
