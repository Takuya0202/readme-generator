import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from './Detail'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/projects' element={<Home />} />
        <Route path='/projects/:projectId' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
 