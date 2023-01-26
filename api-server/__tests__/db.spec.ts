import { InMomoryNoteBD } from '../db';
import { Note } from '../models/note.model';

describe('InMomoryNoteBD', () => {
  let db: InMomoryNoteBD;
  let testNote: Note;

  beforeEach(() => {
    db = new InMomoryNoteBD();
    testNote = { id: 1, title: 'test', body: 'test body' };
  });

  describe('After instanciation', () => {
    it('should be empty when created', async () => {
      const notes = await db.getNotes();
      const dbSize = await db.getSize();
      expect(notes).toEqual([]);
      expect(dbSize).toEqual(0);
    });
  });
  describe('addNote', () => {
    it('should had note to the in memory DB', async () => {
      await db.addNote(testNote);
      const notes = await db.getNotes();
      const dbSize = await db.getSize();
      expect(notes[0].id).toBe(1);
      expect(dbSize).toEqual(1);
    });
  });
  describe('getNoteById', () => {
    it('should find the right note by id and return it', async () => {
      await db.addNote(testNote);
      const note = await db.getNoteById('1');
      expect(note.id).toBe(1);
    });
  });
  describe('editNote', () => {
    it('should throw an exception if Id does not exist', async () => {
      await expect(db.editNote({ ...testNote }, '')).rejects.toThrow('note does not exist');
    });
    it('should update a note by Id', async () => {
      await db.addNote(testNote);
      await db.editNote({ ...testNote }, '1');
      const editedNote = await db.getNoteById('1');
      expect(editedNote.title).toBe('test');
    });
  });
  describe('deleteNote', () => {
    it('should throw an exception if Id does not exist', async () => {
      await expect(db.deleteNote('')).rejects.toThrow('note does not exist');
    });
    it('should delete a note by Id', async () => {
      await db.addNote(testNote);
      await db.deleteNote('1');
      const notes = await db.getNotes();
      const dbSize = await db.getSize();
      expect(notes).toEqual([]);
      expect(dbSize).toEqual(0);
    });
  });
});
