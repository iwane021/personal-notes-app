import React from 'react';
import { getInitialData } from '../utils';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NoteSearch from './NoteSearch';
import NoteInput from './NoteInput';
import NoteList from './NoteList';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searching: '',
      titleNote: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteNoteEventHandler = this.onDeleteNoteEventHandler.bind(this);
    this.onArchiveNoteEventHandler = this.onArchiveNoteEventHandler.bind(this);
    this.onSearchingNoteHandler = this.onSearchingNoteHandler.bind(this);
  }

  onDeleteNoteEventHandler(id) {
    const titleNote = this.state.notes.filter((note) => note.id === id);
    const notes = this.state.notes.filter((note) => note.id !== id);
    confirmAlert({
      message: 'Anda yakin ingin menghapus catatan ' + titleNote[0].title + '?',
      buttons: [
        {
          label: 'Ya',
          onClick: () => this.setState({ notes }),
        },
        {
          label: 'Tidak',
        },
      ],
    });
  }

  onArchiveNoteEventHandler(id) {
    const archiveNote = this.state.notes.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note));
    this.setState({ notes: archiveNote });
  }

  onAddNoteHandler({ title, body }) {
    const currentDate = new Date().toISOString();
    this.setState((prevNote) => {
      return {
        notes: [
          ...prevNote.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: currentDate,
            archived: false,
          },
        ],
      };
    });
  }

  onSearchingNoteHandler(event) {
    this.setState(() => {
      return {
        searching: event.target.value,
      };
    });
  }

  render() {
    const search = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.searching.toLowerCase()));
    const active = search.filter((note) => {
      return note.archived === false;
    });
    const archive = search.filter((note) => {
      return note.archived === true;
    });
    return (
      <>
        <div className='note-app__header'>
          <h1>Notes</h1>
          <NoteSearch onSearch={this.onSearchingNoteHandler} />
        </div>
        <div className='note-app__body'>
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          <hr />
          <br />
          <NoteList notes={active} onDelete={this.onDeleteNoteEventHandler} onArchive={this.onArchiveNoteEventHandler} />
          <h2>Arsip Catatan</h2>
          <hr />
          <br />
          <NoteList notes={archive} onDelete={this.onDeleteNoteEventHandler} onArchive={this.onArchiveNoteEventHandler} />
        </div>
      </>
    );
  }
}

export default NoteApp;
