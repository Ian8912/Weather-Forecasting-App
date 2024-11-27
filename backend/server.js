const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cityHistoryRoutes = require('./routes/CityHistory');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json()); // Parses JSON payloads

// Route handlers
app.use('/api', cityHistoryRoutes);

// Live city history or fetch logic could go here
// e.g., Fetch from a weather API if needed
const cityHistory = []; // Start with an empty array or fetch data as needed

app.get('/api/recent-cities', (req, res) => {
    console.log('Returning city history:', cityHistory); // Add logging to see the issue in the backend
    res.json(cityHistory);
  });
  
// Handle 404 errors for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
  });

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
