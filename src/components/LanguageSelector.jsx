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
            <select 
                placeholder="English" 
                value={language} 
                onChange={handleChange}
                className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-[#312e81] dark:text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-700">
                <option value="EN">English</option>
                <option value="ES">Spanish</option>
                <option value="FR">French</option>
            </select>
        </div>
      );
};

export default LanguageSelector;