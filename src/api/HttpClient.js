const axios = require("axios");

const client = axios.create({
  // baseURL: "https://localhost:8443/api", // localhost
  // baseURL: 'https://ecommerce-app-cdac-acts.herokuapp.com/api', // Heroku
  baseURL: 'https://35.207.203.18:8081/api', // GCP
  timeout: 10000,
});
export default client;
