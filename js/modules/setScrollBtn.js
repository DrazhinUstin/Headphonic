const setScrollBtn = () => {
    // Create scroll btn
    const scrollBtn = document.createElement('button');
    scrollBtn.classList.add('scroll-top-btn');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.append(scrollBtn);
    // Set click event listener
    scrollBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
    // Set scroll event listener
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > document.documentElement.clientHeight) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
};

export default setScrollBtn;