const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    const newNote = body;
    console.log(body);
    notesArray.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notesArray }, null, 2)
    );
    return newNote;
}

module.exports = {
    createNewNote
};