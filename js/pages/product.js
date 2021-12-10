import {getStorageItem, setDate, hidePreloader} from '../modules/utils.js';
import displayProduct from '../modules/displayProduct.js';
import {countCartItems} from '../modules/cart/setupCart.js';
import addToCartLogic from '../modules/cart/addToCartLogic.js';
import setImgSwitcher from '../modules/setImgSwitcher.js';
import setSidebar from '../modules/setSidebar.js';
import setScrollBtn from '../modules/setScrollBtn.js';

document.addEventListener('DOMContentLoaded', () => {
    const store = getStorageItem('store');
    const cart = getStorageItem('cart');
    const id = window.location.search.slice(4);
    const singleProduct = store.find(product => product.id === id);
    if (!singleProduct) {
        displayProduct();
    } else {
        displayProduct(singleProduct);
        addToCartLogic(cart, singleProduct);
        setImgSwitcher();
    }
    countCartItems(cart);
    setSidebar();
    setScrollBtn();
    setDate();
});

window.addEventListener('load', hidePreloader);