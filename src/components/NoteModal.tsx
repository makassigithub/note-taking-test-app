import React, { useState, EventHandler, ChangeEvent, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { Note } from '../types';
import styled from 'styled-components';

export type FormValues = Pick<Note, 'body' | 'title'>;

interface IProps {
  isOpen: boolean;
  onSaveClick: (values: FormValues) => Promise<void>;
  onCancelClick: () => void;
  initialValues: FormValues;
  encryptionKey:string;
  setEncryptionKey:(arg: any)=> void;
}

const TEXT_AREA_ROWS = 4;

const NoteModal = ({ 
  isOpen, 
  onSaveClick, 
  onCancelClick, 
  initialValues,
  encryptionKey,
  setEncryptionKey
 }: IProps) => {
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [title, setTitle] = useState(initialValues.title);
  const [bodyText, setBodyText] = useState(initialValues.body);


  useEffect(() => {
    if (initialValues.body) {
      setBodyText(initialValues.body);
      setTitle(initialValues.title);
    }
  }, [initialValues]);

  const handleSaveClick = async () => {
    setSaveButtonDisabled(true);
    try {
      await onSaveClick({
        title,
        body: bodyText,
      });
    } catch (error) {
      console.log('error: ', error);
    }
    resetState();
  };

  const resetState = () => {
    setSaveButtonDisabled(false);
    setBodyText('');
    setTitle('');
  };

  const handleTextAreaChange: EventHandler<ChangeEvent<{ value: string }>> = e =>
  setBodyText(e.target.value);

  const handletitleChange: EventHandler<ChangeEvent<{ value: string }>> = e =>
  setTitle(e.target.value);

  const handleEncryptionKey: EventHandler<ChangeEvent<{ value: string }>> = e =>
  setEncryptionKey(e.target.value);


  return (
    <Modal
      destroyOnClose={true}
      visible={isOpen}
      okText="Save"
      onOk={handleSaveClick}
      onCancel={onCancelClick}
      okButtonProps={{ disabled: saveButtonDisabled }}
    >
      <STitle
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={handletitleChange}
      />
      <STextArea
        autoFocus
        rows={TEXT_AREA_ROWS}
        value={bodyText}
        onChange={handleTextAreaChange}
        maxLength={140}
      ></STextArea>
     <STitle
        type="text"
        placeholder="Enter encryption key"
        value={encryptionKey}
        onChange={handleEncryptionKey}
        disabled={!!initialValues.body.length} // cannot change encryption key in edit mode
      />
    </Modal>
  );
};

const STextArea = styled(Input.TextArea)`
  margin-top: 10px;
`;

const STitle = styled(Input)`
  margin-top: 20px;
`;


export default NoteModal;
