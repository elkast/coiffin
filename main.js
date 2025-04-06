import { gsap } from 'gsap';
import { ScrollTrigger } from 'scrollTrigger';
import Swiper from 'swiper';

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const floatingButton = document.querySelector('.floating-button');
const modal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close-modal');
const pricingTabs = document.querySelectorAll('.pricing-tab');

// Initialize Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close menu when clicking a navigation link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('transparent');
  } else {
    navbar.classList.remove('scrolled');
    if (window.location.hash === '' || window.location.hash === '#accueil') {
      navbar.classList.add('transparent');
    }
  }
}

// Set initial navbar state
if (window.location.hash === '' || window.location.hash === '#accueil') {
  navbar.classList.add('transparent');
}

// Handle scroll
window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('load', handleNavbarScroll);

// Tabs functionality
pricingTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    pricingTabs.forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Hide all content
    document.querySelectorAll('.pricing-content').forEach(content => {
      content.classList.remove('active');
    });
    
    // Show content of active tab
    const contentId = `${tab.dataset.tab}-content`;
    document.getElementById(contentId)?.classList.add('active');
  });
});

// Modal functionality
floatingButton.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// Initialize Gallery Swiper
const gallerySwiper = new Swiper('.gallery-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Initialize Testimonial Swiper
const testimonialSwiper = new Swiper('.testimonial-swiper', {
  spaceBetween: 30,
  pagination: {
    el: '.testimonial-pagination',
    clickable: true,
  },
});

// Generate Gallery Items
const galleryItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg',
    title: 'Balayage Signature',
    artist: 'Alexandre Moreau',
    category: 'couleurs'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/3993259/pexels-photo-3993259.jpeg',
    title: 'Coupe Architecturale',
    artist: 'Sophie Laurent',
    category: 'coupes'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
    title: 'Ondulations Parfaites',
    artist: 'Camille Dubois',
    category: 'coiffages'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/2950750/pexels-photo-2950750.jpeg',
    title: 'Métamorphose Totale',
    artist: 'Sophie Laurent',
    category: 'transformations'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/3992855/pexels-photo-3992855.jpeg',
    title: 'Chrome Élégant',
    artist: 'Alexandre Moreau',
    category: 'couleurs'
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg',
    title: 'Classique Revisité',
    artist: 'Camille Dubois',
    category: 'coupes'
  }
];

// Populate Gallery
const galleryWrapper = document.querySelector('.gallery-swiper .swiper-wrapper');
if (galleryWrapper) {
  galleryItems.forEach(item => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.setAttribute('data-category', item.category);
    
    slide.innerHTML = `
      <div class="gallery-item">
        <div class="gallery-image" style="background-image: url('${item.image}')">
          <div class="gallery-overlay">
            <span class="gallery-category">${item.category}</span>
            <div class="gallery-buttons">
              <button class="gallery-btn-zoom"><i class="fas fa-search-plus"></i></button>
              <button class="gallery-btn-like"><i class="far fa-heart"></i></button>
            </div>
          </div>
        </div>
        <div class="gallery-info">
          <h3>${item.title}</h3>
          <p>Par ${item.artist}</p>
        </div>
      </div>
    `;
    
    galleryWrapper.appendChild(slide);
  });
  
  // Update Swiper after adding slides
  gallerySwiper.update();
}

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(button => button.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Get filter value
    const filter = btn.getAttribute('data-filter');
    
    // Filter gallery items
    document.querySelectorAll('.gallery-swiper .swiper-slide').forEach(slide => {
      if (filter === 'all' || slide.getAttribute('data-category') === filter) {
        slide.style.display = '';
      } else {
        slide.style.display = 'none';
      }
    });
    
    // Update Swiper
    gallerySwiper.update();
  });
});

// Generate dynamic pricing content
const pricingContents = {
  hommes: [
    { name: 'Coupe Homme Styliste Junior', price: '45€' },
    { name: 'Coupe Homme Styliste Senior', price: '65€' },
    { name: 'Coupe & Barbe Complète', price: '85€' },
    { name: 'Rasage Traditionnel', price: '45€' },
    { name: 'Coloration Homme', price: '55€' }
  ],
  soins: [
    { name: 'Rituel Nourrissant Intense', price: '65€' },
    { name: 'Soin Réparateur Profond', price: '85€', featured: true },
    { name: 'Traitement Cuir Chevelu', price: '55€' },
    { name: 'Thérapie Kératine', price: '150€' },
    { name: 'Massage Crânien Détox', price: '45€' }
  ],
  experiences: [
    { name: 'Métamorphose Complète', price: '250€', featured: true },
    { name: 'Journée VIP', price: '350€' },
    { name: 'Service à Domicile', price: 'Sur demande' },
    { name: 'Séance Photo Post-Création', price: '150€' },
    { name: 'Consultation Esthétique Capillaire', price: '85€' }
  ]
};

