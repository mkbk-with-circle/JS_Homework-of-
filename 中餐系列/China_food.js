document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.content').classList.add('in-view');
            } else {
                entry.target.querySelector('.content').classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
