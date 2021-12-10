import {getStorageItem, setDate, hidePreloader} from '../modules/utils.js';
import displayCart from '../modules/cart/displayCart.js';
import {setupCart, countCartItems} from '../modules/cart/setupCart.js';
import setSidebar from '../modules/setSidebar.js';
import setScrollBtn from '../modules/setScrollBtn.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = getStorageItem('cart');
    displayCart(cart);
    if (cart.length > 0) {
        setupCart(cart);
    } else {
        countCartItems(cart);
    }
    setSidebar();
    setScrollBtn();
    setDate();
});

window.addEventListener('load', hidePreloader);