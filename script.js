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
    // windyAPI is ready, and contains 'map', 'store',
    // 'picker' and other useful stuff

    const { map } = windyAPI; // .map is an instance of Leaflet map

    // Load the GeoJSON file
    fetch('Witzhave_A_01_FO_GEN2025_041_DFA45_full.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            // Add GeoJSON to the map
            const geojsonLayer = L.geoJSON(geojsonData, {
                onEachFeature: (feature, layer) => {
                    // Bind a popup to each feature
                    if (feature.properties) {
                        const popupContent = Object.entries(feature.properties)
                            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                            .join('<br>');
                        layer.bindPopup(popupContent);
                    }
                },
                style: feature => {
                    // Style for LineString features
                    if (feature.geometry.type === 'LineString') {
                        return { color: 'blue', weight: 3 };
                    }
                },
                pointToLayer: (feature, latlng) => {
                    // Style for Point features
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

            // Add the GeoJSON layer to the map
            geojsonLayer.addTo(map);

            // Fit the map to the GeoJSON layer bounds
            map.fitBounds(geojsonLayer.getBounds());
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
});