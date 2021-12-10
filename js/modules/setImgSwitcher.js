import {getElement, getElements} from './utils.js';

const setImgSwitcher = () => {
    // Variables
    const imagesDOM = getElement('.product-images');
    const image = getElement('.product-image img');
    const images = getElements('.images-wrapper > *');
    let step = 0;
    // Event delegation
    imagesDOM.addEventListener('click', event => {
        if (event.target.closest('.right-slider-btn')) {
            images[step].classList.remove('active');
            step++;
            if (step > images.length - 1) step = 0;
            images[step].classList.add('active');
            image.src = images[step].src;
        }
        if (event.target.closest('.left-slider-btn')) {
            images[step].classList.remove('active');
            step--;
            if (step < 0) step = images.length - 1;
            images[step].classList.add('active');
            image.src = images[step].src;
        }
        if (event.target.closest('.images-wrapper > *')) {
            const target = event.target.closest('.images-wrapper > *');
            const index = images.indexOf(target);
            images.forEach(image => {
                if (image.classList.contains('active')) {
                    image.classList.remove('active');
                }
            });
            target.classList.add('active');
            image.src = target.src;
            step = index;
        }
    });
};

export default setImgSwitcher;