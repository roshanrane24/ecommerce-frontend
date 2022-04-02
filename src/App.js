import {Route, Routes} from 'react-router-dom';
import Login from './components/login/Login.js';
import SignUp from './components/SignUp/SignUp';
import Home from './components/home/Home';
import Header from './components/commons/Header';
import NotFound from './components/commons/NotFound';
import ErrorBoundary from "./components/commons/ErrorBoundary";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";
import ProductPage from "./components/Product/ProductPage";
import Checkout from './components/Checkout/Checkout.js';
import CheckOutProvider from "./Context/CheckOutContext";

const theme = createTheme({
    palette: {
        background: {
            default: grey[100]
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<Header/>}>
                        <Route index element={<Home/>}/>
                        <Route path='product/:product_id' element={
                            <CheckOutProvider>
                                <ProductPage/>
                            </CheckOutProvider>
                        }/>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/checkout' element={
                        <CheckOutProvider>
                            <Checkout/>
                        </CheckOutProvider>
                    }/>
                </Routes>
            </ErrorBoundary>
        </ThemeProvider>
    )
        ;
}

export default App;
