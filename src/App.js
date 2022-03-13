import {Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/login/login.js';
import Register from './components/register/register';
import Home from './components/home/home';
import Header from './components/commons/header';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Header />}>
                <Route index element={<Home/>}/>
            </Route>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>

        </Routes>
    )
        ;
}

export default App;
