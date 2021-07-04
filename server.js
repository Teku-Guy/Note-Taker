const fs = require('fs');
const path = require('path');
const express = require('express');
const notesDB  = require('./db/db');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function createNewAnimal(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notesArray }, null, 2)
    );
    return newNote;
}

app.get('/api/notes', (req, res) => {
    return res.json(notesDB);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});  