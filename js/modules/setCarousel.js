import {getElement} from './utils.js';
import displayProducts from './displayProducts.js';

const setCarousel = (data) => {
    const carouselDOM = getElement('.carousel-wrapper');
    const stagesDOM = carouselDOM.nextElementSibling;
    const carousel = carouselDOM.querySelector('.carousel');
    const prevSlideBtn = carouselDOM.querySelector('.prev-slide-btn');
    const nextSlideBtn = carouselDOM.querySelector('.next-slide-btn');
    populateCarousel();
    const slides = [...carousel.children];
    let amountPerStep = defineAmountPerStep();
    let step = 0;
    let isDragging = false;
    let initX = 0;
    let currentX = 0;
    let xDiff = 0;
    let currentTranslate = 0;
    populateStages();

    slides.forEach(slide => {
        slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());
    });

    nextSlideBtn.addEventListener('click', () => {
        step++;
        switchSlide();
    });

    prevSlideBtn.addEventListener('click', () => {
        step--;
        switchSlide();
    });

    stagesDOM.addEventListener('click', event => {
        if (event.target.tagName !== 'SPAN') return;
        const stages = [...stagesDOM.children];
        const stage = event.target;
        const index = stages.indexOf(stage);
        step = index;
        switchSlide();
    });

    window.addEventListener('resize', () => {
        amountPerStep = defineAmountPerStep();
        switchSlide();
        populateStages();
    });

    carousel.addEventListener('mousedown', startSwipe);

    carousel.addEventListener('mousemove', moveSwipe);

    carousel.addEventListener('mouseup', endSwipe);

    carousel.addEventListener('mouseleave', endSwipe);

    carousel.addEventListener('touchstart', startSwipe);

    carousel.addEventListener('touchmove', moveSwipe);

    carousel.addEventListener('touchend', endSwipe);

    function populateCarousel () {
        displayProducts(data, carousel);
    }

    function populateStages () {
        const newData = data.slice(0, data.length - amountPerStep + 1);
        stagesDOM.innerHTML = newData.map(() => `<span></span>`).join('');
        setActiveStage();
    }

    function setActiveStage () {
        const stages = [...stagesDOM.children];
        stages.forEach((elem, index) => {
            index === step ? elem.classList.add('active') : elem.classList.remove('active');
        });
    }

    function defineAmountPerStep () {
        return Math.round(carousel.offsetWidth / slides[0].offsetWidth);
    }

    function switchSlide () {
        if (step < 0) step = data.length - amountPerStep;
        if (step > data.length - amountPerStep) step = 0;
        const slideWidth = slides[0].offsetWidth;
        currentTranslate = -slideWidth * step;
        displayTranslate(currentTranslate);
        setActiveStage();
    }

    function displayTranslate (translate) {
        carousel.style.transform = `translateX(${translate}px)`;
    }

    function startSwipe (event) {
        isDragging = true;
        initX = event.clientX || event.touches[0].clientX;
    }

    function moveSwipe (event) {
        if (!isDragging) return;
        currentX = event.clientX || event.touches[0].clientX;
        xDiff = currentX - initX;
        displayTranslate(currentTranslate + xDiff);
    }

    function endSwipe () {
        if (!isDragging) return;
        if (xDiff < -100) step++;
        if (xDiff > 100) step--;
        switchSlide();
        isDragging = false;
        xDiff = 0;
    }
};

export default setCarousel;