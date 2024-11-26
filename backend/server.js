import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json()); // Parses JSON payloads

// Dummy database (replace with a real database later)
let cityHistory = [];

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
