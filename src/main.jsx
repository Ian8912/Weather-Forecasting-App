import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WeatherPage from './routes/WeatherCoordsPage.jsx'
import { TranslationProvider } from './routes/TranslationContext';
import TailoredAdvice from './routes/TailoredAdvice.jsx'
import ContactPage from './routes/ContactPage.jsx'
import NewsPage from './routes/NewsPage.jsx'

createRoot(document.getElementById('root')).render(
  <TranslationProvider>
    <StrictMode>
      <BrowserRouter>
    
        <Routes>
          <Route path="/news" element={<NewsPage />} />
          <Route path="/" element={<App />} /> 
          <Route path="/coords/:lat/:long/" element={<WeatherPage />} />
          <Route path="/tailored-advice" element={<TailoredAdvice/>} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </TranslationProvider>
)
