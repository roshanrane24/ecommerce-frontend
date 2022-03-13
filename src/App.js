import {Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/login/login.js';
import Register from './components/register/register';
import Home from './components/home/home';
import Header from './components/commons/Header';
import NotFound from './components/commons/NotFound';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Header/>}>
                <Route index element={<Home/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
        </Routes>
    )
        ;
}

export default App;
