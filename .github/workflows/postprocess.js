// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON } from 'https://deno.land/x/flat@0.0.10/src/json.ts'
import { stringify } from 'https://deno.land/std@0.92.0/encoding/csv.ts';

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename)
console.log(json)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const stations = json.data.stations.map(station => {
    station.rental_methods.sort()
    return station
})

const stationsCsvData = stations.map(station => {
    const select = {...station}
    delete select.rental_uris
    delete select.rental_methods
    delete select.eightd_station_services
    return select
})

// Restructure JSON as GeoJSON
const geojson = {
    'type': 'FeatureCollection',
    'features': stations.map(station => {
        return {
            'type': 'Feature',
            'properties': {
                'name': station.name,
                'station_id': station.station_id,
                'capacity': station.capacity
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [station.lon, station.lat]
            }
        }
    })
}

// modified version of https://deno.land/x/flat@0.0.10/src/csv.ts
async function writeStableCSV(path, data, unknown) {
    if (typeof data === 'string') {
        await Deno.writeTextFile(path, data);
        return
    }
    // sort headers
    const headers = Object.keys(data[0]).sort()
    // we have to stringify the data with a row header
    const dataString = await stringify(data, headers)

    await Deno.writeTextFile(path, dataString);
}

// Step 3. Write a new JSON file with our filtered data

// Sort keys so JSON output will have keys in stable order
const sortedKeys = Object.keys(stations[0]).sort()
const newFilename = `station_information.json` // name of a new file to be saved
await Deno.writeTextFile(newFilename, JSON.stringify(stations, sortedKeys, 4)) // create a new JSON file with just the stations
await Deno.writeTextFile('station_information.geojson', JSON.stringify(geojson, ['type', 'features', 'properties', 'name', 'station_id', 'capacity', 'geometry', 'type', 'coordinates'], 4)) // create a new JSON file with just the stations
await writeStableCSV('station_information.csv', stationsCsvData)
console.log("Wrote a post process file")

// Optionally delete the original file
await Deno.remove(filename) // equivalent to removeFile('btc-price.json')
