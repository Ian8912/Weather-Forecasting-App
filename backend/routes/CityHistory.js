const express = require('express');
const router = express.Router();

let cityHistory = [];

router.get('/recent-cities', (req, res) => {
    res.json(cityHistory); // Respond with the current city history
});

// Save a city to history
router.post('/save-city', (req, res) => {
    const { name, temperature, icon, weather, isSaved } = req.body;
  
    // Add basic validation
    if (!name || !temperature || !icon || !weather) {
        return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Check for duplicates
    const cityExists = cityHistory.find(city => city.name === name);
    if (cityExists) {
        return res.status(409).json({ error: 'City already exists' });
    }
  
    // Save the city
    const newCity = { name, temperature, icon, weather, isSaved };
    cityHistory.push(newCity);
    res.status(201).json(newCity);
});

module.exports = router; 
  