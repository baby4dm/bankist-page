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
