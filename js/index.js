import fetchProducts from './modules/fetchProducts.js';
import {getStorageItem, setStorageItem, hidePreloader} from './modules/utils.js';
import setCarousel from './modules/setCarousel.js';
import {countCartItems} from './modules/cart/setupCart.js';
import setHeroSlider from './modules/setHeroSlider.js';
import setupPage from './modules/setupPage.js';

document.addEventListener('DOMContentLoaded', async () => {
    setHeroSlider();
    setupPage();
    const store = await fetchProducts();
    const featured = store.filter(product => product.selected);
    const cart = getStorageItem('cart');
    setCarousel(featured);
    countCartItems(cart);
    setStorageItem('store', store);
});

window.addEventListener('load', hidePreloader);