// Generate pricing content for tabs
Object.keys(pricingContents).forEach(key => {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'pricing-content';
  contentContainer.id = `${key}-content`;
  
  const pricingGrid = document.createElement('div');
  pricingGrid.className = 'pricing-grid';
  
  pricingContents[key].forEach(item => {
    const pricingItem = document.createElement('div');
    pricingItem.className = 'pricing-item';
    if (item.featured) pricingItem.classList.add('featured');
    
    pricingItem.innerHTML = `
      <div class="pricing-name">${item.name}</div>
      <div class="pricing-price">${item.price}</div>
    `;
    
    pricingGrid.appendChild(pricingItem);
  });
  
  contentContainer.appendChild(pricingGrid);
  document.querySelector('.pricing').appendChild(contentContainer);
});

// Populate Booking Form
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
  bookingForm.innerHTML = `
    <div class="form-group">
      <input type="text" id="booking-name" required>
      <label for="booking-name">Votre nom</label>
    </div>
    <div class="form-group">
      <input type="email" id="booking-email" required>
      <label for="booking-email">Votre email</label>
    </div>
    <div class="form-group">
      <input type="tel" id="booking-phone" required>
      <label for="booking-phone">Votre téléphone</label>
    </div>
    <div class="form-group">
      <select id="booking-service" required>
        <option value="">Sélectionnez un service</option>
        <option value="creation">Création & Styling</option>
        <option value="coloration">Art Chromatique</option>
        <option value="rituel">Rituels & Métamorphoses</option>
        <option value="exclusif">Expériences Exclusives</option>
      </select>
    </div>
    <div class="form-group">
      <select id="booking-stylist" required>
        <option value="">Choisissez un artiste</option>
        <option value="sophie">Sophie Laurent</option>
        <option value="alexandre">Alexandre Moreau</option>
        <option value="camille">Camille Dubois</option>
        <option value="any">N'importe quel artiste disponible</option>
      </select>
    </div>
    <div class="form-group">
      <input type="date" id="booking-date" required>
      <label for="booking-date" class="hidden-label">Date souhaitée</label>
    </div>
    <div class="form-group">
      <input type="time" id="booking-time" required>
      <label for="booking-time" class="hidden-label">Heure souhaitée</label>
    </div>
    <div class="form-group">
      <textarea id="booking-notes"></textarea>
      <label for="booking-notes">Précisions sur votre demande (optionnel)</label>
    </div>
    <button type="submit" class="btn-booking">Réserver maintenant</button>
  `;
}

import {
  initLightEffect,
  initBlobAnimations,
  initParticles,
  initScrollAnimations,
  initGalleryEffects
} from './effects.js';

// Initialize all visual effects
document.addEventListener('DOMContentLoaded', () => {
  initLightEffect();
  initBlobAnimations();
  initParticles();
  initScrollAnimations();
  initGalleryEffects();
});

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
  .particle {
    position: absolute;
    background-color: var(--primary-color);
    border-radius: 50%;
    opacity: 0.3;
    animation: float-particle linear infinite;
  }
  
  @keyframes float-particle {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    25% {
      opacity: 0.3;
    }
    75% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-100vh) translateX(30px);
      opacity: 0;
    }
  }
  
  .gallery-item {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    height: 100%;
    background-color: white;
  }
  
  .gallery-image {
    height: 300px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .gallery-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    transition: opacity 0.3s ease;
  }
  
  .gallery-item:hover .gallery-overlay {
    opacity: 1;
  }
  
  .gallery-category {
    display: inline-block;
    padding: 5px 12px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 20px;
    font-size: 0.8rem;
    align-self: flex-start;
  }
  
  .gallery-buttons {
    display: flex;
    gap: 10px;
    align-self: flex-end;
  }
  
  .gallery-btn-zoom, .gallery-btn-like {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .gallery-btn-zoom:hover, .gallery-btn-like:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  .gallery-info {
    padding: 20px;
  }
  
  .gallery-info h3 {
    margin-bottom: 5px;
  }
  
  .gallery-info p {
    color: var(--primary-color);
    font-weight: 500;
  }
  
  .hidden-label {
    display: none;
  }
  
  .error {
    border-color: #ff3860 !important;
  }
`;

document.head.appendChild(style);

// Form validation and submission
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const inputs = form.querySelectorAll('input, textarea, select');
    let valid = true;
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value) {
        valid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    if (valid) {
      // Submit form or show success message
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours...';
      
      // Simulate form submission
      setTimeout(() => {
        form.reset();
        submitButton.textContent = 'Envoyé avec succès!';
        
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          
          // Close modal if it's a booking form
          if (form.classList.contains('booking-form')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
          }
        }, 2000);
      }, 1500);
    }
  });
});