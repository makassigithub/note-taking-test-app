import { useState, useEffect } from 'react';
import { decryptNote } from './utils';
import NotesService from './service';
import { Note } from './types';

export const useAppData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addModalIsShowing, setAddModalIsShowing] = useState(false);
  const [editModalNoteId, setEditModalNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [encryptionKey, setEncryptionKey] = useState('');

  const [pageConfig, setPageConfig] = useState({
    pageSize: 5,
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const encodedNotes = await NotesService.getNotes();
        setNotes(
          encodedNotes.map((note) => ({ ...note, body: decryptNote(note.body, encryptionKey) })),
        );
        setPageConfig({
          ...pageConfig,
          totalPage: notes.length / pageConfig.pageSize,
          minIndex: 0,
          maxIndex: pageConfig.pageSize,
        });
        setIsLoading(false);
      } catch (error) {
        /* empty */
      }
    })();
  }, []);

  return {
    isLoading,
    notes,
    setNotes,
    addModalIsShowing,
    setAddModalIsShowing,
    editModalNoteId,
    setEditModalNoteId,
    encryptionKey,
    setEncryptionKey,
    pageConfig,
    setPageConfig,
  };
};
