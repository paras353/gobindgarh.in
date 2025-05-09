document.addEventListener('DOMContentLoaded', function() {
    // Preload images to avoid display issues
    function preloadImages() {
        const imageElements = document.querySelectorAll('.gallery-container img');
        
        let loadedImagesCount = 0;
        const totalImages = imageElements.length;
        
        imageElements.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadImage = new Image();
                preloadImage.src = src;
                
                preloadImage.onload = function() {
                    img.classList.add('preloaded');
                    loadedImagesCount++;
                    
                    // Ensure the active image is visible after loading
                    if (img.classList.contains('active')) {
                        img.style.opacity = 1;
                        img.style.visibility = 'visible';
                        img.style.zIndex = 1;
                    }
                };
                
                preloadImage.onerror = function() {
                    console.error('Error loading image:', src);
                    // Handle error - maybe show a fallback image
                    img.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                    img.classList.add('error');
                };
            }
        });
    }
    
    // Call preload function
    preloadImages();
    
    // Image Gallery Functionality
    const galleries = document.querySelectorAll('.image-gallery');
    
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.gallery-container img');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const dots = gallery.querySelectorAll('.dot');
        let currentIndex = 0;
        
        // Ensure all images have correct initial state
        images.forEach((img, index) => {
            img.style.opacity = index === 0 ? '1' : '0';
            img.style.visibility = index === 0 ? 'visible' : 'hidden';
            img.style.zIndex = index === 0 ? '1' : '0';
            if (index === 0) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
        
        // Initialize gallery
        function showImage(index) {
            // Hide all images
            images.forEach(img => {
                img.classList.remove('active');
                img.style.opacity = 0;
                img.style.visibility = 'hidden';
                img.style.zIndex = 0;
            });
            
            // Update dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show selected image
            currentIndex = index;
            images[currentIndex].classList.add('active');
            images[currentIndex].style.opacity = 1;
            images[currentIndex].style.visibility = 'visible';
            images[currentIndex].style.zIndex = 1;
            dots[currentIndex].classList.add('active');
        }
        
        // Force proper initialization
        showImage(0);
        
        // Previous button
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
        
        // Next button
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(index);
            });
        });
        
        // Touch swipe functionality for mobile
        let touchstartX = 0;
        let touchendX = 0;
        
        gallery.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
            stopAutoplay(); // Stop autoplay on touch
            e.stopPropagation();
        });
        
        gallery.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
            e.stopPropagation();
        });
        
        function handleSwipe() {
            const swipeThreshold = 30; // Reduced threshold for easier swiping
            if (touchendX < touchstartX - swipeThreshold) {
                // Swipe left - next image
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            } else if (touchendX > touchstartX + swipeThreshold) {
                // Swipe right - previous image
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            }
        }
        
        // Auto-play functionality
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, 5000); // Change image every 5 seconds
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Pause autoplay on hover/touch
        gallery.addEventListener('mouseenter', stopAutoplay);
        gallery.addEventListener('mouseleave', startAutoplay);
        
        // Start autoplay initially
        startAutoplay();
        
        // Add keyboard navigation when gallery is in focus
        gallery.tabIndex = 0; // Make gallery focusable
        gallery.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
                e.stopPropagation();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
                e.stopPropagation();
            }
        });
    });
    
    // Room filtering functionality
    const filterItems = document.querySelectorAll('.filter-item');
    const roomItems = document.querySelectorAll('.room-detailed');
    
    // Initially show all rooms
    showAllRooms();
    
    // Add click event to filter items
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all filters
            filterItems.forEach(filter => filter.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter rooms based on category
            filterRooms(filterValue);
            
            // Scroll to rooms showcase with smooth behavior
            document.querySelector('.rooms-showcase').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    function filterRooms(category) {
        roomItems.forEach(room => {
            const roomCategory = room.getAttribute('data-category');
            
            if (category === 'all' || category === roomCategory) {
                room.style.display = '';
                // Add fade-in animation
                room.classList.add('fade-in');
                setTimeout(() => {
                    room.classList.remove('fade-in');
                }, 500);
            } else {
                room.style.display = 'none';
            }
        });
    }
    
    function showAllRooms() {
        roomItems.forEach(room => {
            room.style.display = '';
        });
        
        // Set "All Rooms" filter as active by default
        filterItems.forEach(filter => {
            if (filter.getAttribute('data-filter') === 'all') {
                filter.classList.add('active');
            } else {
                filter.classList.remove('active');
            }
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            });
            
            // If clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Add animation for room cards when they come into view
    if ('IntersectionObserver' in window) {
        const roomCards = document.querySelectorAll('.room-detailed');
        
        const roomObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation of each card
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        roomCards.forEach(card => {
            roomObserver.observe(card);
        });
    }
    
    // Responsive images - Lazy loading
    if ('IntersectionObserver' in window) {
        const roomImages = document.querySelectorAll('.gallery-container img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // Only load image if it's visible
                    if (src.includes('unsplash')) {
                        // Add size parameters for optimal loading
                        img.src = `${src}?auto=format&fit=crop&w=1000&q=80`;
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        roomImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Enhanced mobile interaction for filter
    if (window.innerWidth <= 576) {
        // Horizontal scroll for filter on mobile with touch
        const filterContainer = document.querySelector('.filter-container');
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        filterContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            filterContainer.classList.add('active');
            startX = e.pageX - filterContainer.offsetLeft;
            scrollLeft = filterContainer.scrollLeft;
        });
        
        filterContainer.addEventListener('mouseleave', () => {
            isDown = false;
            filterContainer.classList.remove('active');
        });
        
        filterContainer.addEventListener('mouseup', () => {
            isDown = false;
            filterContainer.classList.remove('active');
        });
        
        filterContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - filterContainer.offsetLeft;
            const walk = (x - startX) * 2;
            filterContainer.scrollLeft = scrollLeft - walk;
        });
    }
    
    // View details link functionality
    document.querySelectorAll('.view-details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent room card
            const roomCard = this.closest('.room-detailed');
            
            // Toggle "expanded" class to show full description
            roomCard.classList.toggle('expanded');
            
            // Update link text based on state
            if (roomCard.classList.contains('expanded')) {
                this.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'View Room Details <i class="fas fa-chevron-right"></i>';
            }
        });
    });
    
    // Booking widget toggle functionality
    const bookingWidget = document.querySelector('.booking-widget');
    const bookingToggle = document.querySelector('.booking-widget-toggle');
    
    if (bookingToggle) {
        bookingToggle.addEventListener('click', function() {
            bookingWidget.classList.toggle('expanded');
            const icon = this.querySelector('i');
            if (bookingWidget.classList.contains('expanded')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    }
    
    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
