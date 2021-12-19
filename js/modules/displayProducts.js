import {getElement, formatPrice} from './utils.js';

const displayProducts = (products, productsDOM = getElement('.products')) => {
    productsDOM.innerHTML = products.map(product => {
        const {id, title, price, images} = product;
        return `<article class="product">
                    <div class="product-image">
                        <img src="${images[0]}" alt="${title}">
                        <a href="product.html?id=${id}" class="product-btn">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                    <h3>${title}</h3>
                    <h4>${formatPrice(price)}</h4>
                </article>`;
    }).join('');
};

export default displayProducts;