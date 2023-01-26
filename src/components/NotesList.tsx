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

class NotesList extends React.PureComponent<IProps> {
   locale = {
    emptyText: (
      <>
        <Typography.Paragraph>You don't have any notes yet</Typography.Paragraph>
        <Button type="primary" onClick={this.props.onAddClick}>
          Add your first note
        </Button>
      </>
    )
  };

  render(){
    const {
      notes,
      isLoading,
      onEditItemClick,
      onDeleteItemClick,
      pageConfig
      } = this.props;
    
    return (
      <List
        loading={isLoading}
        locale={this.locale}
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
  }
  };

  

export default NotesList;
