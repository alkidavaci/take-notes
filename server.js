//! WHEN I enter a new note title and the note’s text
//! THEN a Save icon appears in the navigation at the top of the page
//! WHEN I click on the Save icon
//! THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

// Packages require
const express = require('express');
const path = require('path');
const fs = require("fs");

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

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

// GET request for api notes
app.get('/api/notes', (req, res) => {
    // Read data from db.json
    let db = fs.readFileSync("./db/db.json", "utf8");
    
    // Parse data
    let data = JSON.parse(db);
    
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
    
    // Send a message to the client
    res.status(200).json(data);
  });

// All routs that don't exist fallback to home page index.html
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Listen for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);