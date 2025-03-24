$(document).ready(function() {
    // Mobile menu toggle
    $('.menu-toggle').click(function() {
        $('.nav-menu').toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.menu-toggle, .nav-menu').length) {
            $('.nav-menu').removeClass('active');
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
        
        // Close mobile menu after clicking a link
        $('.nav-menu').removeClass('active');
    });

    // App gallery rotation
    let currentIndex = 0;
    const galleryItems = $('.gallery-item');
    const totalItems = galleryItems.length;
    
    function rotateGallery() {
        galleryItems.removeClass('active');
        currentIndex = (currentIndex + 1) % totalItems;
        $(galleryItems[currentIndex]).addClass('active');
    }
    
    // Set initial active item
    $(galleryItems[currentIndex]).addClass('active');
    
    // Rotate gallery every 3 seconds
    setInterval(rotateGallery, 3000);
    
    // Testimonial carousel for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const testimonialContainer = $('.testimonials-container');
    
    testimonialContainer.on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });
    
    testimonialContainer.on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left, show next testimonial
            testimonialContainer.animate({
                scrollLeft: '+=320'
            }, 300);
        }
        
        if (touchEndX - touchStartX > 50) {
            // Swipe right, show previous testimonial
            testimonialContainer.animate({
                scrollLeft: '-=320'
            }, 300);
        }
    }
    
    // Add parallax effect to hero section
    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop();
        $('.hero').css('background-position', 'center ' + (scrollPosition * 0.2) + 'px');
    });
    
    // Animate elements when they come into view
    function animateOnScroll() {
        $('.feature, .pricing-plan, .testimonial').each(function() {
            const elementPosition = $(this).offset().top;
            const windowHeight = $(window).height();
            const scrollPosition = $(window).scrollTop();
            
            if (elementPosition < scrollPosition + windowHeight - 100) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    }
    
    //