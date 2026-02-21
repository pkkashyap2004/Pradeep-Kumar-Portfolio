// Controller for handling logic
class QueryController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.view.animateSections();
        this.view.animateProgressBars();
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
                this.view.showMessage(result.error, 'error');
            }
        } catch (error) {
            this.view.showMessage('Failed to submit query.', 'error');
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    setupNavHighlight() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
}