import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WeatherPage from './routes/WeatherCoordsPage.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n}>
    <StrictMode>
      <BrowserRouter>
    
        <Routes>
          
          <Route path="/" element={<App />} /> 
          <Route path="/coords/:lat/:long/" element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </I18nextProvider>
)
