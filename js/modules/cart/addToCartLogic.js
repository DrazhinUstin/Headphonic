import { getElement, setStorageItem } from "../utils.js";

const addToCartLogic = (cart, product) => {
    // DOM elements
    const addToCartBtn = getElement('#add-to-cart-btn');
    const amountBtnsDOM = getElement('.product-amount-btns');
    const amountDOM = getElement('.product-amount');
    // Check if product is already in cart
    const inCart = cart.find(cartItem => cartItem.id === product.id);
    if (inCart) {
        addToCartBtn.classList.add('disabled');
        addToCartBtn.textContent = 'in cart';
        amountBtnsDOM.classList.add('disabled');
        amountDOM.textContent = inCart.amount;
        return;
    }
    // If not, set amount value
    const maxAmount = product.maxAmount;
    let amount = +amountDOM.textContent;
    // Set amount listener
    amountBtnsDOM.addEventListener('click', event => {      
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
    // Set add to cart listener
    addToCartBtn.addEventListener('click', () => {
        const cartItem = {...product, amount};
        cart.push(cartItem);
        setStorageItem('cart', cart);
    });
};

export default addToCartLogic;