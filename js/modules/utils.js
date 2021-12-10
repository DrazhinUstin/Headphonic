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
    document.querySelector('.date').textContent = year;
};
// Hide preloader
const hidePreloader = () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('hide');
};
// Display error message
const displayError = () => {
    document.querySelector('.section.center').innerHTML = `
        <div class="error-wrapper">
            <h2>Oops! Something went wrong...</h2>
            <img src="./images/UFO.svg" alt="UFO" />
            <a href="index.html" class="red button">Back home</a>
        </div>`;
};

export {setStorageItem, getStorageItem, formatPrice, getElement, getElements, setDate, hidePreloader, displayError};