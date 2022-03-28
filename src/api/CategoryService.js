import client from './HttpClient';

class CategoryService {
    getCategoryList = () => {
        return client.get("/catogories/all")
            .then(response => response.data);

        /*
                return [
                    {
                        name: "Grocery",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
                    },
                    {
                        name: "Mobile",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
                    },
                    {
                        name: "Fashion",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100"
                    },
                    {
                        name: "Electronics",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
                    },
                    {
                        name: "Home",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100"
                    },
                    {
                        name: "Appliances",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
                    },
                    {
                        name: "Travel",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100"
                    },
                    {
                        name: "Travel",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100"
                    },
                    {
                        name: "Travel",
                        image: "https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100"
                    },
             ]
        */
    }
}

export default new CategoryService();