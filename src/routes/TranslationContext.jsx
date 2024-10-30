import React, { createContext, useState, useContext, useEffect } from 'react';
import texts from '../texts';

const TranslationContext = createContext();

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');
  const [translatedText, setTranslatedText] = useState({});

  const translateAllText = async (texts, targetLang) => {
    const response = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts: Object.values(texts),
        target_lang: targetLang,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const translated = {};
      Object.keys(texts).forEach((key, index) => {
        translated[key] = data.translated_texts[index];
      });
      setTranslatedText(translated);
    } else {
      throw new Error(data.error || 'Translation failed');
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
    <TranslationContext.Provider value={{ language, translatedText, handleLanguageChange}}>
      {children}
    </TranslationContext.Provider>
  );
};