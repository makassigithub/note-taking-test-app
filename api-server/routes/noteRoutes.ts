import express from 'express';
import { NotesController } from '../controllers/notes';
import { InMomoryNoteBD } from '../db';

const notesRouter = express.Router();

const notesController = new NotesController(new InMomoryNoteBD());

notesRouter.post('/', notesController.create);
notesRouter.get('/', notesController.list);
notesRouter.get('/:noteId', notesController.read);
notesRouter.patch('/:noteId', notesController.update);
notesRouter.delete('/:noteId', notesController.delete);

export default notesRouter;