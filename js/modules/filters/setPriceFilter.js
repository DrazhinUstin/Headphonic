import displayProducts from "../displayProducts.js";
import {getElement, getElements} from "../utils.js";

const setPriceFilter = (products, maxPrice) => {
    // Price inputs
    const inputs = getElements('.price-input');
    // Set price inputs to min-max value
    inputs[0].value = 0;
    inputs[1].value = Math.ceil(maxPrice/100);
    // Listener for user input control
    inputs.forEach(input => {
        input.addEventListener('change', inputControl);
    });
    function inputControl () {
        if (this.value < 0) this.value = Math.abs(this.value);
        this.value = Math.round(this.value);
    }
    // Listener for filtering products by price
    inputs.forEach(input => {
        input.addEventListener('change', filterByPrice);
    });
    function filterByPrice () {
        // Inputs values in cents
        const firstValue = inputs[0].value * 100;
        const secondValue = inputs[1].value * 100;
        // Filtering products
        const newProducts = products.filter(product => {
            if (product.price >= firstValue && product.price <= secondValue) {
                return product;
            }
        });
        // Updating DOM
        if (newProducts.length === 0) {
            getElement('.products').innerHTML = '<p class="no-products">Sorry, but there are no such products &#128560;</p>';
        } else {
            displayProducts(newProducts);
        }
        // Clear search input on case if he had some value
        getElement('.search-input').value = '';
    }
};

export default setPriceFilter;











