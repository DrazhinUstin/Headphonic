import { getElement, setStorageItem } from "../utils.js";

const addToCartLogic = (cart, product) => {
    // Product amount
    const amountDOM = getElement('.product-amount');
    const maxAmount = product.maxAmount;
    let amount = +amountDOM.textContent;
    // Check if product is already in cart
    const inCart = cart.find(cartItem => cartItem.id === product.id) ? true : false;
    if (inCart) {
        getElement('.red.button').textContent = 'in cart';
        getElement('.product-amount-btns').style.opacity = '0.7';
        getElement('.product-benefits').style.opacity = '0.7';
    }
    // Product amount switcher
    getElement('.product-amount-btns').addEventListener('click', event => {    
        if (inCart) return;    
        if (event.target.closest('.increase-amount-btn')) {
            amount++;
            if (amount > maxAmount) amount = maxAmount;
            amountDOM.textContent = amount;
        }
        if (event.target.closest('.decrease-amount-btn')) {
            amount--;
            if (amount < 1) amount = 1;
            amountDOM.textContent = amount;
        }
    });
    // Add to cart
    getElement('.red.button').addEventListener('click', () => {
        if (inCart) return;
        const cartItem = {...product, amount};
        cart.push(cartItem);
        setStorageItem('cart', cart);
    });
};

export default addToCartLogic;