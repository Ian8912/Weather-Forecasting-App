import React from 'react';
import { useTranslation } from '../routes/TranslationContext';

const LanguageSelector = () => {
    const { language, handleLanguageChange } = useTranslation();

};

export default LanguageSelector;