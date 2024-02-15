// Importing necessary modules
const file = require("fs").readFileSync("inputs.json")

const sampleInputs = JSON.parse(file);

// Display the generated question paper
console.log("Generated Question Paper:");
console.log(sampleInputs);
