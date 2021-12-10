const fetchProducts = async () => {
    try {
        // Contentfull
        const client = await contentful.createClient({
            space: 'k85fc407hkln',
            accessToken: 'dOjfLZoz1irlVMzhLmBValJFj9h5CdfdX-yb5BZrLKI'
        });
        // Fetching data       
        const response = await client.getEntries({
            content_type: 'headphonic'
        });
        // Destructuring data
        const products = response.items.map(product => {
            const {sys: {id}, fields: {brand, title, price, features, description, selected, maxAmount}} = product;
            const images = product.fields.images.map(image => image.fields.file.url);
            return {id, brand, title, price, features, description, selected, maxAmount, images};
        });
        // Sorting and returning data
        return products.sort((a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        });
    } catch (error) {
        console.log(error);
    }
};

export default fetchProducts;

