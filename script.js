document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const heroLeftArrow = document.querySelector('.slider-nav .left-arrow');
    const heroRightArrow = document.querySelector('.slider-nav .right-arrow');
    let currentSlide = 0;

    if (slides.length && dots.length) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                dots[i].classList.toggle('active', i === index);
            });
        }

        if (heroLeftArrow) {
            heroLeftArrow.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (heroRightArrow) {
            heroRightArrow.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-grid');
    const testimonialLeftArrow = document.querySelector('.testimonial-slider .slider-arrow.left-arrow');
    const testimonialRightArrow = document.querySelector('.testimonial-slider .slider-arrow.right-arrow');
    const testimonialWidth = document.querySelector('.testimonial')?.offsetWidth + 30 || 330;

    if (testimonialSlider && testimonialLeftArrow && testimonialRightArrow) {
        function updateTestimonialArrows() {
            const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
            testimonialLeftArrow.classList.toggle('hidden', testimonialSlider.scrollLeft <= 0);
            testimonialRightArrow.classList.toggle('hidden', testimonialSlider.scrollLeft >= maxScroll - 1);
        }

        testimonialLeftArrow.addEventListener('click', () => {
            testimonialSlider.scrollBy({ left: -testimonialWidth, behavior: 'smooth' });
        });

        testimonialRightArrow.addEventListener('click', () => {
            testimonialSlider.scrollBy({ left: testimonialWidth, behavior: 'smooth' });
        });

        testimonialSlider.addEventListener('scroll', updateTestimonialArrows);
        window.addEventListener('resize', updateTestimonialArrows);
        updateTestimonialArrows();
    }
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Cookie Consent Popup
window.addEventListener('load', () => {
    if (!localStorage.getItem('cookiesAccepted')) {
        const consentPopup = document.createElement('div');
        consentPopup.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: #0f3460; color: #e0e0e0; padding: 20px; border-radius: 10px; z-index: 1000; text-align: center;">
                <p>We use cookies to enhance your experience. By continuing, you agree to our <a href="cookies.html" style="color: #ff6b00;">Cookies Policy</a>.</p>
                <button id="acceptCookies" style="background: #ff6b00; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Accept</button>
            </div>
        `;
        document.body.appendChild(consentPopup);
        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            consentPopup.remove();
        });
    }
});