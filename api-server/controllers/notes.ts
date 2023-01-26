import { NextFunction, Request, Response } from 'express';
import { IController } from '../types/interfaces';
import { constants } from 'http2';
import { InMomoryNoteBD } from '../db';
import { Note } from '../models/note.model';

export class NotesController implements IController {
  private notes: InMomoryNoteBD;
  constructor(db: InMomoryNoteBD) {
    this.notes = db;
  }
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const savedNote = await this.notes.addNote(req.body);
      res.status(constants.HTTP_STATUS_CREATED).send(savedNote);
    } catch (err) {
      next(err);
    }
  };

  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notes: Note[] = await this.notes.getNotes();
      res.status(constants.HTTP_STATUS_OK).send(notes);
    } catch (err) {
      next(err);
    }
  };

  public read = async (req: Request, res: Response, next: NextFunction) => {
    const note: Note = await this.notes.getNoteById(req.params.noteId);
    if (note) res.status(constants.HTTP_STATUS_OK).send(note);
    else res.status(constants.HTTP_STATUS_NOT_FOUND).send();
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const note: Note = await this.notes.editNote(req.body, req.params.noteId);
      res.status(constants.HTTP_STATUS_OK).send(note);
    } catch (err) {
      next(err);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.notes.deleteNote(req.params.noteId);
      res.status(constants.HTTP_STATUS_NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };
}
