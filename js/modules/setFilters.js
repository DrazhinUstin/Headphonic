import {getElement, getElements, getSession, setSession} from "./utils.js";
import displayProducts from "./displayProducts.js";
import Pagination from './Pagination.js';

const setFilters = (products) => {
    const brandsDOM = getElement('.filter-btns');
    const priceFilters = getElements('.price-input');
    const titleFilter = getElement('.search-input');
    const resetBtn = getElement('#reset-filters-btn');
    // Initial filters setup
    const maxPrice = setMinMaxPrice();
    displayBrands();
    // Initial pagination setup
    const amounPerPage = 9;
    const pagination = new Pagination(amounPerPage);
    pagination.setListener();
    // Initial launch
    const session = getSession('products');
    if (session.filters) restoreFiltersState();
    applyFilters(session.step || 0);

    brandsDOM.addEventListener('click', event => {
        if (event.target.tagName !== 'BUTTON') return;
        const brand = event.target;
        setActiveBrand(brand);
        applyFilters();
    });

    priceFilters.forEach(filter => {
        filter.addEventListener('change', () => applyFilters());
        filter.addEventListener('change', () => {
            if (!filter.value) filter.value = +filter.value;
        });
    });

    titleFilter.addEventListener('input', () => applyFilters());

    resetBtn.addEventListener('click', backToDefault);

    function applyFilters (index = 0) {
        let newProducts = filterByPrice(products);
        newProducts = filterByBrand(newProducts);
        newProducts = filterByTitle(newProducts);
        if (!newProducts.length) {
            getElement('.products').innerHTML = '<p class="no-products">Sorry, but there are no such products &#128560;</p>';
            pagination.hide();
        } else if (newProducts.length > amounPerPage) {
            pagination.paginate(newProducts, index);
        } else {
            displayProducts(newProducts);
            pagination.hide();
        }
        trackResetBtn();
        saveFiltersState(index);
    }

    function filterByPrice (products) {
        // Inputs values in cents
        const firstValue = priceFilters[0].value * 100;
        const secondValue = priceFilters[1].value * 100;
        // Filter by price
        return products.filter(product => product.price >= firstValue && product.price <= secondValue);
    }

    function filterByBrand (products) {
        const activeBrand = [...brandsDOM.children].find(brand => brand.classList.contains('active'));
        if (activeBrand.textContent === 'all') return products;
        else return products.filter(product => product.brand === activeBrand.textContent);
    }

    function filterByTitle (products) {
        const value = titleFilter.value.trim().toUpperCase();
        if (!value) return products;
        else return products.filter(product => product.title.toUpperCase().startsWith(value)); 
    }

    function setMinMaxPrice () {
        // Сalculate max price
        const maxPrice = products.reduce((value, product) => {
            if (value < product.price) value = product.price;
            return value;
        }, 0);
        const maxPrice$ = Math.ceil(maxPrice/100);
        // Set min-max price values
        priceFilters[0].value = 0;
        priceFilters[1].value = maxPrice$;
        return maxPrice$;
    }

    function displayBrands () {
         // Find brands
        const brands = products.reduce((array, product) => {
            if (!array.includes(product.brand)) array.push(product.brand);
            return array;
        }, ['all']);
        // Add brands to DOM
        brandsDOM.innerHTML = brands.map((brand, index) => {
            return `<button class="${index === 0 ? 'active' : ''}">${brand}</button>`;
        }).join('');
    }

    function setActiveBrand (brand) {
        [...brandsDOM.children].forEach(item => {
            item === brand ? item.classList.add('active') : item.classList.remove('active');
        });
    }

    function backToDefault (event) {
        event.preventDefault();
        setMinMaxPrice();
        setActiveBrand(brandsDOM.firstElementChild);
        titleFilter.value = '';
        applyFilters();
    }

    function trackResetBtn () {
        let areFiltersChanged = false;
        if (titleFilter.value.trim()) {
            areFiltersChanged = true;
        } else if (+priceFilters[0].value !== 0 || +priceFilters[1].value !== maxPrice) {
            areFiltersChanged = true;
        } else if (brandsDOM.querySelector('button.active').textContent !== 'all') {
            areFiltersChanged = true;
        }
        areFiltersChanged ? resetBtn.classList.add('active') : resetBtn.classList.remove('active');
    }

    function saveFiltersState (step) {
        session.filters = [];
        [...getElement('.filters').querySelectorAll('input, .filter-btns > .active')].forEach(elem => {
            if (elem.classList.contains('active')) {
                session.filters.push({brand: elem.textContent})
            } else {
                const {id, value} = elem;
                session.filters.push({id, value});
            }
        });
        setSession('products', {...session, step});
    }

    function restoreFiltersState () {
        [...getElement('.filters').querySelectorAll('input, .filter-btns')].forEach(elem => {
            if (elem.id) {
                const filter = session.filters.find(item => item.id === elem.id);
                elem.value = filter.value;
            } else {
                const filter = session.filters.find(item => item.brand);
                const brand = [...elem.children].find(item => item.textContent === filter.brand);
                setActiveBrand(brand);
            }
        });
    }
};

export default setFilters;