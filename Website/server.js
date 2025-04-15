const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib POST handler
server.post('/ITC505/lab-7', (req, res) => {
  const { adjective1, noun1, verb1, adverb1, noun2 } = req.body;
  
  // Check if all fields are filled
  if (!adjective1 || !noun1 || !verb1 || !adverb1 || !noun2) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7">Go Back to Form</a>
    `);
    return;
  }
  
  // Create the Mad Lib story
  const madLib = `
    <h1>Your Mad Lib Story</h1>
    <p>
      Once upon a time, there was a ${adjective1} ${noun1} who loved to ${verb1} ${adverb1}.
      Every day, the ${noun1} would wake up early, eat a healthy breakfast, and then head out to the 
      ${noun2} for an adventure. One day, while ${verb1}ing ${adverb1}, the ${noun1} discovered 
      a magical ${noun2} that granted three wishes. "How ${adjective1}!" exclaimed the ${noun1}.
      And that's how the ${adjective1} ${noun1} became famous for ${verb1}ing ${adverb1} at the ${noun2}.
    </p>
    <a href="/ITC505/lab-7">Create Another Mad Lib</a>
  `;
  
  res.send(madLib);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => console.log('Ready on localhost!'))