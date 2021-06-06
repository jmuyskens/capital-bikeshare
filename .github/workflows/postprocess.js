// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, writeCSV, removeFile } from 'https://deno.land/x/flat@0.0.10/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename)
console.log(json)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const stations = Object.values(json.data.stations); // convert property values into an array

// Step 3. Write a new JSON file with our filtered data
const newFilename = `stations.json` // name of a new file to be saved
await Deno.writeTextFile(newFilename, JSON.stringify(stations, null, 4)) // create a new JSON file with just the stations
await writeCSV('station_information.csv', stations)
console.log("Wrote a post process file")

// Optionally delete the original file
await removeFile(filename) // equivalent to removeFile('btc-price.json')
