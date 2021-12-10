import fetchProducts from './modules/fetchProducts.js';
import {getStorageItem, setStorageItem, setDate, hidePreloader} from './modules/utils.js';
import displayProducts from './modules/displayProducts.js';
import {countCartItems} from './modules/cart/setupCart.js';
import setHeroSlider from './modules/setHeroSlider.js';
import setSidebar from './modules/setSidebar.js';
import setScrollBtn from './modules/setScrollBtn.js';

document.addEventListener('DOMContentLoaded', async () => {
    const store = await fetchProducts();
    const featured = store.filter(product => product.selected);
    const cart = getStorageItem('cart');
    displayProducts(featured);
    countCartItems(cart);
    setStorageItem('store', store);
    setHeroSlider();
    setSidebar();
    setScrollBtn();
    setDate();
});

window.addEventListener('load', hidePreloader);
