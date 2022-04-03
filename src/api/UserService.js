import client from "./HttpClient";
import authHeader from "./AuthHeader";

class UserService {
    getSavedAddresses() {
        return client.get('/user-details/address/display', {headers: authHeader()})
            .then(response => response.data)
    }

    saveNewAddress(address) {
        return client.post('/user-details/address/add', address, {headers: authHeader()})
            .then(response => response.data);
    }
}

export default new UserService();