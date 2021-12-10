import {getElement, formatPrice} from '../utils.js';

const displayCart = (cart) => {
    // Check if cart is empty
    if (cart.length === 0) {
        getElement('.section.center').innerHTML = `
        <div class="error-wrapper">
            <h2>Your cart is empty!</h2>
            <img src="./images/empty_box.svg" alt="empty box">
            <a href="products.html" class="red button">Fill it now</a>
        </div>`;
        return;
    }
    // If not, add cart items
    getElement('.cart').innerHTML = cart.map(cartItem => {
        const {id, title, price, amount, images} = cartItem;
        return `<article class="cart-item">
                    <img src="${images[0]}" alt="${title}">
                    <div class="product">
                        <h3>${title}</h3>
                        <h4>${formatPrice(price)}</h4>
                    </div>
                    <div class="product-amount-btns">
                        <button class="decrease-amount-btn" data-id="${id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="product-amount">${amount}</span>
                        <button class="increase-amount-btn" data-id="${id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item-btn" data-id="${id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </article>`;
    }).join('');
};

export default displayCart;