/**
 * Modals (pop up messages)
 */

document.addEventListener('DOMContentLoaded', function() {
    initModals();
});

function initModals() {
    document.querySelectorAll('[id$="Modal"]').forEach(modal => {
        modal.classList.remove('visible');
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        }
    });

    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('[id$="Modal"]');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    document.querySelectorAll('[id$="Modal"]').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('[id$="Modal"].visible');
            if (visibleModal) {
                closeModal(visibleModal);
            }
        }
    });

    const successModal = document.getElementById('successModal');
    const closeSuccessButton = document.getElementById('closeModal');
    if (successModal && closeSuccessButton) {
        closeSuccessButton.addEventListener('click', () => {
            closeModal(successModal);
        });
    }
}

/**
 * @param {string} modalId
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
    
    document.body.classList.add('modal-open');
}

/**
 * @param {HTMLElement} modal
 */
function closeModal(modal) {
    modal.classList.remove('visible');
    
    setTimeout(() => {
        if (!document.querySelector('[id$="Modal"].visible')) {
            document.body.classList.remove('modal-open');
        }
    }, 300);
}

window.openModal = openModal;
window.closeModal = closeModal;