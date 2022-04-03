import React, {createContext, useState} from "react";

export const CheckOutContext = createContext(undefined);

const CheckOutProvider = (props) => {
    // states
    const [products, setProducts] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});

    const data = {
        products: {
            get: products,
            set: setProducts
        },
        address: {
            get: shippingAddress,
            set: setShippingAddress
        },
        clear: () => {
            this.products.set([]);
            this.address.set({});
            this.payment.set({});
        }
    }

    return (
        <CheckOutContext.Provider value={data}>
            {props.children}
        </CheckOutContext.Provider>
    );
};

export default CheckOutProvider;