import {getElement} from './utils.js';

const setScrollBtn = () => {
    // Scroll top button
    const scrollBtn = getElement('.scroll-top-btn');
    // Scroll event listener
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > document.documentElement.clientHeight) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    // Click event listener
    scrollBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
};

export default setScrollBtn;