// src/app.ts
import express from 'express';
import notesRouter from './routes/notes';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api', notesRouter);

export default app;
