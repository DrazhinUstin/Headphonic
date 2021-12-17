import {getElement, getElements, formatPrice, setStorageItem, displayError} from '../utils.js';

const setupCart = (cart) => {
    // Clear cart
    getElement('#clear-cart-btn').addEventListener('click', event => {
        event.preventDefault();
        cart = [];
        displayError('empty_cart');
        countCartItems(cart);
        setStorageItem('cart', cart);
    });
    // Remove cart item
    getElements('.remove-item-btn').forEach(removeBtn => {
        removeBtn.addEventListener('click', event => {
            const id = event.currentTarget.dataset.id;
            cart = cart.filter(cartItem => cartItem.id !== id);
            countCartItems(cart);
            countCartTotal(cart);
            setStorageItem('cart', cart);
            cart.length !== 0 ? event.currentTarget.parentElement.remove() : displayError('empty_cart');
        });
    });
    // Switch cart item amount
    getElement('.cart').addEventListener('click', event => {
        if (event.target.closest('.increase-amount-btn')) {
            const target = event.target.closest('.increase-amount-btn');
            const id = target.dataset.id;
            const cartItem = cart.find(cartItem => cartItem.id === id);
            cartItem.amount++;
            if (cartItem.amount > cartItem.maxAmount) cartItem.amount = cartItem.maxAmount;
            target.previousElementSibling.textContent = cartItem.amount;
            countCartItems(cart);
            countCartTotal(cart);
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
            countCartTotal(cart);
            setStorageItem('cart', cart);
        }
    });

    function countCartTotal (cart) {
        const cartTotal = cart.reduce((total, cartItem) => {
            return total += cartItem.amount * cartItem.price;
        }, 0);
        getElement('.cart-total h4 span').textContent = formatPrice(cartTotal);
        getElement('.cart-total h3 span').textContent = formatPrice(cartTotal);
    }

    //Initial count 
    countCartTotal(cart);
    countCartItems(cart);
};

const countCartItems = (cart) => {
    const totalAmount = cart.reduce((total, cartItem) => {
        return total += cartItem.amount;
    }, 0);
    getElements('.cart-items-counter').forEach(elem => elem.textContent = totalAmount);
};

export {setupCart, countCartItems};