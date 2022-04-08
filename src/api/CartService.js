import client from "./HttpClient";
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
                    return p;
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

                return response.data;
            });
    }

    // remove from cart
    removeFromCart(product) {
        return client.delete('/shopping-cart/remove', {
            data: {
                quantity: product.quantity,
                productId: product.id,
            },
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
                    return true;
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
            .then(response => response.data);
    }

    // Get count of items in cart
    getCartLength() {
        // get cart
        let cart = localStorage.getItem('cart');

        // Check if cart present
        return cart ? JSON.parse(cart).length : 0;
    }

    // Remove a single product form cart
    removeProductFromCart(productId) {
        return client.delete('/shopping-cart/remove-product', {
            headers: authHeader(),
            data: {productId, quantity: 0}
        })
            .then(response => {
                // get cart & add item
                let cart = localStorage.getItem('cart');

                // Check if cart present
                cart = cart ? JSON.parse(cart) : null;
                if (!cart) throw new Error("Cart is empty.")

                // add product
                let changed = false;

                cart = cart.filter(p => {
                    if (p.id === productId) {
                        changed = true;
                        return false;
                    }
                    return true
                });

                if (!changed)
                    throw new Error("Product not in the cart")

                // store cart
                localStorage.setItem('cart', JSON.stringify([...cart]));

                return response.data.message;
            });
    }

    // Remove All products from cart
    emptyCart() {
        return client.delete('/shopping-cart/remove-product',
            {headers: authHeader()})
            .then(response => response.data);
    }
}

export default new CartService();