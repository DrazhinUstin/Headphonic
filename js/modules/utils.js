// Set to local storage
const setStorageItem = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
};
// Get from local storage
const getStorageItem = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};
// Format price
const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value/100);
};
// Get element from DOM
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        return element;
    } else {
        return `Please, check out your selector ${selector}. There is no such element in DOM`;
    }
};
// Get elements from DOM
const getElements = (selector) => {
    const elements = document.querySelectorAll(selector);
    if (elements) {
        return [...elements];
    } else {
        return `Please, check out your selector ${selector}. There are no such elements in DOM`;
    }
};
// Set date
const setDate = () => {
    const year = new Date().getFullYear();
    getElement('.date').textContent = year;
};
// Hide preloader
const hidePreloader = () => {
    const preloader = getElement('.preloader');
    preloader.classList.add('hide');
    preloader.addEventListener('transitionend', () => preloader.remove());
};
// Display error message
const displayError = (key) => {
    let error;    
    if (key === 'empty_cart') {
        error = {message: 'Your cart is empty!', image: 'empty_box', link: {href: 'products.html', text: 'Fill it now'}};
    } else if (key === 404) {
        error = {message: 'Oops! Something went wrong...', image: 'UFO', link: {href: 'index.html', text: 'Back home'}};
    } else return;
    const {message, image, link: {href, text}} = error;
    getElement('.section.center').innerHTML = `
        <div class="error-wrapper">
            <h2>${message}</h2>
            <img src="./images/${image}.svg" alt="${image}" />
            <a href="${href}" class="red button">${text}</a>
        </div>`;
};

export {setStorageItem, getStorageItem, formatPrice, getElement, getElements, setDate, hidePreloader, displayError};