import client from "./HttpClient";
import authHeader from "./AuthHeader";

class OrderService {
    // Order Creation
    createOrder({products, billingAddressId, shippingAddressId}) {
        const productsList = products.map(product => {
            return {
                productId: product.id,
                quantity: product.quantity
            }
        });

        return client.post('/orders/create',
            {productsList, billingAddressId, shippingAddressId},
            {headers: authHeader()})
            .then(response => response.data)
    }

    // Update status of payment
    updatePaymentDetail({transactionId, orderId, status}) {
        return client.post('/orders/reduce-stock',
            {transactionId, orderId, status},
            {headers: authHeader()})
            .then(response => response.data);
    }

    // Get user's orders
    getUserOrders() {
        return client.get('/orders/display', {headers: authHeader()})
            .then(response => response.data);
    }

    //Get order's Invoice
    getOrderInvoice({orderId}) {
        console.log("Not Yet Implemented", orderId);
    }
}

export default new OrderService();
