import {getElement, getElements} from './utils.js';

const setupPage = () => {
    const nav = getElement('.nav-container');
    const navLinks = getElements('.nav-menu a');
    const toggleBtn = getElement('.menu-toggle-btn');
    const scrollBtn = createScrollBtn();
    getElement('.date').textContent = new Date().getFullYear();

    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
        if (nav.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
            navLinks.forEach((link, index) => {
                link.style.animation = `appearance 0.8s ease ${0.2 + (0.2 * index)}s forwards`;
            });
        } else {
            document.body.style.overflow = '';
            navLinks.forEach(link => link.style.animation = '');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > document.documentElement.clientHeight) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    function createScrollBtn () {
        const scrollBtn = document.createElement('button');
        scrollBtn.classList.add('scroll-top-btn');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.append(scrollBtn);
        return scrollBtn;
    }
};

export default setupPage;