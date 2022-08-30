import React from 'react';

function NoteSearch({ searchTitle, onSearch }) {
  return (
    <div className='note-search'>
      <input type='text' placeholder='Cari catatan ...' value={searchTitle} onChange={onSearch} />
    </div>
  );
}

export default NoteSearch;
