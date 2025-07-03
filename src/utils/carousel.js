document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (carousel && prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            if (touchStartX - touchEndX > 70) {
                carousel.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
            } else if (touchEndX - touchStartX > 70) {
                carousel.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                });
            }
        };
    }
}