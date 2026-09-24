// View for handling UI
class QueryView {
    constructor() {
        this.form = document.getElementById('queryForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
    }

    getFormData() {
        return {
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            message: this.messageInput.value.trim()
        };
    }

    clearForm() {
        this.nameInput.value = '';
        this.emailInput.value = '';
        this.messageInput.value = '';
    }

    showMessage(message, type) {
        const existingModal = document.querySelector('.custom-message-modal');
        if (existingModal) existingModal.remove();

        const isSuccess = type === 'success';
        const modal = document.createElement('div');
        modal.className = `custom-message-modal ${isSuccess ? 'success' : 'error'}`;
        modal.innerHTML = `
            <div class="message-backdrop"></div>
            <div class="message-card" role="dialog" aria-modal="true" aria-labelledby="message-title">
                <button class="message-close" type="button" aria-label="Close">&times;</button>
                <div class="message-icon" aria-hidden="true">${isSuccess ? '✓' : '!'}</div>
                <h3 id="message-title">${isSuccess ? 'Success!' : 'Error!'}</h3>
                <p>${message}</p>
                <button class="message-action" type="button">${isSuccess ? 'Continue' : 'Try Again'}</button>
            </div>`;

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
    }

    setupMobileMenu() {
        if (!this.menuToggle || !this.navLinks) return;
        this.menuToggle.addEventListener('click', () => {
            const open = this.navLinks.classList.toggle('open');
            this.menuToggle.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('nav-open', open);
        });

        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('open');
                this.menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
    }

    animateSections() {
        const sections = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            sections.forEach(section => section.classList.add('animate'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        sections.forEach(section => observer.observe(section));
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        if (!('IntersectionObserver' in window)) {
            progressBars.forEach(bar => {
                bar.style.width = `${bar.dataset.progress || 0}%`;
            });
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const value = Math.max(0, Math.min(100, Number(entry.target.dataset.progress || 0)));
                    entry.target.style.setProperty('--progress-width', `${value}%`);
                    entry.target.classList.add('fill');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        progressBars.forEach(bar => observer.observe(bar));
    }
}
