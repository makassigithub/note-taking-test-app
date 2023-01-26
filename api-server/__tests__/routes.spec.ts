import { Note } from '../models/note.model';

const request = require('supertest');
const app = require('../app');

describe('Note Routes', () => {
  let testNote: Note;
  beforeEach(() => {
    testNote = { id: 1, title: 'test', body: 'test body' };
  });
  describe('Post Endpoint', () => {
    it('should create a new post', async () => {
      const res = await request(app).post('/notes/').send(testNote);
      expect(res.statusCode).toEqual(201);
      expect(res.body.id).toBe(1);
    });
  });
  describe('list Endpoints', () => {
    it('should the list of the notes in the DB', async () => {
      const res = await request(app).get('/notes/').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
    });
  });
  describe('read Endpoints', () => {
    it('Should get the note with id 1', async () => {
      const res = await request(app).get('/notes/1').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(1);
    });
    it('Should return error code 404 for bad id', async () => {
      const res = await request(app).get('/notes/a').send();
      expect(res.statusCode).toEqual(404);
    });
  });
  describe('update Endpoints', () => {
    it('Should get the note with id 1', async () => {
      const res = await request(app)
        .patch('/notes/1')
        .send({ ...testNote, title: 'change' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('change');
    });
    it('Should return error code 500 for bad id', async () => {
      const res = await request(app).patch('/notes/a').send();
      expect(res.statusCode).toEqual(500);
    });
  });
  describe('delete Endpoints', () => {
    it('Should delete the note with id 1', async () => {
      const res = await request(app).delete('/notes/1').send();
      expect(res.statusCode).toEqual(204);
    });
    it('Should return error code 500 for bad id', async () => {
      const res = await request(app).delete('/notes/a').send();
      expect(res.statusCode).toEqual(500);
    });
  });
});
