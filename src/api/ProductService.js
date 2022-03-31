import client from './HttpClient';

class ProductService {
    getRecentlyAddedProducts = () => {
        return client.get("/products/latest", {mode: 'no-cors'})
            .then(response => response.data);
    }

    getMostViewedProducts() {
        return client.get("/products/most-visited", {mode: 'no-cors'})
            .then(response => response.data);
    }

    getProductDetails = (product_id) => {
        return client.get(`/products/${product_id}`).then(response => response.data);
    }

    productInWishlist() {
        return false;
    }

    addToWishList() {

    }

    removeToWishList() {

    }
}

export default new ProductService();