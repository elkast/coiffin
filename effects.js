import gsap from 'gsap';

export function initLightEffect() {
  const lightEffect = document.querySelector('.light-effect');
  if (!lightEffect) return;

  gsap.to(lightEffect, {
    opacity: 0.7,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
}

export function initBlobAnimations() {
  gsap.utils.toArray('.blob-frame, .member-blob, .blob-artists').forEach(blob => {
    gsap.to(blob, {
      duration: gsap.utils.random(8, 12),
      scale: gsap.utils.random(0.95, 1.05),
      rotate: gsap.utils.random(-5, 5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: gsap.utils.random(0, 2)
    });
  });
}

export function initParticles() {
  const container = document.getElementById('particle-container');
  if (!container) return;

  const count = window.innerWidth < 768 ? 15 : 30;
  
  Array.from({length: count}).forEach(() => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = gsap.utils.random(2, 5);
    const duration = gsap.utils.random(5, 10);
    
    gsap.set(particle, {
      width: size,
      height: size,
      left: gsap.utils.random(0, 100) + '%',
      top: gsap.utils.random(0, 100) + '%'
    });
    
    container.appendChild(particle);
    
    gsap.to(particle, {
      y: '-100vh',
      x: gsap.utils.random(-50, 50),
      rotation: gsap.utils.random(-360, 360),
      duration,
      delay: gsap.utils.random(0, 5),
      repeat: -1,
      ease: "none",
      opacity: {
        duration: duration / 2,
        yoyo: true,
        repeat: -1,
        values: [0, 0.3, 0]
      }
    });
  });
}

export function initScrollAnimations() {
  const selectors = {
    titles: '.section-title',
    cards: '.service-card',
    stats: '.stat',
    steps: '.process-step',
    team: '.team-member',
    testimonials: '.testimonial-content'
  };

  Object.values(selectors).forEach(selector => {
    gsap.utils.toArray(selector).forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });
  });
}

export function initGalleryEffects() {
  gsap.utils.toArray('.gallery-item').forEach(gallery => {
    const overlay = gallery.querySelector('.gallery-overlay');
    const image = gallery.querySelector('.gallery-image');
    
    gallery.addEventListener('mouseenter', () => {
      gsap.to([overlay, image], {
        duration: 0.3,
        ...overlay && {opacity: 1},
        ...image && {scale: 1.05}
      });
    });
    
    gallery.addEventListener('mouseleave', () => {
      gsap.to([overlay, image], {
        duration: 0.3,
        ...overlay && {opacity: 0},
        ...image && {scale: 1}
      });
    });
  });
}