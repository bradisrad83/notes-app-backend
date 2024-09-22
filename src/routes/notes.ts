// src/routes/routes.ts

import express, { Request, Response } from 'express';
import { Note } from '../models/note';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let notes: Note[] = [];

// GET /notes
router.get('/notes', (req: Request, res: Response) => {
  res.json(notes);
});

// GET /notes/:id
router.get('/notes/:id', (req: Request, res: Response) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// POST /notes
router.post('/notes', (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

  const newNote: Note = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT /notes/:id
router.put('/notes/:id', (req: Request, res: Response) => {
  const { title, content } = req.body;
  const noteIndex = notes.findIndex(n => n.id === req.params.id);
  if (noteIndex === -1) return res.status(404).json({ error: 'Note not found' });

  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };
  res.json(notes[noteIndex]);
});

// DELETE /notes/:id
router.delete('/notes/:id', (req: Request, res: Response) => {
  const noteIndex = notes.findIndex(n => n.id === req.params.id);
  if (noteIndex === -1) return res.status(404).json({ error: 'Note not found' });

  notes.splice(noteIndex, 1);
  res.status(204).send();
});

export default router;
