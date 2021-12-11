import {getElement, formatPrice} from '../utils.js';

const displayCart = (cart) => {
    // Cart items container
    const cartDOM = getElement('.cart');
    // Add cart items to DOM
    cartDOM.innerHTML = cart.map(cartItem => {
        const {id, title, price, amount, images} = cartItem;
        return `<article class="cart-item">
                    <img src="${images[0]}" alt="${title}">
                    <div class="product">
                        <h3><a href="product.html?id=${id}">${title}</a></h3>
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