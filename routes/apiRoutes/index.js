const router = require('express').Router();
const { createNewNote } = require('../../lib/notebook')
const {notesArray} = require('../../db/db') || [];

router.get('/notes', (req, res) => {
    return res.json(notesArray);
});

router.post('/notes', (req, res) => {
    req.body.id = notesArray.length.toString();
    const newNote = createNewNote(req.body, notesArray);
    res.json(newNote);
});

module.exports = router;