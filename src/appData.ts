import { useState, useEffect, useReducer } from 'react';
import { decryptNote } from './utils';
import NotesService from './service';
import { Note } from './types';

export function noteReducer(state: any, action: any) {
  switch (action.type) {
    case 'LOAD_NOTES':
      return { ...state, isLoading: true };
    case 'ADD_NOTE':
      return { ...state, notes: [action.note, ...state.notes] };
    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter((item: Note) => item.id !== action.noteId) };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((item: Note) =>
          item.id === action.editedNote.id ? action.editedNote : item,
        ),
      };
    case 'NOTES_LOADED':
      return { ...state, isLoading: false, notes: action.notes };
    default:
      break;
  }
}

export const useAppData = (initialState: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addModalIsShowing, setAddModalIsShowing] = useState(false);
  const [editModalNoteId, setEditModalNoteId] = useState<string | null>(null);
  const [encryptionKey, setEncryptionKey] = useState('');

  const [state, dispatch] = useReducer(noteReducer, initialState);

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
        dispatch({
          type: 'NOTES_LOADED',
          notes: encodedNotes.map((note) => ({
            ...note,
            body: decryptNote(note.body, encryptionKey),
          })),
        });

        setPageConfig({
          ...pageConfig,
          totalPage: state.notes.length / pageConfig.pageSize,
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
    addModalIsShowing,
    setAddModalIsShowing,
    editModalNoteId,
    setEditModalNoteId,
    encryptionKey,
    setEncryptionKey,
    pageConfig,
    setPageConfig,
    state,
    dispatch,
  };
};
