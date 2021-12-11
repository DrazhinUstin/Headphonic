import {getStorageItem, hidePreloader, displayError} from '../modules/utils.js';
import displayCart from '../modules/cart/displayCart.js';
import {setupCart, countCartItems} from '../modules/cart/setupCart.js';
import setupPage from '../modules/setupPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = getStorageItem('cart');
    if (!cart.length) {
        displayError('empty_cart');
        countCartItems(cart);
    } else {
        displayCart(cart);
        setupCart(cart);
    }
    setupPage();
});

window.addEventListener('load', hidePreloader);