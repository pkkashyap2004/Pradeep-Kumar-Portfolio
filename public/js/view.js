// View for handling UI
class QueryView {
    constructor() {
        this.form = document.getElementById('queryForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
    }

    getFormData() {
        return {
            name: this.nameInput.value,
            email: this.emailInput.value,
            message: this.messageInput.value
        };
    }

    clearForm() {
        this.nameInput.value = '';
        this.emailInput.value = '';
        this.messageInput.value = '';
    }

    showMessage(message, type) {
        const existingModal = document.querySelector('.custom-message-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const isSuccess = type === 'success';
        const modal = document.createElement('div');
        modal.className = `custom-message-modal ${isSuccess ? 'success' : 'error'}`;
        modal.innerHTML = `
            <div class="message-backdrop"></div>
            <div class="message-card" role="dialog" aria-modal="true" aria-labelledby="message-title">
                <button class="message-close" type="button" aria-label="Close">&times;</button>
                <div class="message-icon" aria-hidden="true">
                    ${isSuccess ? '✓' : '!'}
                </div>
                <h3 id="message-title">${isSuccess ? 'Success!' : 'Error!'}</h3>
                <p>${message}</p>
                <button class="message-action" type="button">
                    ${isSuccess ? 'Continue' : 'Try Again'}
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.classList.add('modal-open');

        const closeModal = () => {
            modal.classList.add('closing');
            document.body.classList.remove('modal-open');
            setTimeout(() => modal.remove(), 180);
        };

        modal.querySelector('.message-backdrop').addEventListener('click', closeModal);
        modal.querySelector('.message-close').addEventListener('click', closeModal);
        modal.querySelector('.message-action').addEventListener('click', closeModal);

        const escapeHandler = (event) => {
            if (event.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };

        document.addEventListener('keydown', escapeHandler);
        modal.querySelector('.message-action').focus();
    }

    animateSections() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });
        sections.forEach(section => observer.observe(section));
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.setProperty('--progress-width', width);
        });
    }
}
