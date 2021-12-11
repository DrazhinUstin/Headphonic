import fetchProducts from './modules/fetchProducts.js';
import {getStorageItem, setStorageItem, hidePreloader} from './modules/utils.js';
import displayProducts from './modules/displayProducts.js';
import {countCartItems} from './modules/cart/setupCart.js';
import setHeroSlider from './modules/setHeroSlider.js';
import setupPage from './modules/setupPage.js';

document.addEventListener('DOMContentLoaded', async () => {
    const store = await fetchProducts();
    const featured = store.filter(product => product.selected);
    const cart = getStorageItem('cart');
    displayProducts(featured);
    countCartItems(cart);
    setStorageItem('store', store);
    setHeroSlider();
    setupPage();
});

window.addEventListener('load', hidePreloader);
