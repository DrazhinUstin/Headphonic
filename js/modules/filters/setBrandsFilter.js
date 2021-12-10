import displayProducts from "../displayProducts.js";
import {getElement, getElements} from "../utils.js";

const setBrandsFilter = (products, maxPrice) => {
    // Brands container
    const brandsDOM = getElement('.filter-btns');
    // Find brands
    const brands = products.reduce((array, product) => {
        if (!array.includes(product.brand)) {
            array.push(product.brand);
        }
        return array;
    }, ['all']);
    // Add brands to DOM
    brandsDOM.innerHTML = brands.map(brand => `<button>${brand}</button>`).join('');
    // Set event listener
    brandsDOM.addEventListener('click', event => {
        if (event.target.tagName !== 'BUTTON') return;
        const button = event.target;
        if (button.textContent === 'all') {
            displayProducts(products); 
        } else {
            const newProducts = products.filter(product => product.brand === button.textContent);
            displayProducts(newProducts);
        }
        // Return other filters to original value on case if they were changed
        getElement('.search-input').value = '';
        getElements('.price-input')[0].value = 0;
        getElements('.price-input')[1].value = Math.ceil(maxPrice/100);
    });
};

export default setBrandsFilter;