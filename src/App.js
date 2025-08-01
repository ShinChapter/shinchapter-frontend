import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ExplanationPage from './pages/ExplanationPage';
import CameraPage from './pages/CameraPage';
import CharacterPage from './pages/CharacterPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/explanation' element={<ExplanationPage />} />
                <Route path='/camera' element={<CameraPage />} />
                <Route path='/character' element={<CharacterPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
