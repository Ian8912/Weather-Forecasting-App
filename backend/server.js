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
