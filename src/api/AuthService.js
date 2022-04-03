import client from './HttpClient';
import ProductService from "./ProductService";

class AuthService {

    login({email, password}) {
        return client.post("/auth/signin", {email, password})
            .then(response => {
                // Valid Login
                if (response.data.token) {
                    // Save user
                    localStorage.setItem('user', JSON.stringify(response.data));

                    // fetch wishlist
                    ProductService.getWishList().then(wishlist => {
                        localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
                    });
                }
                return response.data
            });
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(userDetails) {
        return client.post("/auth/signup", userDetails);
    }

    getUserDetails() {
        return JSON.parse(localStorage.getItem('user'))
    }
}

export default new AuthService();