import {Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login.js';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import Header from './Components/Commons/Header';
import NotFound from './Components/Commons/NotFound';
import ErrorBoundary from "./Components/Commons/ErrorBoundary";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";
import ProductPage from "./Components/Product/ProductPage";
import Checkout from './Components/Checkout/Checkout.js';
import CheckOutProvider from "./Context/CheckOutContext";
import Search from "./Components/Search/Search";
import Profile from "./Components/Profile/Profile";
import Wishlist from "./Components/Wishlist/Wishlist";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";

const theme = createTheme({
    palette: {
        primary: {
            main: "#03dac6"
        },
        // secondary: {
        //     main: "#DA0318"
        // },
        background: {
            default: grey[100]
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CheckOutProvider>
                <CssBaseline/>
                <ErrorBoundary>
                    <Routes>
                        <Route path='/' element={<Header/>}>
                            <Route index element={<Home/>}/>
                            <Route path='/product/:product_id' element={<ProductPage/>}/>
                            <Route path='/search' element={<Search/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/wishlist' element={<Wishlist/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='/orders' element={<Orders/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Route>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/checkout' element={<Checkout/>}/>
                    </Routes>
                </ErrorBoundary>
            </CheckOutProvider>
        </ThemeProvider>
    );
}

export default App;
