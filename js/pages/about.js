import {getStorageItem, setDate, hidePreloader} from '../modules/utils.js';
import {countCartItems} from '../modules/cart/setupCart.js';
import setSidebar from '../modules/setSidebar.js';
import setScrollBtn from '../modules/setScrollBtn.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = getStorageItem('cart');
    countCartItems(cart);
    setSidebar();
    setScrollBtn();
    setDate();
});

window.addEventListener('load', hidePreloader);