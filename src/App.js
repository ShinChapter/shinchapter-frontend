import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ExplanationPage from './pages/ExplanationPage';
import CameraPage from './pages/CameraPage';
import CharacterPage from './pages/CharacterPage';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/explanation' element={<ExplanationPage />} />
                <Route path='/camera' element={<CameraPage />} />
                <Route path='/character' element={<CharacterPage />} />
                <Route path='/home' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
