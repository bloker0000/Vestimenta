/**
 * contact form
 */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');

    if (!form || !submitButton) return;

    const validationRules = {
        firstName: {
            required: true,
            pattern: /^[a-zA-Z\u00C0-\u024F\s-]+$/,
            minLength: 2,
            errorMessage: 'Voornaam moet minimaal 2 letters bevatten'
        },
        lastName: {
            required: false,
            pattern: /^[a-zA-Z\u00C0-\u024F\s-]*$/,
            errorMessage: 'Achternaam mag alleen letters bevatten'
        },
        phone: {
            required: true,
            pattern: /^(06|010|020|030|070|071|072|073|074|075|076|077|078|079)[ -]?[0-9]{6,8}$/,
            errorMessage: 'Voer een geldig NL telefoonnummer in (bijv. 06-12345678)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Voer een geldig e-mailadres in'
        },
        postalCode: {
            required: false,
            pattern: /^[1-9][0-9]{3}\s?[A-Z]{2}$/,
            errorMessage: 'Voer een geldige postcode in (bijv. 1234 AB)'
        },
        city: {
            required: false,
            pattern: /^[a-zA-Z\u00C0-\u024F\s-]*$/,
            errorMessage: 'Woonplaats mag alleen letters bevatten'
        },
        instagram: {
            required: false,
            pattern: /^@[a-zA-Z0-9_.]{1,30}$/,
            errorMessage: 'Voer een geldig Instagram-handle in (bijv. @username)'
        },
        contactPreference: {
            required: true,
            errorMessage: 'Selecteer je voorkeur contactmethode'
        },
        question: {
            required: true,
            minLength: 10,
            errorMessage: 'Vraag moet minimaal 10 tekens bevatten'
        },
        privacyPolicy: {
            required: true,
            errorMessage: 'Je moet akkoord gaan met het privacybeleid'
        }
    };

    Object.keys(validationRules).forEach(fieldName => {
        const element = document.getElementById(fieldName);
        if (element) {
            if (element.type === 'checkbox') {
                element.addEventListener('change', () => validateForm());
            } else {
                element.addEventListener('input', () => validateForm());
                element.addEventListener('blur', () => {
                    validateField(fieldName, element.value);
                });
            }
        }
    });

    function validateForm() {
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const element = document.getElementById(fieldName);
            if (element) {
                const result = validateField(fieldName, element.value);
                if (!result.valid) isValid = false;
            }
        });

        const privacyPolicy = document.getElementById('privacyPolicy');
        if (privacyPolicy && !privacyPolicy.checked) {
            isValid = false;
        }

        submitButton.disabled = !isValid;
        return isValid;
    }

    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        const element = document.getElementById(fieldName);
        if (!element) return { valid: true };

        const errorElement = element.parentNode.querySelector('.error-message');
        const validIndicator = element.parentNode.querySelector('.valid-indicator');

        if (!rules.required && (value === '' || value === null)) {
            element.classList.remove('error', 'valid');
            if (errorElement) errorElement.textContent = '';
            if (validIndicator) validIndicator.classList.add('hidden');
            return { valid: true };
        }

        if (rules.required && (value === '' || value === null)) {
            element.classList.add('error');
            element.classList.remove('valid');
            if (errorElement) errorElement.textContent = 'Dit veld is verplicht';
            if (validIndicator) validIndicator.classList.add('hidden');
            return { valid: false, message: 'Dit veld is verplicht' };
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            element.classList.add('error');
            element.classList.remove('valid');
            if (errorElement) errorElement.textContent = rules.errorMessage;
            if (validIndicator) validIndicator.classList.add('hidden');
            return { valid: false, message: rules.errorMessage };
        }

        if (rules.minLength && value.length < rules.minLength) {
            element.classList.add('error');
            element.classList.remove('valid');
            if (errorElement) errorElement.textContent = rules.errorMessage;
            if (validIndicator) validIndicator.classList.add('hidden');
            return { valid: false, message: rules.errorMessage };
        }

        element.classList.remove('error');
        element.classList.add('valid');
        if (errorElement) errorElement.textContent = '';
        if (validIndicator) validIndicator.classList.remove('hidden');

        return { valid: true };
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            const normalState = submitButton.querySelector('.normal-state');
            const loadingState = submitButton.querySelector('.loading-state');

            normalState.classList.add('hidden');
            loadingState.classList.remove('hidden');

            setTimeout(() => {
                normalState.classList.remove('hidden');
                loadingState.classList.add('hidden');

                const successModal = document.getElementById('successModal');
                if (successModal && window.openModal) {
                    window.openModal('successModal');
                } else if (successModal) {
                    successModal.classList.add('visible');
                    document.body.classList.add('modal-open');
                }

                if (typeof window.showToast === 'function') {
                    window.showToast('Bericht succesvol verzonden!');
                }

                form.reset();

                Object.keys(validationRules).forEach(field => {
                    const element = document.getElementById(field);
                    if (element) {
                        element.classList.remove('error', 'valid');
                        const validIndicator = element.parentNode.querySelector('.valid-indicator');
                        if (validIndicator) validIndicator.classList.add('hidden');
                    }
                });

                submitButton.disabled = true;

            }, 1500);
        } else {
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500);
        }
    });
});