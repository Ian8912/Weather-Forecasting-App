import React from 'react';
import { useTranslation } from '../routes/TranslationContext';

const LanguageSelector = () => {

    const { language, handleLanguageChange } = useTranslation();

    const handleChange = (event) => {
        handleLanguageChange(event.target.value);
      };
    
      return (
        <div>
            <p className="mt-4 text-lg">Enter your perferred language.</p>
            <select placeholder="English" value={language} onChange={handleChange}>
            <option value="EN">English</option>
            <option value="ES">Spanish</option>
            <option value="FR">French</option>
            </select>
        </div>
      );
};

export default LanguageSelector;