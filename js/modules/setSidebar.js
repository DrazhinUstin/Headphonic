import {getElement, getElements} from './utils.js';

const setSidebar = () => {
    // DOM elements
    const nav = getElement('.nav-container');
    const navLinks = getElements('.nav-menu a');
    const toggleBtn = getElement('.menu-toggle-btn');
    // Open/close sidebar
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
};

export default setSidebar;