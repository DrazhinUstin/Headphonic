import {getStorageItem, hidePreloader} from '../modules/utils.js';
import {countCartItems} from '../modules/cart/setupCart.js';
import FAQdata from '../modules/data/FAQdata.js';
import setAccordion from '../modules/setAccordion.js';
import setupPage from '../modules/setupPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = getStorageItem('cart');
    countCartItems(cart);
    setAccordion(FAQdata);
    setupPage();
});

window.addEventListener('load', hidePreloader);