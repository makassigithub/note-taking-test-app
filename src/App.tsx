import React from 'react';
import styled from 'styled-components';
import NotesList from './components/NotesList';
import NotesService from './service';
import { Note } from './types';
import NoteModal, { FormValues } from './components/NoteModal';
import { orderBy, sortBy } from 'lodash';
import { encryptNote, decryptNote } from './utils';
import { useAppData } from './appData';
const { PageHeader, Button, Switch, Pagination, Dropdown, Menu } = require('antd');

const EMPTY_NOTE_VALUES: FormValues = { body: '', title: '' };
const MIN_PAGE_SIZE = 5;
const SORTABLE_LIST_SIZE = 2;

const initialNoteState = {
  notes: [],
};

const App = () => {
  const {
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
  } = useAppData(initialNoteState);

  const pageSizeOptions = (
    <Menu>
      <Menu.Item>
        <Button onClick={() => setPageConfig({ ...pageConfig, pageSize: 20 })}>20 notes</Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={() => setPageConfig({ ...pageConfig, pageSize: 10 })}>10 notes</Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={() => setPageConfig({ ...pageConfig, pageSize: MIN_PAGE_SIZE })}>
          5 notes
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleAddNoteClick = () => setAddModalIsShowing(true);

  const handlePageChange = (page: number) => {
    setPageConfig({
      ...pageConfig,
      current: page,
      minIndex: (page - 1) * pageConfig.pageSize,
      maxIndex: page * pageConfig.pageSize,
    });
  };

  const handleAddModalSaveClick = async (values: FormValues) => {
    const newNote = await NotesService.postNote({
      ...values,
      body: encryptNote(values.body, encryptionKey),
    });

    dispatch({
      type: 'ADD_NOTE',
      note: { ...newNote, body: decryptNote(newNote.body, encryptionKey) },
    });
    setAddModalIsShowing(false);
  };

  const handleAddModalCloseClick = () => setAddModalIsShowing(false);

  const handleEditModalSaveClick = async (values: FormValues) => {
    if (editModalNoteId) {
      const updatedNote = await NotesService.patchNote(editModalNoteId, {
        ...values,
        body: encryptNote(values.body, encryptionKey),
      });
      dispatch({
        type: 'EDIT_NOTE',
        editedNote: { ...updatedNote, body: decryptNote(updatedNote.body, encryptionKey) },
      });
      setEditModalNoteId(null);
    }
  };

  const handleEditModalCloseClick = () => setEditModalNoteId(null);

  const handleEditNoteClick = async (id: string) => {
    setEditModalNoteId(id);
  };

  const handleDeleteNoteClick = async (id: string) => {
    try {
      const response = await NotesService.deleteNote(id);
      if (response.status === 204) dispatch({ type: 'DELETE_NOTE', noteId: id });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const editModalNote = state.notes.find((note: Note) => note.id === editModalNoteId);

  const onSortNoteByTitle = (checked: boolean) => {
    const sortedNotes = checked
      ? sortBy(state.notes, (note) => note.title.toLowerCase())
      : orderBy(state.notes, 'id', 'desc');

    dispatch({ type: 'NOTES_LOADED', notes: sortedNotes });
  };

  return (
    <SOuterDiv>
      <PageHeader
        title='Notes'
        subTitle={`(${state.notes.length})`}
        extra={
          <STopPanel>
            {state.notes.length > MIN_PAGE_SIZE && (
              <SDropdown overlay={pageSizeOptions} placement='bottomCenter'>
                <Button>Page Size</Button>
              </SDropdown>
            )}
            {state.notes.length >= SORTABLE_LIST_SIZE && (
              <SSwitch
                checkedChildren='Sort by creation'
                unCheckedChildren='Sort by title'
                onChange={onSortNoteByTitle}
              />
            )}
            <Button type='primary' onClick={handleAddNoteClick}>
              Add Note
            </Button>
          </STopPanel>
        }
      />
      <SListDiv>
        <NotesList
          notes={state.notes}
          onEditItemClick={handleEditNoteClick}
          onDeleteItemClick={handleDeleteNoteClick}
          isLoading={state.isLoading}
          onAddClick={handleAddNoteClick}
          pageConfig={pageConfig}
        />
        <NoteModal
          isOpen={addModalIsShowing}
          onSaveClick={handleAddModalSaveClick}
          onCancelClick={handleAddModalCloseClick}
          encryptionKey={encryptionKey}
          setEncryptionKey={setEncryptionKey}
          initialValues={EMPTY_NOTE_VALUES}
        />
        <NoteModal
          isOpen={!!editModalNoteId}
          onSaveClick={handleEditModalSaveClick}
          onCancelClick={handleEditModalCloseClick}
          encryptionKey={encryptionKey}
          setEncryptionKey={setEncryptionKey}
          initialValues={editModalNote ? editModalNote : EMPTY_NOTE_VALUES}
        />
      </SListDiv>
      {state.notes.length > MIN_PAGE_SIZE && (
        <Pagination
          pageSize={pageConfig.pageSize}
          current={pageConfig.current}
          total={state.notes.length}
          onChange={handlePageChange}
          style={{ bottom: '0px', justifyContent: 'center', display: 'flex' }}
        />
      )}
    </SOuterDiv>
  );
};

export const SOuterDiv = styled.div`
  max-width: 1050px;
  width: 90%;
  margin: 0 auto;
`;

export const SListDiv = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  max-height: 80%;
`;

export const SSwitch = styled(Switch)`
  margin-right: 100px;
`;

export const SDropdown = styled(Dropdown)`
  margin-right: 100px;
`;

export const STopPanel = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  max-height: 80%;
`;

export default App;
