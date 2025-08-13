import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import ExplanationPage from './pages/ExplanationPage';
import InformationPage from './pages/InformationPage';
import CameraPage from './pages/CameraPage';
import HairPage from './pages/HairPage';
import CharacterPage from './pages/CharacterPage';
import HomePage from './pages/HomePage';
import MetaversePage from './pages/MetaversePage';
import MetaverseCameraPage from './pages/MetaverseCameraPage';
import SelectionPage from './pages/SelectionPage';
import AlbumPage from './pages/AlbumPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WelcomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/explanation' element={<ExplanationPage />} />
                <Route path='/information' element={<InformationPage />} />
                <Route path='/camera' element={<CameraPage />} />
                <Route path='/hair' element={<HairPage />} />
                <Route path='/character' element={<CharacterPage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/metaverse' element={<MetaversePage />} />
                <Route path='/pin' element={<MetaverseCameraPage />} />
                <Route path='/selection' element={<SelectionPage />} />
                <Route path='/album' element={<AlbumPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
