module.exports = {
    input: ['src/**/*.{js,jsx}'],
    output: './locales',
    options: {
      lngs: ['en', 'es', 'de', 'fr'],
      func: {
        list: ['t'],
        extensions: ['.js', '.jsx'],
      },
      defaultLng: 'en',
      defaultNs: 'translation',
      resource: {
        loadPath: './locales/{{lng}}/translation.json',
        savePath: './locales/{{lng}}/translation.json',
        jsonIndent: 2,
      },
    },
  };