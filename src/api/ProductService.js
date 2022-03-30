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
}

export default new ProductService();