import {getStorageItem, setDate, hidePreloader, displayError} from '../modules/utils.js';
import displayCart from '../modules/cart/displayCart.js';
import {setupCart, countCartItems} from '../modules/cart/setupCart.js';
import setSidebar from '../modules/setSidebar.js';
import setScrollBtn from '../modules/setScrollBtn.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = getStorageItem('cart');
    if (!cart.length) {
        displayError('empty_cart');
        countCartItems(cart);
    } else {
        displayCart(cart);
        setupCart(cart);
    }
    setSidebar();
    setScrollBtn();
    setDate();
});

window.addEventListener('load', hidePreloader);