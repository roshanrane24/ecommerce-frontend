import client from './HttpClient';

class AuthService {
    login(email, password) {
        return client.post("/auth/signin", {
            email,
            password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register({firstName, lastName, email, password, confirmPassword}) {
        return client.post("/auth/signup", {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();