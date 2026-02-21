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
        // Simple alert for now
        alert(message);
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