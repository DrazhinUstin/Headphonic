import {getStorageItem, setDate, hidePreloader, displayError} from '../modules/utils.js';
import displayProducts from '../modules/displayProducts.js';
import {countCartItems} from '../modules/cart/setupCart.js';
import setSidebar from '../modules/setSidebar.js';
import setScrollBtn from '../modules/setScrollBtn.js';
import setBrandsFilter from '../modules/filters/setBrandsFilter.js';
import setSearchFilter from '../modules/filters/setSearchFilter.js';
import setPriceFilter from '../modules/filters/setPriceFilter.js';

document.addEventListener('DOMContentLoaded', () => {
    const store = getStorageItem('store');
    const cart = getStorageItem('cart');
    const maxPrice = store.reduce((value, product) => {
        if (value < product.price) value = product.price;
        return value;
    }, 0);
    if (store.length === 0) {
        displayError(404);
    } else {
        displayProducts(store);
        setBrandsFilter(store, maxPrice);
        setSearchFilter(store, maxPrice);
        setPriceFilter(store, maxPrice);
    }
    countCartItems(cart);
    setSidebar();
    setScrollBtn();
    setDate();
});

window.addEventListener('load', hidePreloader);