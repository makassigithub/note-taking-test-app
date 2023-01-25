import React from 'react';
import { List, Button, Typography, Avatar } from 'antd';
import { Note } from '../types';

interface IProps {
  notes: Note[];
  isLoading: boolean;
  onAddClick: () => void;
  onEditItemClick: (id: string) => void;
  onDeleteItemClick: (id: string) => void;
  pageConfig:any;
}

const NotesList = ({
  notes,
  isLoading,
  onAddClick,
  onEditItemClick,
  onDeleteItemClick,
  pageConfig
}: IProps) => {
  const locale = {
    emptyText: (
      <>
        <Typography.Paragraph>You don't have any notes yet</Typography.Paragraph>
        <Button type="primary" onClick={onAddClick}>
          Add your first note
        </Button>
      </>
    )
  };

  return (
    <List
      loading={isLoading}
      locale={locale}
      itemLayout="horizontal"
      dataSource={notes}
      rowKey={note => note.id!}
      renderItem={(note,index) =>
        index >= pageConfig.minIndex &&
        index <  pageConfig.maxIndex  ? (
        <List.Item
          actions={[
            <a onClick={() => onEditItemClick(note.id!)}>edit</a>,
            <a onClick={() => onDeleteItemClick(note.id!)}>delete</a>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar size={50} shape='square' src="notebook.webp"/>}
            title={note.title}
            description={note.body}
          />
        </List.Item>
      ):<></>}
    />
    
  );
};

export default NotesList;
