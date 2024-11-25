import React, { createContext, useState, useContext, useEffect } from "react";
import API_BASE_URL from "../config";

const TranslationContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("EN");
  const [translatedText, setTranslatedText] = useState({});

  const translateAllText = async (texts, targetLang) => {
    try {
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts: Object.values(texts),
          target_lang: targetLang,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Translation API failed');
      }
  
      const data = await response.json();
      const translated = {};
      Object.keys(texts).forEach((key, index) => {
        translated[key] = data.translated_texts[index];
      });
      setTranslatedText(translated); // Update state with clean translations
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again later.');
    }
  };
  

  const handleLanguageChange = async (selectedLang) => {
    setLanguage(selectedLang);
    await translateAllText(texts, selectedLang);
  };

  useEffect(() => {
    setTranslatedText(texts);
  }, []);

  return (
    <TranslationContext.Provider value={{ language, translatedText, handleLanguageChange }}>
      {children}
    </TranslationContext.Provider>
  );
};
