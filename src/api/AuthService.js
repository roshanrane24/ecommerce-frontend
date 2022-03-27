import client from './HttpClient';

class AuthService {

    login(email, password, setUserDetails) {
        return client.post("/auth/signin", {
            email,
            password
        }).then(response => {
            // Valid Login
            if (response.data.token)
                // Save user
                setUserDetails(response.data)
            return response.data;
        });
    }

    logout(setUserDetails) {
        setUserDetails(null);
    }

    register(userDetails) {
        return client.post("/auth/signup", userDetails);
    }
}

export default new AuthService();