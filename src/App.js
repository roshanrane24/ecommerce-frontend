import {Route, Routes} from 'react-router-dom';
import Login from './components/login/Login.js';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Header from './components/commons/Header';
import NotFound from './components/commons/NotFound';
import UserProvider from "./Context/UserContext";
import ErrorBoundary from "./components/commons/ErrorBoundary";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";

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
            <UserProvider>
                <ErrorBoundary>
                    <Routes>
                        <Route path='/' element={<Header/>}>
                            <Route index element={<Home/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Route>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                    </Routes>
                </ErrorBoundary>
            </UserProvider>
        </ThemeProvider>
    )
        ;
}

export default App;
