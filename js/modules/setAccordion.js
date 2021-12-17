import {getElement} from './utils.js';

const setAccordion = (data) => {    
    const accordion = getElement('.accordion');
    
    populateAccordion(data);
    
    accordion.addEventListener('click', event => {
        const target = event.target.closest('.heading');
        if (!target) return;
        if (target.parentElement.classList.contains('active')) {
            target.parentElement.classList.remove('active');
            target.nextElementSibling.style.height = '';
        } else {
            setActiveItem(target.parentElement);
        }
    });
    
    window.addEventListener('resize', () => {
        const activeItem = accordion.querySelector('.active .content');
        if (activeItem) setHeight(activeItem);
    });
    
    function populateAccordion (data) {
        accordion.innerHTML = data.map(item => {
            const {heading, content} = item;
            return `<li>
                        <div class="heading">
                            <div class="plus-minus"><span></span></div>
                            <p>${heading}</p>
                        </div>
                        <div class="content">
                            <article>${content}</article>
                        </div>
                    </li>`;
        }).join('');
    }
    
    function setActiveItem (elem) {
        [...accordion.children].forEach(item => {
            if (item === elem) {
                item.classList.add('active');
                setHeight(item.lastElementChild);
            } else {
                item.classList.remove('active');
                item.lastElementChild.style.height = '';
            }
        });
    }
    
    function setHeight (elem) {
        const height = elem.firstElementChild.offsetHeight;
        elem.style.height = `${height}px`;
    }
};

export default setAccordion;