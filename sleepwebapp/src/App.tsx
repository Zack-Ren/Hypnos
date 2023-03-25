import { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';

function App() {
    return (
          <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}/>
            </Routes>
          </BrowserRouter>
  );
}

export default App;
