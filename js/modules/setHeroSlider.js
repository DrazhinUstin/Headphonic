import {getElement, getElements} from './utils.js';
import heroSliderData from './data/heroSliderData.js';

const setHeroSlider = () => {
    const slider = getElement('.hero-slider');
    populateHeroSlider(slider, heroSliderData);
    const slides = getElements('.slide');
    const stages = getElements('.slider-stages > *');
    const leftSliderBtn = getElement('.left-slider-btn');
    const rightSliderBtn = getElement('.right-slider-btn');
    const logos = getElements('.logo');
    const limitX = 100;
    let step = 0;
    let isDragging = false;
    let initX;
    let currentX;
    let initY;
    let currentY;

    slider.addEventListener('touchstart', startSwipe);

    slider.addEventListener('touchmove', moveSwipe);

    slider.addEventListener('touchend', endSwipe);

    slider.addEventListener('mousedown', startSwipe);

    slider.addEventListener('mousemove', moveSwipe);

    slider.addEventListener('mouseup', endSwipe);

    slider.addEventListener('mouseleave', endSwipe);

    slides.forEach(slide => {
        slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());
    });

    stages.forEach((stage, index) => {
        stage.addEventListener('click', () => {
            step = index;
            changeSlide();
        });
    });

    leftSliderBtn.addEventListener('click', () => {
        step--;
        changeSlide();
    });

    rightSliderBtn.addEventListener('click', () => {
        step++;
        changeSlide();
    });

    const getClientX = event => event.touches ? event.touches[0].clientX : event.clientX;

    const getClientY = event => event.touches ? event.touches[0].clientY : event.clientY;

    function startSwipe (event) {
        isDragging = true;
        initX = getClientX(event);
        initY = getClientY(event);
    }

    function moveSwipe (event) {
        if (!isDragging) return;
        currentX = getClientX(event);
        currentY = getClientY(event);
    }

    function endSwipe () {
        if (!isDragging) return;
        isDragging = false;
        const finalX = currentX - initX;
        const finalY = Math.abs(currentY - initY);
        if (Math.abs(finalX) <= limitX || Math.abs(finalX) <= finalY || !currentX) {
            currentX = null;
            currentY = null;
            return
        };
        finalX > 0 ? step-- : step++;
        changeSlide();
        currentX = null;
        currentY = null;
    }

    function changeSlide () {
        checkSlideStep();
        slides.forEach(slide => slide.classList.remove('active'));
        stages.forEach(stage => stage.classList.remove('active'));
        slides[step].classList.add('active');
        stages[step].classList.add('active');
        setupLogos();
    }

    function checkSlideStep () {
        if (step < 0) step = slides.length - 1;
        if (step > slides.length - 1) step = 0;
    }

    function setupLogos () {
        if (step % 2 === 0) {
            logos.forEach(logo => logo.classList.remove('show'));
        } else {
            logos.forEach(logo => logo.classList.add('show'));
        }
    }
};

const populateHeroSlider = (wrapper, data) => {
    wrapper.firstElementChild.innerHTML = data.map((item, index) => {
        const {heading, content, image} = item;
        return `<div class="slide ${index === 0 ? 'active' : ''}">
                    <img src="./images/slider/${image}" alt="headphones">
                    <div class="slide-content">
                        <h2>${heading}</h2>
                        <p>${content}</p>
                        <a href="./products.html" class="btn">Shop now</a>
                    </div>
                </div>`;
    }).join('');
    wrapper.lastElementChild.innerHTML = data.map((_, index) => {
        return `<span class="${index === 0 ? 'active' : ''}"></span>`;
    }).join('');
};

export default setHeroSlider;