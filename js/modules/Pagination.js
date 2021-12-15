import {getElement, getSession, setSession} from "./utils.js";
import displayProducts from "./displayProducts.js";

class Pagination {
    constructor (amountPerPage) {
        this.amountPerPage = amountPerPage;
        this.dom = getElement('.pagination');
    }

    paginate (data, index) {
        const newData = [];
        for (let amount = 0; amount < data.length; amount += this.amountPerPage) {
            const array = data.slice(amount, amount + this.amountPerPage);
            newData.push(array);
        }
        this.data = newData;
        this.step = index;
        displayProducts(this.data[this.step]);
        this.populate();
    }

    populate () {
        this.dom.innerHTML = this.data.map((_, index) => `<span>${index + 1}</span>`).join('');
        const leftBtn = document.createElement('button');
        leftBtn.innerHTML = '<i class="fas fa-angle-double-left"></i>';
        leftBtn.className = 'prev-page';
        const rightBtn = document.createElement('button');
        rightBtn.innerHTML = '<i class="fas fa-angle-double-right"></i>';
        rightBtn.className = 'next-page';
        this.dom.prepend(leftBtn);
        this.dom.append(rightBtn);
        this.setActivePage();
        this.dom.classList.add('active');
    }

    setListener () {
        this.dom.addEventListener('click', event => {
            if (event.target.closest('.next-page')) {
                this.step++;
                if (this.step > this.data.length - 1) this.step = 0;
                displayProducts(this.data[this.step]);
                this.setActivePage();
                this.saveState();
            } else if (event.target.closest('.prev-page')) {
                this.step--;
                if (this.step < 0) this.step = this.data.length - 1;
                displayProducts(this.data[this.step]);
                this.setActivePage();
                this.saveState();
            } else if (event.target.tagName === 'SPAN') {
                this.step = event.target.textContent - 1;
                displayProducts(this.data[this.step]);
                this.setActivePage();
                this.saveState();
            }
        });
    }

    setActivePage () {
        [...this.dom.querySelectorAll('span')].forEach((item, index) => {
            index === this.step ? item.classList.add('active') : item.classList.remove('active');
        });
    }

    hide () {
        this.dom.classList.remove('active');
        this.dom.innerHTML = '';
    }

    saveState () {
        const session = getSession('products');
        setSession('products', {...session, step: this.step});
    }
}

export default Pagination;