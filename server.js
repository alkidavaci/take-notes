//! GIVEN a note-taking application
//! WHEN I open the Note Taker
//! THEN I am presented with a landing page with a link to a notes page
//! WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

// Packages require
const express = require('express');
const path = require('path');
const fs = require("fs");

// Initial port
const PORT = process.env.PORT || 3001;


// Create instance of express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve Public folder to express
app.use(express.static('public'));

// Html GET request
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// All routs that don't exist fallback to home page index.html
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Listen for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);