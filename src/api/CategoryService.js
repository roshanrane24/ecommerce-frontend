import client from './HttpClient';

class CategoryService {
    getCategoryList() {
        return client.get("/categories/all")
            .then(response => response.data)
            .catch(error => {
                return [
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                    {
                        categoryName: "Grocery",
                        imageName: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
                        subCategory: [
                            "a",
                            "b",
                            "c"
                        ]
                    },
                ]
            });

    }
}

export default new CategoryService();