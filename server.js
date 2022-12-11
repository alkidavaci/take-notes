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


  // POST request to add a note
  app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // New note from request body
    const newNote = req.body;
  
    // Add unique id for each note taken
    newNote.id = uuid();
      
      // If all the required properties are present
    if (newNote) {
        
      // Obtain existing notes
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {         
            console.error(err);
        } else {
          // Convert string into JSON object
          parsedNotes = JSON.parse(data);
          
          // Add a new note
          parsedNotes.push(newNote);
        
          // Write updated reviews back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
           );
         }
       });
          
       res.status(201).json(newNote);
     } else {
       res.status(500).json('Error in posting review');
     }
   });

 // DELETE request for notes saved on database
 app.delete("/api/notes/:id", (req, res) => { 

    // Request id 
    const deleteNoteId = req.params.id
    // Read db file and  parse data
    let dbData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    //Filter array of db data, deleting note with id requested  
    const dbDataUpdate = dbData.filter( note => note.id !== deleteNoteId )
    
    // Write file after deleting the requested note
    fs.writeFile('./db/db.json', JSON.stringify(dbDataUpdate),
       (Err) =>
         Err
           ? console.error(Err)
           : console.info('Successfully updated notes!')
    );
    res.status(201).json(dbDataUpdate)
 });


// All routs that don't exist fallback to home page index.html
app.get('*', (req, res) =>{
res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Listen for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);