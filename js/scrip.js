 document.addEventListener('DOMContentLoaded', function () {
      const offcanvasEl = document.getElementById('offcanvasNavbar');

      // Instancia de Bootstrap desactivando la devolución de foco
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl, {
        restoreFocus: false
      });

      document.querySelectorAll('#offcanvasNavbar .nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');

          if (targetId && targetId.startsWith('#')) {
            e.preventDefault();

            // 1. Desactivamos la transición del offcanvas para que desaparezca al instante
            offcanvasEl.classList.add('no-transition');
            bsOffcanvas.hide();

            // 2. Restauramos la clase de transición cuando termine de ocultarse para futuros usos
            offcanvasEl.addEventListener('hidden.bs.offcanvas', function handler() {
              offcanvasEl.classList.remove('no-transition');
              offcanvasEl.removeEventListener('hidden.bs.offcanvas', handler);
            });

            // 3. Scroll suave hacia la sección seleccionada
            if (targetId === '#' || targetId === '#top' || targetId === '#inicio') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        });
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      function initSwiper() {
        document.querySelectorAll('.init-swiper').forEach((swiperElement) => {
          let config = {
            loop: true,
            speed: 600,
            autoplay: { delay: 5000 },
            slidesPerView: "auto",
            pagination: {
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true
            }
          };

          const configScript = swiperElement.querySelector('.swiper-config');
          if (configScript) {
            try {
              config = JSON.parse(configScript.innerHTML.trim());
            } catch (error) {
              console.error("Error al parsear el JSON de Swiper:", error);
            }
          }

          new Swiper(swiperElement, config);
        });
      }

      window.addEventListener('load', initSwiper);
    });