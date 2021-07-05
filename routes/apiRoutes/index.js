const router = require('express').Router();
const { createNewNote, findById, deleteById, validateNote } = require('../../lib/notebook')
const {notesArray} = require('../../db/db') || [];

//api home route
router.get('/notes', (req, res) => {
    return res.json(notesArray);
});

//lets us find notes by id's
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notesArray);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

//post route to upload to our json
router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notesArray.length.toString() || 0;

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const newNote = createNewNote(req.body, notesArray);
        res.json(newNote);
    }
});

//deletes note by id
router.delete('/notes/:id', (req, res) => {
    deleteById(req.params.id, notesArray)
   
    res.send(`Deleted ${req.params.id}`);
});

module.exports = router;