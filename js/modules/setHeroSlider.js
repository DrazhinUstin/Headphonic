import {getElement, getElements} from './utils.js';

const setHeroSlider = () => {
    // Variables
    const slider = getElement('.hero-slider');
    const slides = getElements('.slide');
    const sliderCircles = getElements('.slider-circles > *');
    const leftSliderBtn = getElement('.left-slider-btn');
    const rightSliderBtn = getElement('.right-slider-btn');
    const logos = getElements('.logo');
    const limitX = 100;
    let slideStep = 0;
    let initialX;
    let currentX;
    let initialY;
    let currentY;

    // Mouse events listeners
    rightSliderBtn.addEventListener('click', () => {
        slideStep++;
        changeSlide();
    });
    leftSliderBtn.addEventListener('click', () => {
        slideStep--;
        changeSlide();
    });
    sliderCircles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            slideStep = index;
            changeSlide();
        });
    });

    // Touch events listeners
    slider.addEventListener('touchstart', event => {
        initialX = event.touches[0].clientX;
        initialY = event.touches[0].clientY;
    });
    slider.addEventListener('touchmove', event => {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
    });
    slider.addEventListener('touchend', () => {
        const finalX = currentX - initialX;
        const finalY = Math.abs(currentY - initialY);
        if (Math.abs(finalX) < limitX || Math.abs(finalX) < finalY || !currentX) {
            currentX = null;
            currentY = null;
            return;
        }
        if (finalX > 0) {
            slideStep--;
            changeSlide();
        } else {
            slideStep++;
            changeSlide();
        }
        currentX = null;
        currentY = null;
    });

    // Functions
    function changeSlide () {
        checkSlideStep();
        slides.forEach(slide => slide.classList.remove('active'));
        sliderCircles.forEach(circle => circle.classList.remove('active'));
        slides[slideStep].classList.add('active');
        sliderCircles[slideStep].classList.add('active');
        setupLogos();
    }
    function checkSlideStep () {
        if (slideStep < 0) slideStep = slides.length - 1;
        if (slideStep > slides.length - 1) slideStep = 0;
    }
    function setupLogos () {
        if (slideStep % 2 === 0) {
            logos.forEach(logo => logo.classList.remove('show'));
        } else {
            logos.forEach(logo => logo.classList.add('show'));
        }
    }
};

export default setHeroSlider;