import React from 'react';
import NoteItemBody from './NoteItemBody';
import ActionButton from './ActionButton';

function NoteItem({ title, body, createdAt, id, onDelete, onArchive, archived }) {
  return (
    <div className='note-item'>
      <NoteItemBody title={title} body={body} createdAt={createdAt} />
      <ActionButton id={id} onDelete={onDelete} onArchive={onArchive} archived={archived} />
    </div>
  );
}

export default NoteItem;
