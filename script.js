// filepath: /Users/b.cocco/Documents/leaflet-map/script.js

const options = {
    // Required: API key
    key: 'PRS4fC97SBbNnbmDpLHxKKjYkD0o5iCZ', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 50.4,
    lon: 14.3,
    zoom: 5,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contains 'map', 'store',
    // 'picker' and other useful stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    L.popup()
        .setLatLng([50.4, 14.3])
        .setContent('Hello World')
        .openOn(map);
});