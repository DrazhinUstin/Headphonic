import {getElement, getElements, formatPrice, setStorageItem} from '../utils.js';
import displayCart from '../cart/displayCart.js';

const setupCart = (cart) => {
    // Clear cart
    getElement('.clear-cart-btn').addEventListener('click', event => {
        event.preventDefault();
        cart = [];
        displayCart(cart);
        countCartItems(cart);
        setStorageItem('cart', cart);
    });
    // Remove cart item
    getElements('.remove-item-btn').forEach(removeBtn => {
        removeBtn.addEventListener('click', event => {
            const id = event.currentTarget.dataset.id;
            cart = cart.filter(cartItem => cartItem.id !== id);
            setCartTotal(cart);
            countCartItems(cart);
            setStorageItem('cart', cart);
            if (cart.length !== 0) {
                event.currentTarget.parentElement.remove();
            } else {
                displayCart(cart);
            }
        });
    });
    // Cart item amount switcher
    getElement('.cart').addEventListener('click', event => {
        if (event.target.closest('.increase-amount-btn')) {
            const target = event.target.closest('.increase-amount-btn');
            const id = target.dataset.id;
            const cartItem = cart.find(cartItem => cartItem.id === id);
            cartItem.amount++;
            if (cartItem.amount > cartItem.maxAmount) cartItem.amount = cartItem.maxAmount;
            target.previousElementSibling.textContent = cartItem.amount;
            countCartItems(cart);
            setCartTotal(cart);
            setStorageItem('cart', cart);
        }
        if (event.target.closest('.decrease-amount-btn')) {
            const target = event.target.closest('.decrease-amount-btn');
            const id = target.dataset.id;
            const cartItem = cart.find(cartItem => cartItem.id === id);
            cartItem.amount--;
            if (cartItem.amount < 1) cartItem.amount = 1;
            target.nextElementSibling.textContent = cartItem.amount;
            countCartItems(cart);
            setCartTotal(cart);
            setStorageItem('cart', cart);
        }
    });
    // Set cart total
    function setCartTotal (cart) {
        const cartTotal = cart.reduce((total, cartItem) => {
            return total += cartItem.amount * cartItem.price;
        }, 0);
        getElement('.cart-total h4 span').textContent = formatPrice(cartTotal);
        getElement('.cart-total h3 span').textContent = formatPrice(cartTotal);
    }
    setCartTotal(cart);
    // Set cart items counter
    countCartItems(cart);
};

const countCartItems = (cart) => {
    const totalAmount = cart.reduce((total, cartItem) => {
        return total += cartItem.amount;
    }, 0);
    getElement('.cart-items-counter').textContent = totalAmount;
};

export {setupCart, countCartItems};