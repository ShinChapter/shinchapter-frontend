import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './pages/MainPage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
