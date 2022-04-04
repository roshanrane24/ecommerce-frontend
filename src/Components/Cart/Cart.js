import React, {useEffect, useState} from 'react';
import CartService from "../../api/CartService";
import ProductListCard from "../Commons/ProductListCard";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        CartService.getShoppingCart()
            .then(cart => {
                setCartItems(cart);
                console.log(cart)
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <div>
            {
                cartItems.map(product => <ProductListCard product={product} cart/>)
            }
        </div>
    );
};

export default Cart;
