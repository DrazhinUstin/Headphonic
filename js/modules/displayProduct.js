import {getElement, formatPrice, displayError} from './utils.js';

const displayProduct = (product) => {
    // Check if there is no product
    if (!product) {
        displayError();
        return;
    }
    // If product exists, destructure an argument
    const {id, description, features, images, price, title} = product;
    // Set document title
    document.title = `Headphonic | ${title}`;
    // Set page hero
    getElement('.page-hero .center').innerHTML = `
    <a href="./index.html"><i class="fas fa-home"></i> Home</a> 
    /
    <a href="./product.html?id=${id}">${title}</a>`;
    // Display main image
    const image = document.createElement('img');
    image.src = images[0];
    image.alt = title;
    getElement('.product-image').prepend(image);
    // Display all images
    getElement('.images-wrapper').innerHTML = images.map(src => {
        return `<img src="${src}" alt="${title}">`;
    }).join('');
    getElement('.images-wrapper').children[0].classList.add('active');
    // Fill rest DOM with content
    getElement('.product-description h2').textContent = title;
    getElement('.product-description h3').textContent = formatPrice(price);
    getElement('.product-description p').textContent = description;
    getElement('.product-features').innerHTML = features.map(feature => {
        return `<li>
                    <i class="fas fa-check-circle"></i>
                    ${feature}
                </li>`;
    }).join('');
};

export default displayProduct;