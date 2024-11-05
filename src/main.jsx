import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WeatherPage from './routes/WeatherCoordsPage.jsx'
import { TranslationProvider } from './routes/TranslationContext';

createRoot(document.getElementById('root')).render(
  <TranslationProvider>
    <StrictMode>
      <BrowserRouter>
    
        <Routes>
          
          <Route path="/" element={<App />} /> 
          <Route path="/coords/:lat/:long/" element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </TranslationProvider>
)
