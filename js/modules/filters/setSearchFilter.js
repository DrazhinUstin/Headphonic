import displayProducts from "../displayProducts.js";
import {getElement, getElements} from "../utils.js";

const setSearchFilter = (products, maxPrice) => {
    // Search input
    const search = getElement('.search-input');
    // Add event listener
    search.addEventListener('input', () => {
        const value = search.value.trim().toUpperCase();
        if (!value) {
            displayProducts(products);
        } else {
            // Filter products
            const newProducts = products.filter(product => product.title.toUpperCase().startsWith(value));
            // Update store
            if (newProducts.length === 0) {
                getElement('.products').innerHTML = '<p class="no-products">Sorry, but there are no such products &#128560;</p>';
            } else {
                displayProducts(newProducts);
            }
        }
        // Return price filters to min-max value on case if they were changed
        getElements('.price-input')[0].value = 0;
        getElements('.price-input')[1].value = Math.ceil(maxPrice/100); 
    });
};

export default setSearchFilter;