import {getElement, getElements} from './utils.js';

const setImgSwitcher = () => {
    // Variables
    const imagesDOM = getElement('.product-images');
    const mainImage = getElement('.product-image img');
    const images = getElements('.images-wrapper > *');
    let step = 0;
    // Event delegation
    imagesDOM.addEventListener('click', event => {
        if (event.target.closest('.right-slider-btn')) {
            step++;
            if (step > images.length - 1) step = 0;
            switchImage();
        }
        if (event.target.closest('.left-slider-btn')) {
            step--;
            if (step < 0) step = images.length - 1;
            switchImage();
        }
        if (event.target.closest('.images-wrapper > *')) {
            const target = event.target.closest('.images-wrapper > *');
            const index = images.indexOf(target);
            step = index;
            switchImage();
        }
    });
    // Switch image function
    function switchImage () {
        images.forEach((image, index) => index === step ? image.classList.add('active') : image.classList.remove('active'));
        mainImage.src = images[step].src;
    }
};

export default setImgSwitcher;