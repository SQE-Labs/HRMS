const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Directory containing spec files
const specDir = 'cypress/e2e/tests';
const specs = fs.readdirSync(specDir).filter(file => file.endsWith('.cy.js'));

// Number of parallel threads
const numThreads = 4;
const chunkSize = Math.ceil(specs.length / numThreads);

// Split specs into chunks
const chunks = Array.from({ length: numThreads }, (_, i) =>
  specs.slice(i * chunkSize, (i + 1) * chunkSize)
);

const args = process.argv.slice(2); // Get CLI arguments
const isHeaded = args.includes('--headed'); 

// Run each chunk in parallel
chunks.forEach((chunk, index) => {
  if (chunk.length > 0) {
    const command = `npx cypress run ${isHeaded ? '--headed' : ''} --reporter mochawesome --spec ${chunk.map(file => path.join(specDir, file)).join(',')}`;
    console.log(`Thread ${index + 1}: ${command}`);
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Thread ${index + 1} failed:`, stderr);
      } else {
        console.log(`Thread ${index + 1} completed:\n`, stdout);
      }
    });
  }
});
