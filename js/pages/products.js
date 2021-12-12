import {getStorageItem, hidePreloader, displayError} from '../modules/utils.js';
import {countCartItems} from '../modules/cart/setupCart.js';
import setFilters from '../modules/setFilters.js';
import setupPage from '../modules/setupPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const store = getStorageItem('store');
    const cart = getStorageItem('cart');
    if (!store.length) {
        displayError(404);
    } else {
        setFilters(store);
    }
    countCartItems(cart);
    setupPage();
});

window.addEventListener('load', hidePreloader);