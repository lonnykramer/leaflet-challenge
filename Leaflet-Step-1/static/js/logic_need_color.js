function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // mapbox://styles/mapbox/light-v10

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // mapbox://styles/mapbox/dark-v10

    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });


    // mapbox://styles/mapbox/satellite-streets-v11

    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap,
        "Dark Map": darkmap,
        "Satellite": satellitemap,
        "Outdoors": outdoorsmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Create the map object with options
    var map = L.map("map", {
        center: [38.6270, -90.1994],
        zoom: 5,
        layers: [lightmap, earthquakes]
        // don't need earthquakes in the layer
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}
console.log("base map code finished");

function createMarkers(response) {

    // Pull the "features" property off of response.data
    var features = response.features;
    console.log("features[1]")       // works
    console.log(features[1])        // works
    // data comes from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

    // Initialize an array to hold bike markers
    var quakeMarkers = [];

    console.log("right before for loop");       // works
    
    // Loop through the features array
    for (var index = 0; index < features.length; index++) {
        var feature = features[index];
        console.log(feature);       // works
        
        console.log("right before quakeMarker");        // works

        // For each feature, create a marker and bind a popup with the feature's name
        // var quakeMarker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordates[0]])
        // var quakeMarker = L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
        var quakeMarker = L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])


        // var quakeMarker = L.marker([19.844, -155.371])      // manual coordinates work
            .bindPopup("<h3>Location: " + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag + "<h3>Felt: " +
            feature.properties.felt + "<h3>Coordinates: " + feature.geometry.coordinates[1] + ", " + feature.geometry.coordinates[0] +
            "<br><a href='" + feature.properties.url + "'>More info</a>");

        // Add the marker to the quakeMarkers array
        quakeMarkers.push(quakeMarker);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);



// ***************************************
// Creating map object
// var myMap = L.map("map", {
//     center: [38.6270, -90.1994],
//     zoom: 3
// });

// // Adding tile layer
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
// }).addTo(myMap);


// // Create a baseMaps object to hold the lightmap layer
// var baseMaps = {
//     "Light Map": lightmap
// };

// // USGS website data set
// var usgs_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
