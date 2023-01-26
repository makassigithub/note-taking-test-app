import { Note } from './models/note.model';

export class InMomoryNoteBD {
  private content;
  private size;

  constructor() {
    this.content = {};
    this.size = 0;
  }

  getNotes = async () => Object.values(this.content) as Note[];

  getNoteById = async (id: string) => this.content[id];

  getSize = async () => this.size;

  addNote = async (note: Note) => {
    this.size += 1;
    const newNote = { ...note, id: this.size };
    this.content[this.size] = newNote;
    return newNote;
  };

  editNote = async (note: Note, id: string) => {
    if (!id || !this.content[id]) {
      throw new Error('note does not exist');
    }
    const newNote = { ...note, id: +id };
    this.content[id] = newNote;
    console.log('note updated', note);
    return newNote;
  };

  deleteNote = async (id: string) => {
    if (!id || !this.content[id]) {
      throw new Error('note does not exist');
    }
    delete this.content[id];
    this.size -= 1;
    return id;
  };
}
