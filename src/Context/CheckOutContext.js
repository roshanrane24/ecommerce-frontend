import React, {createContext, useState} from "react";

export const CheckOutContext = createContext(undefined);

const CheckOutProvider = (props) => {
    // states
    const [products, setProducts] = useState([]);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [billingAddress, setBillingAddress] = useState(null);

    const data = {
        products: {
            get: products,
            set: setProducts
        },
        address: {
            get: shippingAddress,
            set: setShippingAddress
        },
        billing: {
            get: billingAddress,
            set: setBillingAddress
        },
        clear: () => {
            this.products.set([]);
            this.address.set({});
            this.billing.set({});
        }
    }

    return (
        <CheckOutContext.Provider value={data}>
            {props.children}
        </CheckOutContext.Provider>
    );
};

export default CheckOutProvider;