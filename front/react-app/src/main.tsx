import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.tsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Detail from './pages/Detail.tsx';
import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/projects/:projectId" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>
);
