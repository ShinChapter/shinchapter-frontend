import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ExplanationPage from './pages/ExplanationPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/explanation' element={<ExplanationPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
