// Controller for handling logic
class QueryController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        if (this.view.form) {
            this.view.form.addEventListener('submit', this.handleSubmit.bind(this));
        }

        this.view.animateSections();
        this.view.animateProgressBars();
        this.view.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupNavHighlight();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { name, email, message } = this.view.getFormData();

        try {
            const result = await this.model.submitQuery(name, email, message);
            if (result.success) {
                this.view.showMessage('Query submitted successfully!', 'success');
                this.view.clearForm();
            } else {
                this.view.showMessage(result.error || 'Failed to submit query.', 'error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            this.view.showMessage('Failed to submit query. Please try again.', 'error');
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    setupNavHighlight() {
        const sections = document.querySelectorAll('main section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { threshold: 0.45, rootMargin: '-70px 0px -20% 0px' });

        sections.forEach(section => observer.observe(section));
    }
}
