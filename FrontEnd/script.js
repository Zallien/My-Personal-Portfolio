/* ---- Navbar scroll effect ---- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });

    /* ---- Active nav link on scroll ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    });

    /* ---- Scroll reveal ---- */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    /* ---- Gallery Slider ---- */
    const galleryState = {};

    function initGallery(id) {
      galleryState[id] = 0;
    }

    [1, 2, 3, 4, 5, 6].forEach(id => initGallery(id));

    function goToSlide(galleryId, index) {
      const track = document.getElementById(`gallery-track-${galleryId}`);
      const slides = track.querySelectorAll('.gallery-slide');
      const dots = document.querySelectorAll(`#dots-${galleryId} .gallery-dot`);
      const count = slides.length;

      index = (index + count) % count;
      galleryState[galleryId] = index;

      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function changeSlide(galleryId, direction) {
      const current = galleryState[galleryId] || 0;
      goToSlide(galleryId, current + direction);
    }

    /* ---- Auto-slide galleries ---- */
    [1, 2, 3, 4, 5, 6].forEach(id => {
      setInterval(() => {
        const current = galleryState[id] || 0;
        goToSlide(id, current + 1);
      }, 3000 + id * 400); // slight offset per gallery
    });

    /* ---- Project Filters ---- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        projectItems.forEach(item => {
          const category = item.dataset.category;
          const show = filter === 'all' || category === filter;
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = show ? '' : 'none';
            if (show) {
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              });
            }
          }, 200);
        });
      });
    });

    /* ---- Footer year ---- */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ---- Form submit handler ---- */
    function handleFormSubmit(btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        btn.style.background = 'var(--clr-accent3)';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1800);
    }