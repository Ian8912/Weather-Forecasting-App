import React, { createContext, useState, useContext, useEffect } from "react";
import API_BASE_URL from "../config";

const TranslationContext = createContext();

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("EN");
  const [translatedText, setTranslatedText] = useState({});

  const translateAllText = async (texts, targetLang) => {
    try {
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texts: Object.values(texts),
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API returned status ${response.status}`);
      }

      const data = await response.json();
      const translated = {};
      Object.keys(texts).forEach((key, index) => {
        translated[key] = data.translated_texts[index];
      });

      setTranslatedText(translated);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  const handleLanguageChange = async (selectedLang) => {
    setLanguage(selectedLang);
    await translateAllText(texts, selectedLang);
  };

  useEffect(() => {
    setTranslatedText(texts); // Default translations for English
  }, []);

  return (
    <TranslationContext.Provider value={{ language, translatedText, handleLanguageChange }}>
      {children}
    </TranslationContext.Provider>
  );
};
