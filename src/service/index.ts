// @ts-ignore
import axios from 'axios';
import { NotesResponse, NoteResponse, NotePostRequest, NotePatchRequest } from '../types';
class NoteService {
  service = axios.create({ baseURL: 'http://localhost:4000/notes' });

  getNotes = async (): Promise<NotesResponse> => {
    return (await this.service.get<NotesResponse>('')).data;
  };

  getNote = async (id: string): Promise<NoteResponse> => {
    return (await this.service.get<NoteResponse>(`/${id}`)).data;
  };

  postNote = async (body: NotePostRequest) => {
    const res = (await this.service.post<NoteResponse>('', body)).data;
    return res;
  };

  patchNote = async (id: string, body: NotePatchRequest) => {
    return (await this.service.patch<NoteResponse>(`/${id}`, body)).data;
  };

  deleteNote = async (id: string) => {
    return this.service.delete(`/${id}`);
  };
}

const Service = new NoteService();

export default Service;
