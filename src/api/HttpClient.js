const axios = require('axios');

const client = axios.create({
    baseURL: 'https://ecommerce-app-cdac-acts.herokuapp.com/api',
    timeout: 1000
})
export default client;
