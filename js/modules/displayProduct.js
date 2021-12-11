import {getElement, formatPrice} from './utils.js';

const displayProduct = (product) => {
    // Destructure an argument
    const {id, description, features, images, price, title} = product;
    // Set document title
    document.title = `Headphonic | ${title}`;
    // Set page hero
    const a = document.createElement('a');
    a.href = `./product.html?id=${id}`;
    a.textContent = title;
    getElement('.stages .center').append(a); 
    // Display main image
    const image = document.createElement('img');
    image.src = images[0];
    image.alt = title;
    getElement('.product-image').prepend(image);
    // Display all images
    getElement('.images-wrapper').innerHTML = images.map((src, index) => {
        return `<img src="${src}" class="${index === 0 ? 'active' : ''}" alt="${title}">`;
    }).join('');
    // Fill rest DOM with content
    getElement('.product-description h2').textContent = title;
    getElement('.product-description h3').textContent = formatPrice(price);
    getElement('.product-description p').textContent = description;
    getElement('.product-features').innerHTML = features.map(feature => {
        return `<li><i class="fas fa-check-circle"></i> ${feature}</li>`;
    }).join('');
};

export default displayProduct;