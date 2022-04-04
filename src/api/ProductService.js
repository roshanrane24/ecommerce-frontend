import client from './HttpClient';
import AuthService from "./AuthService";
import authHeader from "./AuthHeader";

class ProductService {
    // Get new products
    getRecentlyAddedProducts() {
        return client.get("/products/latest", {mode: 'no-cors'})
            .then(response => response.data);
    }

    // get popular products
    getMostViewedProducts() {
        return client.get("/products/most-visited", {mode: 'no-cors'})
            .then(response => response.data);
    }

    // get product by id
    getProductDetails(product_id) {
        return client.get(`/products/${product_id}`)
            .then(response => response.data);
    }

    // Check if product in wishlist
    productInWishlist(product_id) {
        // get wishlist from storage
        let wishlist = localStorage.getItem('wishlist');

        // check if wishlist available & parse list
        if (wishlist)
            wishlist = new Set(JSON.parse(wishlist));
        else
            return false;

        // check item is in wishlist
        return wishlist.has(product_id)
    }

    // Add to wishlist
    addToWishList(product_id) {
        return client.post('/wish-list/add', {
            token: AuthService.getUserDetails().token,
            productId: product_id,
        }, {
            headers: authHeader()
        })
            .then(response => {
                // get wishlist & add item
                let wishlist = localStorage.getItem('wishlist');

                // Check if wishlist present
                if (!wishlist) {
                    wishlist = new Set();
                } else {
                    wishlist = new Set(JSON.parse(wishlist));
                }

                // add product to wishlist & store in local storage
                wishlist.add(product_id);
                localStorage.setItem('wishlist', JSON.stringify([...wishlist]));

                return response.data.message;
            });
    }

    // remove from wishlist
    removeToWishList(product_id) {
        return client.delete('/wish-list/remove', {
            headers: authHeader(),
            data: {
                token: AuthService.getUserDetails().token,
                productId: product_id,
            }
        })
            .then(response => {
                // get wishlist & add item
                let wishlist = localStorage.getItem('wishlist');

                // parse wishlist
                wishlist = new Set(JSON.parse(wishlist));

                // remove product from wishlist & update in local storage
                wishlist.delete(product_id);
                localStorage.setItem('wishlist', JSON.stringify([...wishlist]));

                return response.data.message;
            });
    }

    // Get wishlist
    async getWishList() {
        // empty list;
        let wishlist = [];

        // get list
        await client.get(`/wish-list/${AuthService.getUserDetails().token}`)
            .then(response => {
                wishlist = response.data;
            })
            .catch(error => {
                wishlist = error.response;
            })

        return wishlist;
    }

    // For badge
    getWishListLength() {
        const wishlist = this.getWishList();
        console.log(typeof wishlist);
        return wishlist.length;
    }

    // Add to cart
    addToCart(product_id) {
        return client.post('/shopping-cart/add', {
            token: AuthService.getUserDetails().token,
            productId: product_id,
        }, {
            headers: authHeader()
        })
            .then(response => {
                return response.data.message;
            });
    }
}

export default new ProductService();