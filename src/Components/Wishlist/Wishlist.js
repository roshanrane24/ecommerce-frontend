import React, {useEffect, useState} from 'react';
import ProductListCard from "../Commons/ProductListCard";
import WishListService from "../../api/WishListService";

const Wishlist = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        WishListService.getWishList()
            .then(cart => {
                setCartItems(cart);
                console.log(cart)
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <div>
            {
                cartItems.map(product => <ProductListCard product={product} wishlist/>)
            }
        </div>
    );
};

export default Wishlist;
