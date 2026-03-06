'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const operationsTabContainer = document.querySelector(
  '.operations__tab-container',
);
const operationsContents = document.querySelectorAll('.operations__content');
const operationsTabs = document.querySelectorAll('.operations__tab');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header__title');
const sections = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dots = document.querySelector('.dots');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

operationsTabContainer.addEventListener('click', e => {
  const current = e.target.closest('.operations__tab');
  if (!current) return;
  operationsTabs.forEach(t => t.classList.remove('operations__tab--active'));
  current.classList.add('operations__tab--active');
  operationsContents.forEach(c =>
    c.classList.remove('operations__content--active'),
  );
  document
    .querySelector(`.operations__content--${current.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

const scrollNav = function (entries) {
  const [current] = entries;
  if (!current.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const options = {
  root: null,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
  threshold: 0,
};
const headerObserver = new IntersectionObserver(scrollNav, options);
headerObserver.observe(header);

const revealSection = function (entries) {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.remove('section--hidden');
    sectionObserver.unobserve(e.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(s => {
  s.classList.add('section--hidden');
  sectionObserver.observe(s);
});

const loadImage = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  imageObserver.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0.8,
});

lazyImages.forEach(i => {
  imageObserver.observe(i);
});

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
const addDots = function () {
  for (let i = 0; i < slides.length; i++) {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`,
    );
  }
  document.querySelector('.dots__dot').classList.add('dots__dot--active');
};
const init = function () {
  goToSlide(0);
  addDots();
};

const setActiveDot = function (i) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(d => d.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide='${i}']`)
    .classList.add('dots__dot--active');
};

let currentSlide = 0;
const maxSlide = slides.length - 1;
btnRight.addEventListener('click', () => {
  currentSlide++;
  if (currentSlide > maxSlide) {
    currentSlide = 0;
  }
  goToSlide(currentSlide);
  setActiveDot(currentSlide);
});
btnLeft.addEventListener('click', () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = maxSlide;
  }
  goToSlide(currentSlide);
  setActiveDot(currentSlide);
});

document.body.classList.add('no-animation');

init();

setTimeout(() => {
  document.body.classList.remove('no-animation');
}, 0);
