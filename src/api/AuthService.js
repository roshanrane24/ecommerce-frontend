import client from './HttpClient';
import WishListService from "./WishListService";
import CartService from "./CartService";


class AuthService {

    login({email, password}) {
        return client.post("/auth/signin", {email, password})
            .then(response => {
                // Valid Login
                if (response.data.token) {
                    // Save user
                    localStorage.setItem('user', JSON.stringify(response.data));

                    // fetch wishlist
                    WishListService.getWishList().then(wishlist => {
                        localStorage.setItem('wishlist', JSON.stringify(wishlist.map(item => item.id)));
                    });

                    // fetch cart
                    CartService.getShoppingCart().then(cart => {
                        localStorage.setItem('cart', JSON.stringify([...cart]));
                    });
                }
                return response.data
            });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('wishlist');
        localStorage.removeItem('cart');

    }

    register(userDetails) {
        return client.post("/auth/signup", userDetails);
    }

    getUserDetails() {
        return JSON.parse(localStorage.getItem('user'))
    }
}

export default new AuthService();