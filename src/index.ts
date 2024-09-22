import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/notes'; // Import your routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// Use the imported routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export app for testing
export default app;