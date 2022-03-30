import client from './HttpClient';

class ProductService {
    getRecentlyAddedProducts = () => {
        return client.get("/products/latest")
            .then(response => response.data);
    }

    getProductDetails = (product_id) => {
        return client.get(`/products/${product_id}`).
            then(response => response.data);
    }
}

export default new ProductService();