import React from 'react';
import { useTranslation } from '../routes/TranslationContext';

const LanguageSelector = () => {

    const { language, handleLanguageChange } = useTranslation();

    const handleChange = (event) => {
        handleLanguageChange(event.target.value);
      };
    
      return (
        <select value={language} onChange={handleChange}>
          <option value="EN">English</option>
          <option value="ES">Spanish</option>
          <option value="FR">French</option>
        </select>
      );
};

export default LanguageSelector;