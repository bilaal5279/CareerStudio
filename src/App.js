import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Loginform from './pages/Loginform';
import Uploadpage from './pages/Uploadpage';
import Jobdescriptionpage from './pages/Jobdescriptionpage';
import Finishedpage from './pages/Finishedpage';
import '././index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


  
function App() {


  return (
    <div>
      <AuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Loginform/>}/>
        <Route path="/upload" element={<ProtectedRoute><Uploadpage/></ProtectedRoute>}/>
        <Route path="/jobdescription" element={<ProtectedRoute><Jobdescriptionpage/></ProtectedRoute>}/>
        <Route path="/completed" element={<ProtectedRoute><Finishedpage/></ProtectedRoute>}/>
      </Routes>
      </AuthContextProvider>
    </div>
    
  );
}

export default App;