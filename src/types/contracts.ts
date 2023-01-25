
export type NotePostRequest = {
  body: string;
  title: string;
};

export type NoteResponse = {
  id?: string;
  body: string;
  title: string;
};

export type NotesResponse = NoteResponse[];

export type NotePatchRequest = Partial<NotePostRequest>;
