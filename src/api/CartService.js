import client from "./HttpClient";
import AuthService from "./AuthService";
import authHeader from "./AuthHeader";

class CartService {
    // Add to cart
    addToCart(product) {
        return client.post('/shopping-cart/add', {
            quantity: product.quantity,
            productId: product.id,
        }, {
            headers: authHeader()
        })
            .then(response => {
                // get cart & add item
                let cart = localStorage.getItem('cart');

                // Check if cart present
                cart = cart ? JSON.parse(cart) : [];

                // add product
                let changed = false;

                cart = cart.map(p => {
                    if (p.id === product.id) {
                        p.quantity++;
                        changed = true;
                    }
                });

                if (!changed)
                    cart = [...cart, {
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        quantity: product.quantity
                    }];

                localStorage.setItem('cart', JSON.stringify([...cart]));

                return response.data.message;
            });
    }

    // remove from cart
    removeFromCart(product) {
        return client.delete('/shopping-cart/remove', {
            token: AuthService.getUserDetails().token,
            productId: product.id,
        }, {
            headers: authHeader()
        })
            .then((response) => {
                // get cart & add item
                let cart = localStorage.getItem('cart');

                // Check if cart present
                cart = cart ? JSON.parse(cart) : null;
                if (!cart) throw new Error("Cart is empty.")

                // add product
                let changed = false;

                cart = cart.filter(p => {
                    // found product
                    if (p.id === product.id) {
                        changed = true;
                        return p.quantity > 1 ? p.quantity-- && true : false;
                    }
                });

                if (!changed)
                    throw new Error("Product not in the cart")

                // store cart
                localStorage.setItem('cart', JSON.stringify([...cart]));

                return response.data.message;
            });
    }

    // fetch cart from backend
    getShoppingCart() {
        return client.get('/shopping-cart/display', {headers: authHeader()})
            .then(response => response.data)
    }

    getCartLength() {
        // get cart
        let cart = localStorage.getItem('cart');

        // Check if cart present
        return cart ? JSON.parse(cart).length : 0;
    }
}

export default new CartService();