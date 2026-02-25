(function () {
  'use strict';

  const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
  const smallMenu = document.querySelector('.header__sm-menu');
  const headerHamMenuBtn = document.querySelector('.header__main-ham-menu');
  const headerHamMenuCloseBtn = document.querySelector('.header__main-ham-menu-close');
  const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link');
  const headerLogoContainer = document.querySelector('.header__logo-container');

  function setMenuOpen(open) {
    if (!smallMenu || !headerHamMenuBtn || !headerHamMenuCloseBtn) return;
    if (open) {
      smallMenu.classList.add('header__sm-menu--active');
      headerHamMenuBtn.classList.add('d-none');
      headerHamMenuCloseBtn.classList.remove('d-none');
    } else {
      smallMenu.classList.remove('header__sm-menu--active');
      headerHamMenuBtn.classList.remove('d-none');
      headerHamMenuCloseBtn.classList.add('d-none');
    }
    if (hamMenuBtn) {
      hamMenuBtn.setAttribute('aria-expanded', String(open));
    }
  }

  function toggleMenu() {
    if (!smallMenu) return;
    const isOpen = smallMenu.classList.contains('header__sm-menu--active');
    setMenuOpen(!isOpen);
  }

  if (hamMenuBtn) {
    hamMenuBtn.addEventListener('click', toggleMenu);
    hamMenuBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  headerSmallMenuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  if (headerLogoContainer) {
    headerLogoContainer.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }
})();
