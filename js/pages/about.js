import {getStorageItem, hidePreloader} from '../modules/utils.js';
import {countCartItems} from '../modules/cart/setupCart.js';
import setupPage from '../modules/setupPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = getStorageItem('cart');
    countCartItems(cart);
    setupPage();
});

window.addEventListener('load', hidePreloader);