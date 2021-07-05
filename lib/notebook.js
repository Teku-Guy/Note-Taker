const fs = require('fs');
const path = require('path');

function findById(id, noteArray) {
    const result = noteArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notesArray }, null, 2)
    );
    return newNote;
}

function deleteById(id, notesArray){
    notesArray.splice(notesArray.findIndex(notes => notes.id == id), 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notesArray}, null, 2)
    );
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

module.exports = {
    createNewNote,
    findById,
    deleteById,
    validateNote
};