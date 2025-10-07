// filepath: /Users/b.cocco/Documents/leaflet-map/script.js

const options = {
    // Required: API key
    key: 'PRS4fC97SBbNnbmDpLHxKKjYkD0o5iCZ', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 53.5787, // Center latitude
    lon: 10.3485, // Center longitude
    zoom: 13,     // Initial zoom level
};

// Initialize Windy API
windyInit(options, windyAPI => {
    const { map } = windyAPI; // .map is an instance of Leaflet map

    // Set the maximum zoom level for the map
    map.setMaxZoom(22); // Allow zooming up to level 22

    // Add a custom tile layer (OpenStreetMap)
    const osmTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22, // Maximum zoom level for the OSM layer
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // Add the custom tile layer to the map
    osmTileLayer.addTo(map);

    // Load the GeoJSON file
    fetch('Witzhave_A_01_FO_GEN2025_041_DFA45_full.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            const geojsonLayer = L.geoJSON(geojsonData, {
                onEachFeature: (feature, layer) => {
                    if (feature.properties) {
                        const popupContent = Object.entries(feature.properties)
                            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                            .join('<br>');
                        layer.bindPopup(popupContent);
                    }
                },
                style: feature => {
                    if (feature.geometry.type === 'LineString') {
                        return { color: 'blue', weight: 3 };
                    }
                },
                pointToLayer: (feature, latlng) => {
                    return L.circleMarker(latlng, {
                        radius: 6,
                        fillColor: 'red',
                        color: 'black',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8,
                    });
                },
            });

            geojsonLayer.addTo(map);

            // Fit bounds to the GeoJSON layer
            map.fitBounds(geojsonLayer.getBounds(), { maxZoom: 22 }); // Adjust maxZoom here if needed
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
});