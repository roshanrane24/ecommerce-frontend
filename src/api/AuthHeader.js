export default function authHeader(userDetails) {
    // Get user from store
    const user = userDetails;

    if (user && user.accessToken) {
        return {Authorization: 'Bearer ' + user.accessToken}; // for Spring Boot back-end
    } else {
        return {};
    }
}