import client from "./HttpClient";

class SearchService {
    searchByCategory({keyword, pageNumber}) {
        return client.get(`/search/category?keyword=${keyword}&pageNumber=${pageNumber}`)
            .then(response => response.data);
    }

    searchBySubCategory({keyword, pageNumber}) {
        return client.get(`/search/sub-category?keyword=${keyword}&pageNumber=${pageNumber}`)
            .then(response => response.data);
    }

    searchByQuery({keyword, pageNumber}) {
        return client.get(`/search?keyword=${keyword}&pageNumber=${pageNumber}`)
            .then(response => response.data);
    }
}

export default new SearchService();