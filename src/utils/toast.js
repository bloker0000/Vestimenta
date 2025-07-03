/**
 * toasts (notifications onder rechts in de website)
 */

document.addEventListener('DOMContentLoaded', function() {
    initToastNotification();
    initNewsletterForm();
});

function initToastNotification() {
    const toast = document.getElementById('toast');
    
    if (toast) {
        const closeButton = toast.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                toast.classList.remove('show');
            });
        }
    }
}

/**
 * @param {string} message
 * @param {number} duration 
 */
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    
    if (toast) {
        const messageElement = toast.querySelector('.message');
        if (messageElement) {
            messageElement.textContent = message;
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('form:not(#contactForm)');
    const newsletterEmail = document.getElementById('newsletterEmail');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (newsletterEmail && newsletterEmail.validity.valid) {
                showToast('Succesvol aangemeld voor de nieuwsbrief!');
                newsletterForm.reset();
            }
            
            return false;
        });
    }
}

window.showToast = showToast;