import client from './HttpClient';

class AuthService {
    login(email, password) {
        return client
            .post("/auth/signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register({first_name, last_name, email, password, confirm_password}) {
        return axios.post("/auth/signup", {
            first_name,
            last_name,
            email,
            password,
            confirm_password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();